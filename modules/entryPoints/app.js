// n11
import ReactDOM from "react-dom";
// n3
import React from "react";
// n6
import ComponentBase from "../ComponentBase";
// n5
import Service from "../Service";
import SoftKeyPanel from "../SoftKeyPanel";

import "../m63";
import n72_RC from "../m72";
import n210_MainView_RC from "../m210";
import n200_AppList_RC from "../m200";
import n208_InstantSettings_RC from "../m208";
import n203_Dialer_RC from "../m203";
import n213_QRFace_RC from "../m213";
import n198_APNSelection_RC from "../m198";
import n106_DialogRenderer_RC from "../m106";
import n107_OptionMenuRenderer_RC from "../m107";
import n207_GridHelper from "../m207";
import n108 from "../m108";

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
	i.onsuccess = function () {
		e = i.result["ril.sms.StatusReport_enabled"];
		var t = {},
			n = window.navigator.mozSettings;
		(t["ril.sms.requestStatusReport.enabled"] = e), n.createLock().set(t);
	};
	n && dump("launcher app newoperators = " + JSON.stringify(n));
	var a = JSON.parse(localStorage.getItem("operators"));
	a && dump("launcher app oldOperators = " + JSON.stringify(a));
	var o = function (e) {
		dump("apn_selection item = " + e);
		if (n && n[e] && "23415" === n[e].mccmnc) {
			a && (dump("apn_selection oldOperators != null..."), a[e] && dump("apn_selection oldOperators[item] = " + JSON.stringify(a[e])));
			n[e] && dump("apn_selection operators[item]     = " + JSON.stringify(n[e]));
			(a && JSON.stringify(a[e]) === JSON.stringify(n[e])) ||
				(e > 0 && n[e - 1] && "23415" === n[e - 1].mccmnc && (!a || (JSON.stringify(n[e - 1]) !== JSON.stringify(a[e - 1]) && JSON.stringify(n[e]) !== JSON.stringify(a[e])))
					? (dump("apn_selection waiting for open the 2nd dialog"),
					  n108.on("user-has-selected", function () {
							dump("launcher app recv user-has-selected message..."),
								n[e] &&
									"23415" === n[e].mccmnc &&
									setTimeout(function () {
										Service.request("APNSelection:setOperatorId", e), Service.request("openSheet", "apnselection");
									}, 500);
					  }))
					: (Service.request("APNSelection:setOperatorId", e), Service.request("openSheet", "apnselection")));
		}
	};
	for (var r in n) o(r);
	localStorage.setItem("operators", JSON.stringify(n));
}

var u = Object.assign;

window.performance.mark("navigationLoaded");
window.addEventListener("load", function () {
	window.performance.mark("fullyLoaded"),
		document.body.classList.add("loaded"),
		setTimeout(function () {
			document.body.classList.remove("loaded");
		}, 3e3),
		s();
});

class App extends ComponentBase {
	constructor(props) {
		super(props);

		const __self = this;
		__self.name = "App";
		__self.panels = {};
		__self.state = { grid: n207_GridHelper.grid };
		window.app = __self;
		window.Service = Service;
		window.performance.mark("navigationInteractive");
	}

	componentWillMount() {
		window.performance.mark("contentInteractive");
	}
	componentDidMount() {
		(this.element = ReactDOM.findDOMNode(this)),
			window.performance.mark("visuallyLoaded"),
			this.focusWhenReady(),
			this._handle_largetextenabledchanged(),
			window.addEventListener("largetextenabledchanged", this),
			Service.register("openSheet", this),
			Service.register("closeSheet", this),
			Service.registerState("lastSheet", this),
			Service.registerState("panelAnimationRunning", this),
			this.element.style.setProperty("--grid-row", this.state.grid.row),
			this.element.style.setProperty("--grid-col", this.state.grid.col);
	}
	_handle_largetextenabledchanged() {
		document.body.classList.toggle("large-text", navigator.largeTextEnabled);
	}
	focusWhenReady() {
		var e = this;
		if (!this.focusMainView()) {
			var t = function t() {
				e.focusMainView(), document.removeEventListener("visibilitychange", t);
			};
			document.addEventListener("visibilitychange", t);
		}
	}
	focusMainView() {
		return this.panels.mainView.focus(), !document.hidden;
	}
	openSheet(e) {
		(this.lastSheet = e), this.panels[e].open(), "dialer" !== e && "qrface" !== e && this.element.classList.add("panel-" + e + "--opened");
	}
	closeSheet(e) {
		(this.panels[e].isClosed && this.panels[e].isClosed()) ||
			(this.panels[e].close && this.panels[e].close(),
			this.element.classList.remove("panel-" + e + "--opened"),
			("dialer" !== e && "qrface" !== e) || this.panels.appList.isClosed()
				? (this.panels.mainView.focus(), (this.lastSheet = "MainView"))
				: (this.panels.appList.focus(), (this.lastSheet = "AppList")));
	}
	render() {
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
				React.createElement(n203_Dialer_RC, {
					ref: function (t) {
						e.panels.dialer = t;
					},
				}),
				React.createElement(n213_QRFace_RC, {
					ref: function (t) {
						e.panels.qrface = t;
					},
				}),
				React.createElement(n198_APNSelection_RC, {
					ref: function (t) {
						e.panels.apnselection = t;
					},
				})
			),
			React.createElement(n107_OptionMenuRenderer_RC, null),
			React.createElement(n72_RC, null),
			React.createElement(n106_DialogRenderer_RC, null),
			React.createElement(SoftKeyPanel, {
				ref: function (t) {
					e.panels.softKey = t;
				},
			})
		);
	}
}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
