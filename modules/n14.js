import n5 from "./n5";
import EventEmitter from "./n30";

const require = () => {};

function toESM(e) {
	return e && e.__esModule ? e : { default: e };
}
function o(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function i(e, t) {
	if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
}
function a(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
		t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var s = (function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	})(),
	d = require(19),
	f = toESM(d),
	h = !1,
	v = (function (e) {
		function t() {
			o(this, t);
			var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return (
				(e.EVENT_PREFIX = ""),
				(e.service = window.Service || n5),
				e.EVENTS &&
					e.EVENTS.forEach(function (e) {
						window.addEventListener(e, this);
					}, e),
				e.SERVICES &&
					e.SERVICES.forEach(function (e) {
						this.service.register(e, this);
					}, e),
				e.STATES &&
					e.STATES.forEach(function (e) {
						this.service.registerState(e, this);
					}, e),
				e.SETTINGS &&
					((e._settings = {}),
					e.SETTINGS.forEach(function (e) {
						f.default.addObserver(e, this);
					}, e)),
				e
			);
		}
		return (
			a(t, e),
			s(t, [
				{
					key: "publish",
					value: function (e, t, n) {
						var r = n ? "" : this.EVENT_PREFIX,
							o = new CustomEvent(r + e, { bubbles: !0, detail: t || this });
						this.debug("publishing: " + r + e), window.dispatchEvent(o);
					},
				},
				{
					key: "handleEvent",
					value: function (e) {
						if ("function" == typeof this._pre_handleEvent) {
							if (this._pre_handleEvent(e) === !1) return;
						} else this.debug("no handle event pre found. skip");
						"function" == typeof this["_handle_" + e.type] && (this.debug("handling " + e.type), this["_handle_" + e.type](e)),
							"function" == typeof this._post_handleEvent && this._post_handleEvent(e);
					},
				},
				{
					key: "observe",
					value: function (e, t) {
						this.debug("observing " + e + " : " + t),
							this._settings || (this._settings = {}),
							(this._settings[e] = t),
							"function" == typeof this["_observe_" + e] && (this.debug("observer for " + e + " found, invoking."), this["_observe_" + e](t));
					},
				},
				{
					key: "debug",
					value: function () {
						this.DEBUG || h ? this.TRACE : window.DUMP && DUMP("[" + this.name + "]" + Array.slice(arguments).concat());
					},
				},
			]),
			t
		);
	})(EventEmitter);

export default v;
