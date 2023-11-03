import n5 from "./n5";
import EventEmitter from "./n30";
import n19 from "./n19";

var h = false;

class n14_StoreBase extends EventEmitter {
	constructor() {
		super();

		this.EVENT_PREFIX = "";
		this.service = window.Service || n5;
		this.EVENTS &&
			this.EVENTS.forEach(function (e) {
				window.addEventListener(e, this);
			}, this);
		this.SERVICES &&
			this.SERVICES.forEach(function (e) {
				this.service.register(e, this);
			}, this);
		this.STATES &&
			this.STATES.forEach(function (e) {
				this.service.registerState(e, this);
			}, this);
		this.SETTINGS &&
			((this._settings = {}),
			this.SETTINGS.forEach(function (e) {
				n19.addObserver(e, this);
			}, this));
	}

	publish(e, t, n) {
		var r = n ? "" : this.EVENT_PREFIX,
			o = new CustomEvent(r + e, { bubbles: !0, detail: t || this });
		this.debug("publishing: " + r + e), window.dispatchEvent(o);
	}
	handleEvent(e) {
		if ("function" == typeof this._pre_handleEvent) {
			if (this._pre_handleEvent(e) === !1) return;
		} else this.debug("no handle event pre found. skip");
		"function" == typeof this["_handle_" + e.type] && (this.debug("handling " + e.type), this["_handle_" + e.type](e)),
			"function" == typeof this._post_handleEvent && this._post_handleEvent(e);
	}
	observe(e, t) {
		this.debug("observing " + e + " : " + t),
			this._settings || (this._settings = {}),
			(this._settings[e] = t),
			"function" == typeof this["_observe_" + e] && (this.debug("observer for " + e + " found, invoking."), this["_observe_" + e](t));
	}
	debug() {
		this.DEBUG || h ? this.TRACE : window.DUMP && DUMP("[" + this.name + "]" + Array.slice(arguments).concat());
	}
}

export default n14_StoreBase;
