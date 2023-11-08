import StoreBase from "./StoreBase";
import SimSlotStore from "./SimSlotStore";

const IccManager = navigator.mozIccManager;

/**
 * seems to be a Store version of the SIMSlotManager,
 * which is odd because the launcher already uses window.SIMSlotManager
 * @link https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/shared/js/simslot_manager.js
 */
class SIMSlotManagerStore extends StoreBase {
	/**
	 * The number of SIM slots.
	 * @type {Number}
	 */
	length = 0;
	_instances = [];

	/**
	 * The timeout to wait for the second SIM
	 * @type {Number}
	 */
	TIMEOUT_FOR_SIM2 = 2000;

	/**
	 * Timer used to wait for the second SIM
	 * @type {Number} timeoutId
	 */
	_timerForSIM2 = null;

	/**
	 * This property is used to make sure sim_lock won't get inited
	 * before we receive iccdetected when bootup.
	 * @type {Boolean}
	 */
	ready = false;

	start() {
		if (!IccManager) {
			return;
		}

		this._conns = Array.prototype.slice.call(navigator.mozMobileConnections);
		this.length = this._conns.length;

		if (this._conns.length === 0) {
			return;
		}

		var allSIMCardDetected = true;
		this._conns.forEach(function iterator(conn, index) {
			var slot = new SimSlotStore(conn, index, IccManager.getIccById(conn.iccId));
			this._instances.push(slot);
			// this part is not present for some reason
			// if (slot.isAbsent()) {
			// 	allSIMCardDetected = false;
			// }
		}, this);

		if (IccManager.iccIds.length === this._conns.length) {
			this.publishSIMSlotIsReady();
		} else {
			// 'iccdetected' shall always be listened to even when
			// 'allSIMCardDetected' is set to true. In addition to detect UICC after
			// device boot up, we also rely on this event to update the new Icc
			// Object created from IccManager to corresponding SIMSlot when user
			// toggles airplane mode ON/OFF.
			IccManager.addEventListener("iccdetected", this);
		}
	}

	/**
	 * We support multiSIM or not.
	 * @return {Boolean} MultiSIM is available or not.
	 */
	isMultiSIM() {
		return this.length > 1;
	}

	/**
	 * Check there is sim card on slot#index or not.
	 * @param  {Number}  index The slot number.
	 * @return {Boolean}       sim card is absent or not.
	 */
	isSIMCardAbsent(index) {
		var slot = this.get(index);
		return !slot || slot.isAbsent();
	}

	/**
	 * Make sure we really have one simcard information
	 * @return {Boolean} we already have one simcard.
	 */
	hasOnlyOneSIMCardDetected() {
		var sim0Absent = this.isSIMCardAbsent(0);
		var sim1Absent = this.isSIMCardAbsent(1);
		var hasOneSim = (sim0Absent && !sim1Absent) || (!sim0Absent && sim1Absent);
		return hasOneSim;
	}

	/**
	 * Check there is no any sim card on device or not.
	 * @return {Boolean} There is no sim card.
	 */
	noSIMCardOnDevice() {
		if (!IccManager || !IccManager.iccIds) {
			return true;
		}
		return IccManager.iccIds.length === 0;
	}

	noSIMCardConnectedToNetwork() {
		if (!IccManager || !IccManager.iccIds) {
			return true;
		}
		return this._instances.every(function iterator(instance) {
			return instance.conn.voice && instance.conn.voice.emergencyCallsOnly;
		});
	}

	/**
	 * Get specific SIM slot instance.
	 * @param {Number} index The slot number.
	 * @return {Object} The SIMSlot instance.
	 */
	get(index) {
		if (index > this.length - 1) {
			return null;
		}

		return this._instances[index];
	}

	/**
	 * Get specific mobileConnection object.
	 * @param {Number} index The slot number.
	 * @return {Object} The mobile connection object.
	 */
	getMobileConnection(index) {
		if (index > this.length - 1) {
			return null;
		}

		return this._instances[index].conn;
	}

	/**
	 * Get all sim slot instances
	 * @return {Array} The array of sim slot instances.
	 */
	getSlots() {
		return this._instances;
	}

	/**
	 * Get specified simslot by iccId
	 * @return {Object} The SIMSlot instance.
	 */
	getSlotByIccId(iccId) {
		var found = null;
		this._instances.some(function iterator(slot, index) {
			if (slot.conn.iccId && slot.conn.iccId === iccId) {
				found = slot;
				return true;
			} else {
				return false;
			}
		}, this);
		return found;
	}

	/**
	 * This method is used to make sure if we can't receive the 2nd
	 * `iccdetected` event during the timeout, we would treat this
	 * situation as DSDS device with only one simcard inserted.
	 */
	waitForSecondSIM() {
		var self = this;
		this._timerForSIM2 = setTimeout(function () {
			clearTimeout(self._timerForSIM2);
			self.publishSIMSlotIsReady();
		}, this.TIMEOUT_FOR_SIM2);
	}

	/**
	 * We have to make sure our simcards are ready and emit
	 * this event out to notify sim_settings_helper & sim_lock
	 * do related operations.
	 */
	publishSIMSlotIsReady() {
		if (!this.ready) {
			this.ready = true;
			window.dispatchEvent(new CustomEvent("simslotready"));
		}
	}

	_handle_iccdetected(evt) {
		var slot = this.getSlotByIccId(evt.iccId);

		if (slot) {
			slot.update(IccManager.getIccById(evt.iccId));

			// we are now in single sim device
			if (!this.isMultiSIM()) {
				this.publishSIMSlotIsReady();
			} else {
				// we are now in DSDS device
				// if we have one simcard already
				if (this.hasOnlyOneSIMCardDetected()) {
					this.waitForSecondSIM();
				} else {
					// we have two simcards already
					clearTimeout(this._timerForSIM2);
					this.publishSIMSlotIsReady();
				}
			}
		}
	}
}

var simSlotManagerStore = new SIMSlotManagerStore();
simSlotManagerStore.start();

export default simSlotManagerStore;
