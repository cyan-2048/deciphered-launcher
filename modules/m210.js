import React from "react";
import n6_RC from "./m6";
import n16 from "./m16";
import n5 from "./m5";
import n63_SpeedDialHelper from "./m63";
import n41 from "./m41";
import n201_Clock_RC from "./m201";
import n214_SimcardInfo_RC from "./m214";
import n109_FlashlightHelper from "./m109";
import n42_LaunchStore from "./m42";

class n210_MainView_RC extends n6_RC {
	static defaultProps = { open: null, close: null };
	static propTypes = { open: React.PropTypes.func, close: React.PropTypes.func };

	constructor(props) {
		super(props);

		const _self = this;

		n.name = "MainView";
		n.onKeyDown = function (e) {
			if (((_self.mcc = n41.getDataMcc()), (_self.simmcc = n41.getSimmcc()), !n5.query("LaunchStore.isLaunching") && n5.query("AppList.ready"))) {
				var t = e.key;
				if (!_self._longPressTimer) {
					switch (t) {
						case "Call":
							return void n42_LaunchStore.launch("manifestURL", "app://communications.gaiamobile.org/manifest.webapp");
						case "SoftLeft":
							return void n42_LaunchStore.launch("iac", "notice");
						case "Enter":
							_self.simmcc
								? ("460" !== _self.simmcc && "250" !== _self.simmcc) || n5.request("openSheet", "appList")
								: ("460" !== _self.mcc && "250" !== _self.mcc) || n5.request("openSheet", "appList");
							break;
						case "SoftRight":
							return void n5.request("openSheet", "instantSettings");
					}
					_self._longPressTimer = setTimeout(function () {
						switch ((_self.clearLongPressTimer(), (_self._longPressActionTriggered = !0), t)) {
							case "ArrowUp":
								n109_FlashlightHelper.toggle();
								break;
							case "Enter":
								_self.simmcc
									? "460" !== _self.simmcc &&
									  "250" !== _self.simmcc &&
									  n41.apps.some(function (e) {
											"Assistant" === e.manifest.name && e.launch();
									  })
									: "460" !== _self.mcc &&
									  "250" !== _self.mcc &&
									  n41.apps.some(function (e) {
											"Assistant" === e.manifest.name && e.launch();
									  });
								break;
							default:
								_self._longPressActionTriggered = !1;
						}
					}, _self.longPressDuration);
				}
			}
		};
		n.onKeyUp = function (e) {
			var t = e.key;
			if (_self._longPressTimer && !n5.query("LaunchStore.isLaunching") && n5.query("AppList.ready")) {
				if ((_self.clearLongPressTimer(), _self._longPressActionTriggered)) return void (_self._longPressActionTriggered = !1);
				switch (t) {
					case "Backspace":
						n42_LaunchStore.isLaunching && (n42_LaunchStore.isLaunching = !1);
						break;
					case "Enter":
						n5.request("openSheet", "appList");
				}
			}
		};
		n.longPressDuration = 1500;
		n.onKeyDown = _self.onKeyDown.bind(_self);
		n.onKeyUp = _self.onKeyUp.bind(_self);
		window.addEventListener("visibilitychange", function () {
			document.hidden && (_self._longPressActionTriggered = !1);
		});
	}

	componentDidMount() {
		n5.register("show", this);
		n5.register("hide", this);
		n16.register({ left: "notifications", center: "icon=all-apps", right: "shortcuts" }, this.element);
		n63_SpeedDialHelper.register(this.element);
	}
	clearLongPressTimer() {
		this._longPressTimer && (clearTimeout(this._longPressTimer), (this._longPressTimer = null));
	}
	show() {
		this.element.classList.remove("hidden"), this.focus();
	}
	hide() {
		this.element.classList.add("hidden");
	}
	focus() {
		this.element.focus();
	}
	render() {
		var e = this;
		return React.createElement(
			"div",
			{
				id: "main-view",
				tabIndex: "-1",
				onKeyDown: this.onKeyDown,
				onKeyUp: this.onKeyUp,
				ref: function (t) {
					e.element = t;
				},
			},
			React.createElement(n214_SimcardInfo_RC, null),
			React.createElement(n201_Clock_RC, null)
		);
	}
}

export default n210_MainView_RC;
