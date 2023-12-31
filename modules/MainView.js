import React from "react";
import ComponentBase from "./ComponentBase";
import softkeyStore from "./softkeyStore";
import Service from "./Service";
import speedDialHelper from "./speedDialHelper";
import appStore from "./appStore";
import Clock from "./Clock";
import SimcardInfo from "./SimcardInfo";
import flashlightHelper from "./flashlightHelper";
import launchStore from "./launchStore";

class MainView extends ComponentBase {
	static defaultProps = { open: null, close: null };
	static propTypes = { open: React.PropTypes.func, close: React.PropTypes.func };

	constructor(props) {
		super(props);

		const _self = this;
		const n = _self;

		n.name = "MainView";
		n.onKeyDown = function (e) {
			if (((_self.mcc = appStore.getDataMcc()), (_self.simmcc = appStore.getSimmcc()), !Service.query("LaunchStore.isLaunching") && Service.query("AppList.ready"))) {
				var t = e.key;
				if (!_self._longPressTimer) {
					switch (t) {
						case "Call":
							return void launchStore.launch("manifestURL", "app://communications.gaiamobile.org/manifest.webapp");
						case "SoftLeft":
							return void launchStore.launch("iac", "notice");
						case "Enter":
							_self.simmcc
								? ("460" !== _self.simmcc && "250" !== _self.simmcc) || Service.request("openSheet", "appList")
								: ("460" !== _self.mcc && "250" !== _self.mcc) || Service.request("openSheet", "appList");
							break;
						case "SoftRight":
							return void Service.request("openSheet", "instantSettings");
					}
					_self._longPressTimer = setTimeout(function () {
						switch ((_self.clearLongPressTimer(), (_self._longPressActionTriggered = true), t)) {
							case "ArrowUp":
								flashlightHelper.toggle();
								break;
							case "Enter":
								_self.simmcc
									? "460" !== _self.simmcc &&
									  "250" !== _self.simmcc &&
									  appStore.apps.some(function (e) {
											"Assistant" === e.manifest.name && e.launch();
									  })
									: "460" !== _self.mcc &&
									  "250" !== _self.mcc &&
									  appStore.apps.some(function (e) {
											"Assistant" === e.manifest.name && e.launch();
									  });
								break;
							default:
								_self._longPressActionTriggered = false;
						}
					}, _self.longPressDuration);
				}
			}
		};
		n.onKeyUp = function (e) {
			var t = e.key;
			if (_self._longPressTimer && !Service.query("LaunchStore.isLaunching") && Service.query("AppList.ready")) {
				if ((_self.clearLongPressTimer(), _self._longPressActionTriggered)) return void (_self._longPressActionTriggered = false);
				switch (t) {
					case "Backspace":
						launchStore.isLaunching && (launchStore.isLaunching = false);
						break;
					case "Enter":
						Service.request("openSheet", "appList");
				}
			}
		};
		n.longPressDuration = 1500;
		n.onKeyDown = _self.onKeyDown.bind(_self);
		n.onKeyUp = _self.onKeyUp.bind(_self);
		window.addEventListener("visibilitychange", function () {
			document.hidden && (_self._longPressActionTriggered = false);
		});
	}

	componentDidMount() {
		Service.register("show", this);
		Service.register("hide", this);
		softkeyStore.register({ left: "notifications", center: "icon=all-apps", right: "shortcuts" }, this.element);
		speedDialHelper.register(this.element);
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
			React.createElement(SimcardInfo, null),
			React.createElement(Clock, null)
		);
	}
}

export default MainView;
