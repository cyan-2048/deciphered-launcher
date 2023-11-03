import React from "react";
import n5 from "./m5";
import n6_RC from "./m6";
import n26 from "./m26";
import * as n13 from "./m13";
import n64 from "./m64";
import n105_ContactsStore from "./m105";

function moduleToESM(e) {
	if (e && e.__esModule) return e;
	var t = {};
	if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	return (t.default = e), t;
}
function toESM(e) {
	return e && e.__esModule ? e : { default: e };
}
function o(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function r(e, t) {
	if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
}
function s(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
		t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}

var u = (function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var i = t[n];
				(i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
			}
		}
		return function (t, n, i) {
			return n && e(t.prototype, n), i && e(t, i), t;
		};
	})(),
	g = require(204),
	y = toESM(g),
	b = require(205),
	w = toESM(b);

var P = (function (e) {
	function t(e) {
		o(this, t);
		var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
		return (
			(n.name = "Dialer"),
			(n.ready = !1),
			(n.toggleStayEffect = function () {
				var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
				n.parentBox.classList.toggle("with-dialer-stay-effect", e);
			}),
			(n.initState = { dialerState: null, matchedContact: null, telNum: "", suggestions: [] }),
			(n.state = Object.assign({}, n.initState)),
			n64.on("mmiloading", n.showLoading.bind(n)),
			n64.on("mmiloaded", n.showAlert.bind(n)),
			n64.on("ussd-received", n.onUssdReceived.bind(n)),
			(n.children = {}),
			["onKeyDown", "call", "hide", "updateTelNum", "focusInput"].forEach(function (e) {
				n[e] = n[e].bind(n);
			}),
			(n.timer = null),
			n5.register("show", n),
			n5.register("hide", n),
			n5.register("toggleStayEffect", n),
			n5.register("resetCallingMarker", n),
			n5.registerState("ready", n),
			n5.registerState("isShown", n),
			n5.registerState("isCalling", n),
			n
		);
	}
	return (
		s(t, e),
		u(t, [
			{
				key: "componentDidMount",
				value: function () {
					var e = this;
					n105_ContactsStore.on("contact-changed", function () {
						e.isShown && e.getSuggestions(e.state.telNum);
					}),
						this.updateTelTypes(),
						(this.parentBox = this.element.parentElement.parentElement),
						this.parentBox.addEventListener("animationend", function () {
							e.toggleStayEffect();
						}),
						(this.ready = !0);
				},
			},
			{
				key: "onUssdReceived",
				value: function (e) {
					if ((n64.mmiloading && n5.request("hideDialog"), !e.message))
						return void n5.request("showDialog", { type: "alert", header: "Error USSD case!", content: JSON.stringify(e), translated: !0, noClose: !1 });
					var t = navigator.mozMobileConnections[e.serviceId || 0].voice.network,
						n = t ? t.shortName || t.longName : "";
					n5.request("showDialog", { type: "alert", header: n, content: e.message.replace(/\\r\\n|\\r|\\n/g, "\n"), translated: !0, noClose: !1 });
				},
			},
			{
				key: "show",
				value: function (e) {
					this.isShown ||
						(this.isHidden() &&
							(this.updateTelTypes(),
							n5.request("openSheet", "dialer"),
							(this.isShown = !0),
							this.element.focus(),
							e && (this.focusInput(), this.children.dialerInput.sendFirstChar(e))));
				},
			},
			{
				key: "hide",
				value: function () {
					this.isHidden() || n5.request("closeSheet", "dialer"),
						(this.isShown = !1),
						(this.children.dialerInput.element.style.fontSize = ""),
						this.setState(this.initState),
						this.children.dialerInput.setState({ telNum: "" });
				},
			},
			{
				key: "updateTelTypes",
				value: function () {
					var e = this;
					navigator.mozL10n.ready(function () {
						e.telTypes = ["personal", "mobile", "home", "work", "fax-home", "fax-office", "fax-other"].reduce(function (e, t) {
							return (e[t] = n13.toL10n(t)), e;
						}, {});
					});
				},
			},
			{
				key: "isHidden",
				value: function () {
					for (var e = this.element; e !== document.body && !e.classList.contains("hidden") && "closed" !== e.dataset.transitionState; ) e = e.parentElement;
					return e.classList.contains("hidden") || "closed" === e.dataset.transitionState;
				},
			},
			{
				key: "updateTelNum",
				value: function (e) {
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
				},
			},
			{
				key: "focusInput",
				value: function () {
					this.stopRenderSteply(), this.children.dialerInput.element.focus();
				},
			},
			{
				key: "focusSuggestions",
				value: function () {
					var e = this;
					this.state.suggestions.length &&
						(this.children.dialerSuggestions.initFocus(),
						this.allSuggestions.keyword ||
							setTimeout(function () {
								e.renderSteply();
							}, 0));
				},
			},
			{
				key: "renderSteply",
				value: function () {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10,
						t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
						n = this.state.suggestions.length;
					if (this.allSuggestions.length <= n) return void this.stopRenderSteply();
					var i = this.allSuggestions.slice(0, n + e);
					(i.keyword = this.state.telNum), this.setState({ suggestions: i }), (this.suggestionRenderTimer = setTimeout(this.renderSteply.bind(this), t));
				},
			},
			{
				key: "stopRenderSteply",
				value: function () {
					this.suggestionRenderTimer && (window.clearTimeout(this.suggestionRenderTimer), (this.suggestionRenderTimer = null));
				},
			},
			{
				key: "call",
				value: function () {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
						n = t.number,
						i = void 0 === n ? this.state.telNum : n,
						a = t.isVideo,
						o = void 0 !== a && a;
					return this.isCalling
						? void n5.request("showDialog", {
								ok: "skip",
								cancel: "cancel",
								type: "confirm",
								content: "otherConnectionInUseMessage",
								onOk: function () {
									n5.request("Dialer:resetCallingMarker");
								},
						  })
						: ((this.isCalling = !0),
						  this.stopRenderSteply(),
						  void n64
								.dial(i, o)
								.then(function () {
									(e.isCalling = !1), n5.request("Dialer:hide"), n5.request("hideDialog");
								})
								.catch(function () {
									e.isCalling = !1;
								}));
				},
			},
			{
				key: "getSuggestions",
				value: function (e) {
					n64.isValid(e) && n13.contactNumFilter({ telNum: e }).then(this.filterSuggestions.bind(this, e));
				},
			},
			{
				key: "filterSuggestions",
				value: function (e, t) {
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
				},
			},
			{
				key: "renderSuggestions",
				value: function (e, t, n) {
					var i = this;
					n === this.state.telNum &&
						((e.keyword = n),
						this.setState({ matchedContact: t, suggestions: e }, function () {
							i.children.dialerSuggestions.element.scrollTo(0, 0);
						}));
				},
			},
			{
				key: "onKeyDown",
				value: function (e) {
					var t = e.key;
					switch ((e.stopPropagation(), t)) {
						case "EndCall":
							this.hide();
							break;
						case "ArrowDown":
							this.focusSuggestions();
					}
				},
			},
			{
				key: "getMatchedContactInfo",
				value: function () {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.matchedContact,
						t = void 0;
					return e && (t = [e.name, e.type].filter(Boolean).join(", ")), t;
				},
			},
			{
				key: "showAlert",
				value: function (e, t) {
					this.resetCallingMarker(),
						n5.request("Dialer:hide"),
						(e || t) &&
							n5.request("showDialog", {
								type: "custom",
								header: e,
								content: n13.toL10n(t),
								buttons: [{ message: "" }, { message: "ok" }, { message: "" }],
								translated: !0,
								noClose: !1,
							});
				},
			},
			{
				key: "resetCallingMarker",
				value: function () {
					this.isCalling = !1;
				},
			},
			{
				key: "showLoading",
				value: function () {
					n5.request("Dialer:hide").then(function () {
						n5.request("showDialog", {
							type: "custom",
							content: "sending",
							buttons: [{ message: "" }, { message: "ok" }, { message: "" }],
							otherClass: "is-loading",
							noClose: !1,
						});
					});
				},
			},
			{
				key: "getL10nFromTelTypes",
				value: function (e) {
					return this.telTypes[e] || e;
				},
			},
			{
				key: "render",
				value: function () {
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
							React.createElement(y.default, {
								ref: function (t) {
									e.children.dialerInput = t;
								},
								dial: this.call,
								exitDialer: this.hide,
								updateTelNum: this.updateTelNum,
							}),
							React.createElement("div", { className: "dialer-info text-thi" }, this.getMatchedContactInfo())
						),
						React.createElement(w.default, {
							ref: function (t) {
								e.children.dialerSuggestions = t;
							},
							suggestions: this.state.suggestions,
							exitSuggestions: this.focusInput,
							dial: this.call,
						})
					);
				},
			},
		]),
		t
	);
})(n6_RC);

const n203 = n26(P, "immediate", "immediate");

export default n203;
