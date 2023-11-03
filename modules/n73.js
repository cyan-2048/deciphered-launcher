import React from "react";
import n6 from "./n6";

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
function s(e) {
	var t = e.content ? { "data-icon": e.content.icon, "data-l10n-id": e.content.text } : null;
	return React.createElement("button", l({ id: "software-keys-" + e.pos, className: "sk-button", "data-position": e.pos }, t), e.content.text);
}
var u = (function () {
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
	l =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
			}
			return e;
		},
	h = require(16),
	v = toESM(h);
require(222);

class n73 extends n6 {
	constructor(props) {
		super();

		this.state = { left: props.left || "", center: props.center || "", right: props.right || "" };
		this.setRef = this.setRef.bind(this);
		this.softkeys = ["left", "right", "center"];
	}

	componentDidMount() {
		var e = this;
		v.default.on("change", function () {
			var t = v.default.currentKeys;
			e.softkeys.forEach(function (n) {
				t[n] = e.uniformContent(t[n] || "");
			}),
				e.setState(t);
		});
	}

	componentWillUpdate(e, t) {
		Array.from(this.element.getElementsByTagName("button")).forEach(function (e) {
			t[e.dataset.position].text || (e.textContent = "");
		});
	}

	uniformContent(e) {
		return "string" == typeof e && (e = e.startsWith("icon=") ? { icon: e.replace("icon=", "") } : { text: e }), e;
	}

	setRef(e) {
		this.element = e;
	}

	render() {
		return React.createElement(
			"form",
			{ className: "skbar none-paddings visible focused", id: "softkeyPanel", "data-type": "action", ref: this.setRef },
			React.createElement(s, { pos: "left", content: this.state.left }),
			React.createElement(s, { pos: "center", content: this.state.center }),
			React.createElement(s, { pos: "right", content: this.state.right })
		);
	}
}

export default n73;
