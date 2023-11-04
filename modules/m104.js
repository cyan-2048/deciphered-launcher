import n14_StoreBase from "./m14";
import n197 from "./m197";

var d = navigator.mozIccManager;

class f extends n14_StoreBase {
	constructor() {
		super(...arguments);
		this.length = 0;
		this._instances = [];
		this.TIMEOUT_FOR_SIM2 = 2e3;
		this._timerForSIM2 = null;
		this.ready = false;
	}

	start() {
		d &&
			((this._conns = Array.prototype.slice.call(navigator.mozMobileConnections)),
			(this.length = this._conns.length),
			0 !== this._conns.length &&
				(this._conns.forEach(function (e, t) {
					this._instances.push(new n197(e, t, d.getIccById(e.iccId)));
				}, this),
				d.iccIds.length === this._conns.length ? this.publishSIMSlotIsReady() : d.addEventListener("iccdetected", this)));
	}
	isMultiSIM() {
		return this.length > 1;
	}
	isSIMCardAbsent(e) {
		var t = this.get(e);
		return !t || t.isAbsent();
	}
	hasOnlyOneSIMCardDetected() {
		var e = this.isSIMCardAbsent(0),
			t = this.isSIMCardAbsent(1);
		return (e && !t) || (!e && t);
	}
	noSIMCardOnDevice() {
		return !d || !d.iccIds || 0 === d.iccIds.length;
	}
	noSIMCardConnectedToNetwork() {
		return (
			!d ||
			!d.iccIds ||
			this._instances.every(function (e) {
				return e.conn.voice && e.conn.voice.emergencyCallsOnly;
			})
		);
	}
	get(e) {
		return e > this.length - 1 ? null : this._instances[e];
	}
	getMobileConnection(e) {
		return e > this.length - 1 ? null : this._instances[e].conn;
	}
	getSlots() {
		return this._instances;
	}
	getSlotByIccId(e) {
		var t = null;
		return (
			this._instances.some(function (n) {
				return !(!n.conn.iccId || n.conn.iccId !== e) && ((t = n), true);
			}, this),
			t
		);
	}
	waitForSecondSIM() {
		var e = this;
		this._timerForSIM2 = setTimeout(function () {
			clearTimeout(e._timerForSIM2), e.publishSIMSlotIsReady();
		}, this.TIMEOUT_FOR_SIM2);
	}
	publishSIMSlotIsReady() {
		this.ready || ((this.ready = true), window.dispatchEvent(new CustomEvent("simslotready")));
	}
	_handle_iccdetected(e) {
		var t = this.getSlotByIccId(e.iccId);
		t &&
			(t.update(d.getIccById(e.iccId)),
			this.isMultiSIM()
				? this.hasOnlyOneSIMCardDetected()
					? this.waitForSecondSIM()
					: (clearTimeout(this._timerForSIM2), this.publishSIMSlotIsReady())
				: this.publishSIMSlotIsReady());
	}
}

var n104 = new f();
n104.start();

export default n104;
