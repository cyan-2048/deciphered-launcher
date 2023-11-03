import n14 from "./m14";

class n197 extends n14 {
	constructor(conn, index, r) {
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
		r && this.update(r);
		this.publish("created");
	}

	update(e) {
		(this.simCard = e),
			this.EVENTS.forEach(function (t) {
				e.addEventListener(t, this);
			}, this),
			this.DOM_REQUEST_METHODS.forEach(function (t) {
				this[t] = function () {
					return e[t].apply(e, arguments);
				};
			}, this),
			this.METHODS.forEach(function (t) {
				this[t] = function () {
					return e[t].apply(e, arguments);
				};
			}, this),
			this.publish("updated");
	}
	handleEvent(e) {
		switch (e.type) {
			default:
				this.publish(e.type), this.simCard && this.debug(this.simCard.cardState);
		}
	}
	isAbsent() {
		return !this.simCard || this.ABSENT_TYPES.indexOf(this.simCard.cardState) >= 0 || (this.simCard && this.simCard.iccInfo && null === this.simCard.iccInfo.iccid);
	}
	getSmsc(e) {
		var t = window.navigator.mozMobileMessage;
		if (t) {
			var n = t.getSmscAddress(this.index);
			(n.onsuccess = function () {
				e(this.result.split(",")[0].replace(/"/g, ""));
			}),
				(n.onerror = function () {
					e(null);
				});
		} else e(null);
	}
	isUnknownState() {
		var e = "" === this.simCard.cardState,
			t = "unknown" === this.simCard.cardState;
		return !this.simCard.cardState || t || e;
	}
	isLocked() {
		return this.LOCK_TYPES.indexOf(this.simCard.cardState) >= 0;
	}
	getCardState() {
		return this.simCard.cardState;
	}
}

export default n197;
