import React from "react";
import Service from "./Service";
import ComponentBase from "./ComponentBase";
import n26 from "./m26";
import * as n13 from "./m13";
import n64 from "./m64";
import n105_ContactsStore from "./m105";
import n204_DialerInput_RC from "./m204";
import n205_DialerSuggestions_RC from "./m205";

class Dialer extends ComponentBase {
	constructor(e) {
		super(e);

		const __self = this;

		__self.name = "Dialer";
		__self.ready = false;
		__self.toggleStayEffect = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
			__self.parentBox.classList.toggle("with-dialer-stay-effect", e);
		};
		__self.initState = { dialerState: null, matchedContact: null, telNum: "", suggestions: [] };
		__self.state = Object.assign({}, __self.initState);
		n64.on("mmiloading", __self.showLoading.bind(__self));
		n64.on("mmiloaded", __self.showAlert.bind(__self));
		n64.on("ussd-received", __self.onUssdReceived.bind(__self));
		__self.children = {};
		["onKeyDown", "call", "hide", "updateTelNum", "focusInput"].forEach(function (e) {
			__self[e] = __self[e].bind(__self);
		});
		__self.timer = null;
		Service.register("show", __self);
		Service.register("hide", __self);
		Service.register("toggleStayEffect", __self);
		Service.register("resetCallingMarker", __self);
		Service.registerState("ready", __self);
		Service.registerState("isShown", __self);
		Service.registerState("isCalling", __self);
	}

	componentDidMount() {
		var e = this;
		n105_ContactsStore.on("contact-changed", function () {
			e.isShown && e.getSuggestions(e.state.telNum);
		}),
			this.updateTelTypes(),
			(this.parentBox = this.element.parentElement.parentElement),
			this.parentBox.addEventListener("animationend", function () {
				e.toggleStayEffect();
			}),
			(this.ready = true);
	}
	onUssdReceived(e) {
		if ((n64.mmiloading && Service.request("hideDialog"), !e.message))
			return void Service.request("showDialog", { type: "alert", header: "Error USSD case!", content: JSON.stringify(e), translated: true, noClose: false });
		var t = navigator.mozMobileConnections[e.serviceId || 0].voice.network,
			n = t ? t.shortName || t.longName : "";
		Service.request("showDialog", { type: "alert", header: n, content: e.message.replace(/\\r\\n|\\r|\\n/g, "\n"), translated: true, noClose: false });
	}
	show(e) {
		this.isShown ||
			(this.isHidden() &&
				(this.updateTelTypes(),
				Service.request("openSheet", "dialer"),
				(this.isShown = true),
				this.element.focus(),
				e && (this.focusInput(), this.children.dialerInput.sendFirstChar(e))));
	}
	hide() {
		this.isHidden() || Service.request("closeSheet", "dialer"),
			(this.isShown = false),
			(this.children.dialerInput.element.style.fontSize = ""),
			this.setState(this.initState),
			this.children.dialerInput.setState({ telNum: "" });
	}
	updateTelTypes() {
		var e = this;
		navigator.mozL10n.ready(function () {
			e.telTypes = ["personal", "mobile", "home", "work", "fax-home", "fax-office", "fax-other"].reduce(function (e, t) {
				return (e[t] = n13.toL10n(t)), e;
			}, {});
		});
	}
	isHidden() {
		for (var e = this.element; e !== document.body && !e.classList.contains("hidden") && "closed" !== e.dataset.transitionState; ) e = e.parentElement;
		return e.classList.contains("hidden") || "closed" === e.dataset.transitionState;
	}
	updateTelNum(e) {
		var t = this,
			n = { telNum: e };
		e.length < 2 && ((n.matchedContact = this.initState.matchedContact), (n.suggestions = this.initState.suggestions)),
			this.setState(n, function () {
				0 === e.length ? t.hide() : n64.instantDialIfNecessary(e) && (t.children.dialerInput.exitDialer(), n64.dial(e)),
					e.length >= 4 &&
						(clearTimeout(t.timer),
						(t.timer = setTimeout(function () {
							t.getSuggestions(e);
						}, 500)));
			});
	}
	focusInput() {
		this.stopRenderSteply(), this.children.dialerInput.element.focus();
	}
	focusSuggestions() {
		var e = this;
		this.state.suggestions.length &&
			(this.children.dialerSuggestions.initFocus(),
			this.allSuggestions.keyword ||
				setTimeout(function () {
					e.renderSteply();
				}, 0));
	}
	renderSteply() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10,
			t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
			n = this.state.suggestions.length;
		if (this.allSuggestions.length <= n) return void this.stopRenderSteply();
		var i = this.allSuggestions.slice(0, n + e);
		(i.keyword = this.state.telNum), this.setState({ suggestions: i }), (this.suggestionRenderTimer = setTimeout(this.renderSteply.bind(this), t));
	}
	stopRenderSteply() {
		this.suggestionRenderTimer && (window.clearTimeout(this.suggestionRenderTimer), (this.suggestionRenderTimer = null));
	}
	call() {
		var e = this,
			t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			n = t.number,
			i = void 0 === n ? this.state.telNum : n,
			a = t.isVideo,
			o = void 0 !== a && a;
		return this.isCalling
			? void Service.request("showDialog", {
					ok: "skip",
					cancel: "cancel",
					type: "confirm",
					content: "otherConnectionInUseMessage",
					onOk: function () {
						Service.request("Dialer:resetCallingMarker");
					},
			  })
			: ((this.isCalling = true),
			  this.stopRenderSteply(),
			  void n64
					.dial(i, o)
					.then(function () {
						(e.isCalling = false), Service.request("Dialer:hide"), Service.request("hideDialog");
					})
					.catch(function () {
						e.isCalling = false;
					}));
	}
	getSuggestions(e) {
		n64.isValid(e) && n13.contactNumFilter({ telNum: e }).then(this.filterSuggestions.bind(this, e));
	}
	filterSuggestions(e, t) {
		var n = this,
			i = void 0,
			a = t
				.reduce(function (t, a) {
					return t.concat(
						a.tel.map(function (t) {
							var o = { id: a.id, name: a.name && a.name[0], type: n.getL10nFromTelTypes(t.type[0] || "mobile"), number: t.value };
							return i || t.value !== e || (i = o), o;
						})
					);
				}, [])
				.filter(function (e) {
					return -1 !== e.number.indexOf(n.state.telNum);
				});
		(this.allSuggestions = a), this.renderSuggestions(a.slice(0, 5), i, e);
	}
	renderSuggestions(e, t, n) {
		var i = this;
		n === this.state.telNum &&
			((e.keyword = n),
			this.setState({ matchedContact: t, suggestions: e }, function () {
				i.children.dialerSuggestions.element.scrollTo(0, 0);
			}));
	}
	onKeyDown(e) {
		var t = e.key;
		switch ((e.stopPropagation(), t)) {
			case "EndCall":
				this.hide();
				break;
			case "ArrowDown":
				this.focusSuggestions();
		}
	}
	getMatchedContactInfo() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.matchedContact,
			t = void 0;
		return e && (t = [e.name, e.type].filter(Boolean).join(", ")), t;
	}
	showAlert(e, t) {
		this.resetCallingMarker(),
			Service.request("Dialer:hide"),
			(e || t) &&
				Service.request("showDialog", {
					type: "custom",
					header: e,
					content: n13.toL10n(t),
					buttons: [{ message: "" }, { message: "ok" }, { message: "" }],
					translated: true,
					noClose: false,
				});
	}
	resetCallingMarker() {
		this.isCalling = false;
	}
	showLoading() {
		Service.request("Dialer:hide").then(function () {
			Service.request("showDialog", {
				type: "custom",
				content: "sending",
				buttons: [{ message: "" }, { message: "ok" }, { message: "" }],
				otherClass: "is-loading",
				noClose: false,
			});
		});
	}
	getL10nFromTelTypes(e) {
		return this.telTypes[e] || e;
	}
	render() {
		var e = this;
		return React.createElement(
			"div",
			{
				className: "dialerBox",
				tabIndex: "-1",
				onKeyDown: this.onKeyDown,
				ref: function (t) {
					e.element = t;
				},
			},
			React.createElement(
				"div",
				{ className: "dialer-header" },
				React.createElement("div", { className: "dialer-state text-thi" }, this.state.dialerState),
				React.createElement(n204_DialerInput_RC, {
					ref: function (t) {
						e.children.dialerInput = t;
					},
					dial: this.call,
					exitDialer: this.hide,
					updateTelNum: this.updateTelNum,
				}),
				React.createElement("div", { className: "dialer-info text-thi" }, this.getMatchedContactInfo())
			),
			React.createElement(n205_DialerSuggestions_RC, {
				ref: function (t) {
					e.children.dialerSuggestions = t;
				},
				suggestions: this.state.suggestions,
				exitSuggestions: this.focusInput,
				dial: this.call,
			})
		);
	}
}

const n203_Dialer_RC = n26(Dialer, "immediate", "immediate");

export default n203_Dialer_RC;
