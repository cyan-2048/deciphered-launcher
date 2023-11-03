// n11
import ReactDOM from "react-dom";
// n3
import React from "react";
// n6
import n6_RC from "./m6";
// n5
import n5 from "./m5";
import SoftKeyPanel_RC from "./m73";

import "./m63";
import n72_RC from "./m72";
import n210_MainView_RC from "./m210";
import n200_AppList_RC from "./m200";
import n208_InstantSettings_RC from "./m208";

const require = () => {};

function toEsm(e) {
	return e && e.__esModule ? e : { default: e };
}

function a(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
	if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
}
function r(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
		t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
function s() {
	var e,
		t = navigator.mozMobileConnections,
		n = Array.from(t).map(function (e) {
			var t = navigator.mozIccManager.getIccById(e.iccId);
			if (!t) return null;
			var n = t.iccInfo;
			return { iccid: e.iccId, mccmnc: n ? n.mcc + n.mnc : null };
		}),
		i = navigator.mozSettings.createLock().get("ril.sms.StatusReport_enabled");
	(i.onsuccess = function () {
		e = i.result["ril.sms.StatusReport_enabled"];
		var t = {},
			n = window.navigator.mozSettings;
		(t["ril.sms.requestStatusReport.enabled"] = e), n.createLock().set(t);
	}),
		n && dump("launcher app newoperators = " + JSON.stringify(n));
	var a = JSON.parse(localStorage.getItem("operators"));
	a && dump("launcher app oldOperators = " + JSON.stringify(a));
	var o = function (e) {
		dump("apn_selection item = " + e),
			n &&
				n[e] &&
				"23415" === n[e].mccmnc &&
				(a && (dump("apn_selection oldOperators != null..."), a[e] && dump("apn_selection oldOperators[item] = " + JSON.stringify(a[e]))),
				n[e] && dump("apn_selection operators[item]     = " + JSON.stringify(n[e])),
				(a && JSON.stringify(a[e]) === JSON.stringify(n[e])) ||
					(e > 0 && n[e - 1] && "23415" === n[e - 1].mccmnc && (!a || (JSON.stringify(n[e - 1]) !== JSON.stringify(a[e - 1]) && JSON.stringify(n[e]) !== JSON.stringify(a[e])))
						? (dump("apn_selection waiting for open the 2nd dialog"),
						  F.default.on("user-has-selected", function () {
								dump("launcher app recv user-has-selected message..."),
									n[e] &&
										"23415" === n[e].mccmnc &&
										setTimeout(function () {
											n5.request("APNSelection:setOperatorId", e), n5.request("openSheet", "apnselection");
										}, 500);
						  }))
						: (n5.request("APNSelection:setOperatorId", e), n5.request("openSheet", "apnselection"))));
	};
	for (var r in n) o(r);
	localStorage.setItem("operators", JSON.stringify(n));
}
var u =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
			}
			return e;
		},
	l = (function () {
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
	T = require(203),
	M = toEsm(T),
	C = require(213),
	A = toEsm(C),
	L = require(198),
	j = toEsm(L),
	N = require(106),
	D = toEsm(N),
	x = require(107),
	z = toEsm(x),
	q = require(207),
	R = toEsm(q),
	B = require(108),
	F = toEsm(B);
window.performance.mark("navigationLoaded"),
	window.addEventListener("load", function () {
		window.performance.mark("fullyLoaded"),
			document.body.classList.add("loaded"),
			setTimeout(function () {
				document.body.classList.remove("loaded");
			}, 3e3),
			s();
	});
var K = (function (e) {
	function t(e) {
		a(this, t);
		var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
		return (n.name = "App"), (n.panels = {}), (n.state = { grid: R.default.grid }), (window.app = n), (window.Service = n5), window.performance.mark("navigationInteractive"), n;
	}
	return (
		r(t, e),
		l(t, [
			{
				key: "componentWillMount",
				value: function () {
					window.performance.mark("contentInteractive");
				},
			},
			{
				key: "componentDidMount",
				value: function () {
					(this.element = ReactDOM.findDOMNode(this)),
						window.performance.mark("visuallyLoaded"),
						this.focusWhenReady(),
						this._handle_largetextenabledchanged(),
						window.addEventListener("largetextenabledchanged", this),
						n5.register("openSheet", this),
						n5.register("closeSheet", this),
						n5.registerState("lastSheet", this),
						n5.registerState("panelAnimationRunning", this),
						this.element.style.setProperty("--grid-row", this.state.grid.row),
						this.element.style.setProperty("--grid-col", this.state.grid.col);
				},
			},
			{
				key: "_handle_largetextenabledchanged",
				value: function () {
					document.body.classList.toggle("large-text", navigator.largeTextEnabled);
				},
			},
			{
				key: "focusWhenReady",
				value: function () {
					var e = this;
					if (!this.focusMainView()) {
						var t = function t() {
							e.focusMainView(), document.removeEventListener("visibilitychange", t);
						};
						document.addEventListener("visibilitychange", t);
					}
				},
			},
			{
				key: "focusMainView",
				value: function () {
					return this.panels.mainView.focus(), !document.hidden;
				},
			},
			{
				key: "openSheet",
				value: function (e) {
					(this.lastSheet = e), this.panels[e].open(), "dialer" !== e && "qrface" !== e && this.element.classList.add("panel-" + e + "--opened");
				},
			},
			{
				key: "closeSheet",
				value: function (e) {
					(this.panels[e].isClosed && this.panels[e].isClosed()) ||
						(this.panels[e].close && this.panels[e].close(),
						this.element.classList.remove("panel-" + e + "--opened"),
						("dialer" !== e && "qrface" !== e) || this.panels.appList.isClosed()
							? (this.panels.mainView.focus(), (this.lastSheet = "MainView"))
							: (this.panels.appList.focus(), (this.lastSheet = "AppList")));
				},
			},
			{
				key: "render",
				value: function () {
					var e = this;
					return React.createElement(
						"div",
						{ className: "app-workspace" },
						React.createElement(
							"div",
							{ className: "app-content" },
							React.createElement(n210_MainView_RC, {
								ref: function (t) {
									e.panels.mainView = t;
								},
							}),
							React.createElement(
								n200_AppList_RC,
								u(
									{
										ref: function (t) {
											e.panels.appList = t;
										},
									},
									this.state.grid
								)
							),
							React.createElement(
								n208_InstantSettings_RC,
								u({}, this.state.grid, {
									ref: function (t) {
										e.panels.instantSettings = t;
									},
								})
							),
							React.createElement(M.default, {
								ref: function (t) {
									e.panels.dialer = t;
								},
							}),
							React.createElement(A.default, {
								ref: function (t) {
									e.panels.qrface = t;
								},
							}),
							React.createElement(j.default, {
								ref: function (t) {
									e.panels.apnselection = t;
								},
							})
						),
						React.createElement(z.default, null),
						React.createElement(n72_RC, null),
						React.createElement(D.default, null),
						React.createElement(SoftKeyPanel_RC, {
							ref: function (t) {
								e.panels.softKey = t;
							},
						})
					);
				},
			},
		]),
		t
	);
})(n6_RC);
ReactDOM.render(React.createElement(K, null), document.getElementById("root"));
