function n(e) {
	var t = this,
		n = t[e],
		o = navigator.mozL10n.language.code || "",
		r = t.default_locale || "";
	return (
		o in navigator.mozL10n.qps && ("name" === e || "description" === e || "short_name" === e)
			? (n = navigator.mozL10n.qps[navigator.language].translate(n))
			: t.locales &&
			  [o, o.substr(0, o.indexOf("-")), r, r.substr(0, o.indexOf("-"))].some(function (t) {
					return !(!this[t] || !this[t][e]) && ((n = this[t][e]), !0);
			  }, t.locales),
		"object" !== ("undefined" == typeof n ? "undefined" : a(n)) || n instanceof Array || (n = new n211(n)),
		n
	);
}

function n211(e) {
	for (var t in e) Object.defineProperty(this, t, { get: n.bind(e, t), enumerable: !0 });
}

var a =
	"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
		? function (e) {
				return typeof e;
		  }
		: function (e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		  };

Object.defineProperty(n211.prototype, "displayName", {
	get: function () {
		return this.short_name || this.name;
	},
});

export default n211;
