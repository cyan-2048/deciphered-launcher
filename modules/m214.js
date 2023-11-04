import React from "react";
import ComponentBase from "./ComponentBase";
import SettingsCore from "./SettingsCore";

class n214_SimcardInfo_RC extends ComponentBase {
	constructor(props) {
		super(props);

		this.name = "SimcardInfo";
		this.DEBUG = false;
		this.state = { isAirplaneMode: false, cardInfos: [] };
	}

	componentDidMount() {
		this._initCardInfos(), SettingsCore.addObserver("airplaneMode.enabled", this), SettingsCore.addObserver("custom.lockscreen.ui", this);
	}
	"_observe_airplaneMode.enabled"(e) {
		this.setState({ isAirplaneMode: e });
	}
	"_observe_custom.lockscreen.ui"(e) {
		(this._cuzVal = e), dump("launcher simcard_info.js observe setting value = " + e), this._updateCardInfos();
	}
	_initCardInfos() {
		var e = this,
			t = navigator.mozMobileConnections;
		if (t) {
			Array.from(t).forEach(function (t, n) {
				t.addEventListener("datachange", e), t.addEventListener("voicechange", e), t.addEventListener("signalstrengthchange", e);
			}),
				SettingsCore.get("custom.lockscreen.ui").then(function (t) {
					dump("launcher simcard_info.js get setting value = " + t), (e._cuzVal = t), e._updateCardInfos();
				});
			var n = this;
			navigator.customization.getValue("lockscreen.simcard.searching").then(function (e) {
				dump("launcher simcard_info getcustomvalue = " + e), (n._showSearching = e), n._updateCardInfos();
			});
		}
	}
	_auEmergencyState(e) {
		var t = navigator.mozMobileConnections[e].iccId,
			n = navigator.mozIccManager.getIccById(t);
		if (
			(dump("simcard_info.js icc.cardState: " + (n && n.cardState)),
			(null == n || "permanentBlocked" === n.cardState || "pinRequired" === n.cardState || "pukRequired" === n.cardState) && navigator.mozMobileConnections[e].voice.network.mcc)
		) {
			if ("505" == navigator.mozMobileConnections[e].voice.network.mcc) return null == n ? "noSim" : n.cardState;
		}
		return "";
	}
	_customOperatorNameAccordingLanguage(e, t) {
		var n, i, a;
		return (
			e &&
				e.voice &&
				e.voice.network &&
				e.voice.connected &&
				((n = e.voice.network.mcc),
				(i = e.voice.network.mnc),
				"460" != n || ("00" != i && "04" != i && "07" != i && "08" != i)
					? "460" != n || ("01" != i && "09" != i)
						? "460" != n || ("03" != i && "11" != i)
							? "466" == n && "97" == i
								? ((a = "zh-CN" == t ? "台湾大哥大" : "zh-TW" == t || "zh-HK" == t ? "臺灣大哥大" : e.voice.network.longName), (a = this._apt_in_twm(a, t, e.iccId)))
								: (a =
										"466" == n && "01" == i
											? "zh-CN" == t
												? "远传电信"
												: "zh-TW" == t || "zh-HK" == t
												? "遠傳電信"
												: e.voice.network.longName
											: "466" == n && "92" == i
											? "zh-CN" == t
												? "中华电信"
												: "zh-TW" == t || "zh-HK" == t
												? "中華電信"
												: e.voice.network.longName
											: "466" == n && "89" == i
											? "zh-CN" == t
												? "台湾之星"
												: "zh-TW" == t || "zh-HK" == t
												? "臺灣之星"
												: e.voice.network.longName
											: "466" == n && "05" == i
											? "zh-CN" == t
												? "亚太电信"
												: "zh-TW" == t || "zh-HK" == t
												? "亞太電信"
												: e.voice.network.longName
											: e.voice.network.longName)
							: (a = "zh-CN" == t || "zh-TW" == t || "zh-HK" == t ? "中国电信" : e.voice.network.longName)
						: (a = "zh-CN" == t || "zh-TW" == t || "zh-HK" == t ? "中国联通" : e.voice.network.longName)
					: (a = "zh-CN" == t || "zh-TW" == t || "zh-HK" == t ? "中国移动" : e.voice.network.longName)),
			a
		);
	}
	_updateCardInfosImpl(e) {
		var t = this,
			n = navigator.mozMobileConnections;
		if (n) {
			var i = [];
			Array.from(n).forEach(function (n, a) {
				var o = !n.iccId,
					r = 0,
					s = false;
				o || (r = n.signalStrength ? n.signalStrength.level + 1 || 0 : Math.ceil(n.voice.relSignalStrength / 20) || 0), 0 == r && (s = true);
				var u = void 0,
					l = void 0;
				dump("launcher simcard_info.js _cuzVal = " + t._cuzVal + ", index = " + a);
				var c = !(!navigator.mozTelephony || !navigator.mozTelephony.active),
					f = n.voice && n.voice.connected,
					d = n.data && n.data.connected,
					p = t._auEmergencyState(a);
				1 === t._cuzVal
					? o
						? null === n.voice.state
							? ((u = "noSimCard"), dump("launcher simcard_info.js noSimCard"))
							: ((u = "eccOnly"), dump("launcher simcard_info.js noSimCard but eccOnly"))
						: null === n.voice.state || s
						? ((u = "noService"), dump("launcher simcard_info.js SIM in but noService"))
						: f || d || (c && navigator.mozTelephony.active.serviceId === a)
						? n.voice.network && n.voice.network.longName
							? (l = n.voice.network.longName)
							: ((u = "emergencyCallsOnly"), dump("launcher simcard_info.js SIM in but emergencyCallsOnly"))
						: ((r = 0),
						  "searching" === n.voice.state
								? ((u = "searching"), dump("launcher simcard_info.js SIM in but searching"))
								: n.voice.emergencyCallsOnly
								? ((u = "emergencyCallsOnly"), dump("launcher simcard_info.js SIM in emergencyCallsOnly"))
								: ((u = "noService"), dump("launcher simcard_info.js SIM in but not searching, noService")))
					: 2 === t._cuzVal || p
					? o
						? ((u = "nocard-eccOnly"), dump("AU launcher simcard_info.js noSimCard but eccOnly"))
						: null === n.voice.state || s
						? ((u = "noService"), dump("AU launcher simcard_info.js SIM in but noService"))
						: f || d || (c && navigator.mozTelephony.active.serviceId === a)
						? n.voice.network && n.voice.network.longName
							? (l = n.voice.network.longName)
							: ((u = "unusablecard-eccOnly"), dump("AU launcher simcard_info.js SIM in but emergencyCallsOnly"))
						: ((r = 0),
						  "searching" === n.voice.state
								? ((u = "unusablecard-eccOnly"), dump("AU launcher simcard_info.js SIM in but searching"))
								: n.voice.emergencyCallsOnly
								? ((u = "unusablecard-eccOnly"), dump("AU launcher simcard_info.js SIM in emergencyCallsOnly"))
								: ((u = "noService"), dump("AU launcher simcard_info.js SIM in but not searching, noService")))
					: o && "registered" !== n.voice.state
					? (u = "noSimCard")
					: "searching" === n.voice.state
					? t._showSearching && (u = "searching")
					: n.voice.emergencyCallsOnly
					? (u = "noService")
					: n.voice.connected && n.voice.network
					? (l = n.voice.network.longName)
					: (u = "noService"),
					(l = t._customOperatorNameAccordingLanguage(n, e));
				var h = navigator.mozMobileConnections[a].iccId,
					m = navigator.mozIccManager.getIccById(h);
				p || !m || ("pinRequired" !== m.cardState && "pukRequired" !== m.cardState) || (u = "lockedSim"),
					dump("launcher simcard_info.js index = " + a + ", signalLevel = " + r + ", carrierName = " + l + ", stateL10nId = " + u),
					i.push({ signalLevel: r, carrierName: l, stateL10nId: u });
			}),
				this.setState({ cardInfos: i });
		}
	}
	_apt_in_twm(e, t, n) {
		var i = navigator.mozIccManager.getIccById(n),
			a = i.iccInfo.mcc,
			o = i.iccInfo.mnc;
		return (
			dump("launcher _apt_in_twn simmcc=" + a + ",simmnc=" + o), "466" == a && "05" == o && (e = "zh-CN" == t ? "亚太电信" : "zh-TW" == t || "zh-HK" == t ? "亞太電信" : "APT"), e
		);
	}
	_updateCardInfos() {
		var e = this,
			t = navigator.mozSettings.createLock().get("language.current");
		t.onsuccess = function () {
			var n = t.result["language.current"];
			e._updateCardInfosImpl(n);
		};
	}
	_getCustomizationVal(e) {
		dump("launcher simcard_info.js type = " + e + ", _cuzVal = " + this._cuzVal), this._updateCardInfos();
	}
	_handle_voicechange(e) {
		this._getCustomizationVal("voice");
	}
	_handle_datachange(e) {
		this._getCustomizationVal("data");
	}
	_handle_signalstrengthchange(e) {
		this._getCustomizationVal("signal");
	}
	render() {
		var e = SIMSlotManager.isMultiSIM(),
			t = this.state.cardInfos.map(function (t, n) {
				var i = e
						? React.createElement(
								"div",
								{ className: "icon-wrapper" },
								React.createElement(
									"div",
									{ className: "icon inactive", "data-icon": "sim-" + (n + 1) },
									React.createElement("div", { className: "icon", "data-icon": "signal-0" })
								)
						  )
						: React.createElement("div", { className: "icon-wrapper" }, React.createElement("div", { className: "icon inactive", "data-icon": "no-sim" })),
					a = React.createElement(
						"div",
						{ className: "icon-wrapper", "data-is-searching": "searching" === t.stateL10nId },
						React.createElement("div", { className: "icon level", "data-icon": "signal-" + t.signalLevel }),
						React.createElement("div", { className: "icon bg", "data-icon": "signal-5" })
					),
					o = navigator.mozL10n.get(t.stateL10nId).length > 25,
					r = SIMSlotManager.isSIMCardAbsent(n) ? "text inactive" : "text";
				return (
					o ? (r += " needscroll") : "",
					React.createElement(
						"div",
						{ className: "info-row", key: n },
						["noSimCard", "lockedSim", "eccOnly", "nocard-eccOnly"].includes(t.stateL10nId) ? i : a,
						React.createElement("div", { className: "carrier-name secondary" }, React.createElement("span", { className: r, "data-l10n-id": t.stateL10nId }, t.carrierName))
					)
				);
			}),
			n = React.createElement("div", { className: "airplane-mode-info", "data-l10n-id": "airplane-mode" });
		return React.createElement("div", { id: "simcard-info", "data-is-airplane-mode": this.state.isAirplaneMode }, t, n);
	}
}

export default n214_SimcardInfo_RC;
