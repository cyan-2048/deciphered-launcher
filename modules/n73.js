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
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } })),
		t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
function s(e) {
	var t = e.content ? { "data-icon": e.content.icon, "data-l10n-id": e.content.text } : null;
	return p.default.createElement("button", l({ id: "software-keys-" + e.pos, className: "sk-button", "data-position": e.pos }, t), e.content.text);
}

var u = (function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				(r.enumerable = r.enumerable || false), (r.configurable = true), "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
			}
		}
		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	})(),
	l =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
			}
			return e;
		},
	c = require(3),
	p = toESM(c),
	d = require(6),
	f = toESM(d),
	h = require(16),
	v = toESM(h);
require(222);
var m = (function (e) {
	function t(e) {
		o(this, t);
		var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
		return (n.state = { left: e.left || "", center: e.center || "", right: e.right || "" }), (n.setRef = n.setRef.bind(n)), (n.softkeys = ["left", "right", "center"]), n;
	}
	return (
		a(t, e),
		u(t, [
			{
				key: "componentDidMount",
				value: function () {
					var e = this;
					v.default.on("change", function () {
						var t = v.default.currentKeys;
						e.softkeys.forEach(function (n) {
							t[n] = e.uniformContent(t[n] || "");
						}),
							e.setState(t);
					});
				},
			},
			{
				key: "componentWillUpdate",
				value: function (e, t) {
					Array.from(this.element.getElementsByTagName("button")).forEach(function (e) {
						t[e.dataset.position].text || (e.textContent = "");
					});
				},
			},
			{
				key: "uniformContent",
				value: function (e) {
					return "string" == typeof e && (e = e.startsWith("icon=") ? { icon: e.replace("icon=", "") } : { text: e }), e;
				},
			},
			{
				key: "setRef",
				value: function (e) {
					this.element = e;
				},
			},
			{
				key: "render",
				value: function () {
					return p.default.createElement(
						"form",
						{ className: "skbar none-paddings visible focused", id: "softkeyPanel", "data-type": "action", ref: this.setRef },
						p.default.createElement(s, { pos: "left", content: this.state.left }),
						p.default.createElement(s, { pos: "center", content: this.state.center }),
						p.default.createElement(s, { pos: "right", content: this.state.right })
					);
				},
			},
		]),
		t
	);
})(f.default);

export default m;
