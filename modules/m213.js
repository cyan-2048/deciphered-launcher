import React from "react";
import n6_RC from "./m6";
import n26 from "./m26";
import n16_SoftKeyStore from "./m16";
import n5_Service from "./m5";
import n212 from "./m212";

function a(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	}
	return Array.from(e);
}

class QRFace extends n6_RC {
	constructor(props) {
		super(props);

		const __self = this;

		__self.name = "QRFace";
		__self.initFocus = [0, 0];
		__self.state = { focus: __self.initFocus };
		n5_Service.register("show", __self);
		n5_Service.register("hide", __self);
		n5_Service.register("isShown", __self);
		__self.onFocus = __self.onFocus.bind(__self);
		__self.onKeyDown = __self.onKeyDown.bind(__self);
		var i = [].concat(a(navigator.mozMobileConnections)).map(function (e, t) {
			return e.getDeviceIdentities().then(function (e) {
				if (e.imei) return e.imei;
				var n = "Could not retrieve the " + "imei".toUpperCase() + " code for SIM " + t;
				return Promise.reject(new Error(n));
			});
		});

		Promise.all(i).then(function (e) {
			2 == e.length
				? ((document.getElementById("qrtitleone").innerHTML = "imei".toUpperCase() + " number"),
				  (document.getElementById("qrnumberone").innerHTML = e[0]),
				  (document.getElementById("qrimageone").innerHTML = n212.code128(e[0], "A")),
				  document.getElementById("qrtitleone").classList.add("titleqrone"),
				  (document.getElementById("qrtitletwo").innerHTML = "imei".toUpperCase() + " number"),
				  (document.getElementById("qrnumbertwo").innerHTML = e[1]),
				  (document.getElementById("qrimagetwo").innerHTML = n212.code128(e[1], "A")),
				  document.getElementById("qrtitletwo").classList.add("titleqrtwo"))
				: (document.getElementById("qrtitleone").classList.add("hidden"),
				  document.getElementById("qrnumberone").classList.add("hidden"),
				  document.getElementById("qrimageone").classList.add("hidden"),
				  (document.getElementById("qrtitletwo").innerHTML = "imei".toUpperCase() + " number"),
				  (document.getElementById("qrnumbertwo").innerHTML = e[0]),
				  (document.getElementById("qrimagetwo").innerHTML = n212.code128(e[0], "A")),
				  document.getElementById("qrtitletwo").classList.add("titleqr"));
		});
	}

	componentDidMount() {
		n5_Service.register("show", this),
			n5_Service.register("hide", this),
			n5_Service.register("isShown", this),
			this.updateSoftKeys(),
			(this.onFocus = this.onFocus.bind(this)),
			(this.onKeyDown = this.onKeyDown.bind(this));
	}
	onFocus() {
		return this.element === document.activeElement ? void this.updateSoftKeys() : (this.element.focus(), void this.updateSoftKeys());
	}
	focusIfPossible() {
		!this.element.contains(document.activeElement);
	}
	updateSoftKeys() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { left: "", center: "ok", right: "" };
		n16_SoftKeyStore.register(e, this.element);
	}
	onKeyDown(e) {
		switch (e.key) {
			case "EndCall":
			case "BrowserBack":
			case "Backspace":
			case "Enter":
				e.stopPropagation(), e.preventDefault(), this.hide();
				break;
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
			case "*":
			case "#":
				e.stopPropagation(), e.preventDefault();
		}
	}
	changeMyState() {
		this.setState({ focus: [0, 2] });
	}
	show() {
		return n5_Service.query("QRFace.isShown", this)
			? void this.focus()
			: void (this.isHidden() && (n5_Service.request("openSheet", "qrface"), (this.isShown = !0), this.element.focus()));
	}
	isHidden() {
		for (var e = this.element; e !== document.body && !e.classList.contains("hidden") && "closed" !== e.dataset.transitionState; ) e = e.parentElement;
		return e.classList.contains("hidden") || "closed" === e.dataset.transitionState;
	}
	hide() {
		n5_Service.request("closeSheet", "qrface"), (this.isShown = !1);
	}
	focus() {
		this.element.focus();
	}
	render() {
		var e = this;
		return React.createElement(
			"div",
			{
				tabIndex: "-1",
				className: "qrcode-input",
				onFocus: this.onFocus,
				onKeyDown: this.onKeyDown,
				ref: function (t) {
					e.element = t;
				},
			},
			React.createElement("div", { id: "qrtitleone" }),
			React.createElement("div", { className: "numberqr", id: "qrnumberone" }),
			React.createElement("div", { className: "container" }, React.createElement("div", { className: "barcode", id: "qrimageone" })),
			React.createElement("div", { id: "qrtitletwo" }),
			React.createElement("div", { className: "numberqr", id: "qrnumbertwo" }),
			React.createElement("div", { className: "container" }, React.createElement("div", { className: "barcode", id: "qrimagetwo" }))
		);
	}
}

const n213_QRFace_RC = n26(QRFace, "immediate", "immediate");

export default n213_QRFace_RC;
