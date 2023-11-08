import StoreBase from "./StoreBase";

class SimSlotStore extends StoreBase {
	/**
	 * SIMSlot is the API wrapper for each mobileConnection,
	 * and since one mobileConnection matches one SIM slot,
	 * we call it SIMSlot.
	 *
	 * @param {Object} conn  mobileConnection
	 * @param {index} index The slot number of this SIM slot.
	 * @param {Object} [card] iccObject
	 *
	 * @property {Object} simCard Represent the current active iccObj,
	 *                         i.e., SIM card.
	 * @property {Number} index The slot number of this SIM slot.
	 */
	constructor(conn, index, card) {
		super();

		this.EVENT_PREFIX = "simslot-";
		this.EVENTS = ["cardstatechange", "iccinfochange", "stkcommand", "stksessionend"];
		this.METHODS = ["sendStkResponse", "sendStkMenuSelection", "sendStkTimerExpiration", "sendStkEventDownload"];
		this.DOM_REQUEST_METHODS = [
			"getCardLock",
			"unlockCardLock",
			"setCardLock",
			"getCardLockRetryCount",
			"readContacts",
			"updateContact",
			"iccOpenChannel",
			"iccExchangeAPDU",
			"iccCloseChannel",
		];
		this.ABSENT_TYPES = ["permanentBlocked"];
		this.LOCK_TYPES = [
			"pinRequired",
			"pukRequired",
			"networkLocked",
			"corporateLocked",
			"serviceProviderLocked",
			"network1Locked",
			"network2Locked",
			"hrpdNetworkLocked",
			"ruimCorporateLocked",
			"ruimServiceProviderLocked",
		];
		this.index = index;
		this.conn = conn;
		if (card) {
			this.update(card);
		}

		/**
		 * The event represents the instance is initialized.
		 * @event SIMSlot#simslot-created
		 */
		this.publish("created");
	}

	/**
	 * Update the iccObj.
	 *
	 * This method is called by SIMSlotManager when the iccObj
	 * needs to be updated.
	 * @param  {Object} iccObj The iccObj belongs to this slot.
	 */
	update(iccObj) {
		this.simCard = iccObj;
		this.EVENTS.forEach(function iterater(evt) {
			iccObj.addEventListener(evt, this);
		}, this);

		this.DOM_REQUEST_METHODS.forEach(function iterator(domRequest) {
			this[domRequest] = function () {
				return iccObj[domRequest].apply(iccObj, arguments);
			};
		}, this);

		this.METHODS.forEach(function iterator(method) {
			this[method] = function () {
				return iccObj[method].apply(iccObj, arguments);
			};
		}, this);

		this.publish("updated");
	}

	handleEvent(evt) {
		// i don't know anything 'bout switches idk if this is actually doing anything
		switch (evt.type) {
			default:
				this.publish(evt.type);
				if (this.simCard) {
					this.debug(this.simCard.cardState);
				}
		}
	}

	/**
	 * Indicate the slot has SIM card or not.
	 * @return {Boolean} Without SIM card or not.
	 */
	isAbsent() {
		return !this.simCard || this.ABSENT_TYPES.indexOf(this.simCard.cardState) >= 0 || (this.simCard && this.simCard.iccInfo && null === this.simCard.iccInfo.iccid);
	}

	/**
	 * Function to get simcard's smsc number
	 * @param {Function} cb your callback function to get smsc number
	 */
	getSmsc(cb) {
		var mobileMessage = window.navigator.mozMobileMessage;
		if (mobileMessage) {
			// this is the KaiOS implementation
			// the one in FirefoxOS eeems more backwards compatible
			//
			// var n = mobileMessage.getSmscAddress(this.index);
			// n.onsuccess = function () {
			// 	cb(this.result.split(",")[0].replace(/"/g, ""));
			// };
			// n.onerror = function () {
			// 	cb(null);
			// };

			// FirefoxOS implementation
			//
			// The return type of getSmscAddress can be either a DOMRequest which
			// resolves to a string for legacy implementations, or
			// a Promise which resolves to a SmscAddress object in Bug 1043250.
			mobileMessage.getSmscAddress(this.index).then(
				(result) => {
					var smsc;
					// Keep the legacy behavior for backward compatibility. The legacy
					// interface resolves to a string, and is always assumed to be in text
					// mode.
					if (typeof result === "string" || result instanceof String) {
						smsc = result.split(",")[0].replace(/"/g, "");
					} else {
						smsc = result.address;
					}
					cb(smsc);
				},
				(error) => {
					console.error(error);
					cb(null);
				}
			);
		} else {
			// let's keep this in
			console.error("can't access mozMobileMessage");
			cb(null);
		}
	}

	isUnknownState() {
		var e = "" === this.simCard.cardState,
			t = "unknown" === this.simCard.cardState;
		return !this.simCard.cardState || t || e;
	}

	/**
	 * Indicate SIM card in the slot is locked or not.
	 * @return {Boolean} SIM card locked or not.
	 */
	isLocked() {
		return this.LOCK_TYPES.indexOf(this.simCard.cardState) >= 0;
	}
	getCardState() {
		return this.simCard.cardState;
	}
}

export default SimSlotStore;
