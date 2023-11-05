// n11
import ReactDOM from "react-dom";
// n3
import React from "react";
// n6
import ComponentBase from "./ComponentBase";
// n5
import Service from "./Service";
import SoftKeyPanel from "./SoftKeyPanel";

import "./speedDialHelper";
import SelectSimMenu from "./SelectSimMenu";
import MainView from "./MainView";
import AppList from "./AppList";
import InstantSettings from "./InstantSettings";
import Dialer from "./Dialer";
import QRFace from "./QRFace";
import APNSelection from "./APNSelection";
import DialogRenderer from "./DialogRenderer";
import OptionMenuRenderer from "./OptionMenuRenderer";
import gridHelper from "./gridHelper";
import apnSelectionStore from "./apnSelectionStore";

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
					  apnSelectionStore.on("user-has-selected", function () {
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
		__self.state = { grid: gridHelper.grid };
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
		var self = this;
		return React.createElement(
			"div",
			{ className: "app-workspace" },
			React.createElement(
				"div",
				{ className: "app-content" },
				React.createElement(MainView, {
					ref: function (t) {
						self.panels.mainView = t;
					},
				}),
				React.createElement(
					AppList,
					u(
						{
							ref: function (t) {
								self.panels.appList = t;
							},
						},
						this.state.grid
					)
				),
				React.createElement(
					InstantSettings,
					u({}, this.state.grid, {
						ref: function (t) {
							self.panels.instantSettings = t;
						},
					})
				),
				React.createElement(Dialer, {
					ref: function (t) {
						self.panels.dialer = t;
					},
				}),
				React.createElement(QRFace, {
					ref: function (t) {
						self.panels.qrface = t;
					},
				}),
				React.createElement(APNSelection, {
					ref: function (t) {
						self.panels.apnselection = t;
					},
				})
			),
			React.createElement(OptionMenuRenderer, null),
			React.createElement(SelectSimMenu, null),
			React.createElement(DialogRenderer, null),
			React.createElement(SoftKeyPanel, {
				ref: function (t) {
					self.panels.softKey = t;
				},
			})
		);
	}
}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
