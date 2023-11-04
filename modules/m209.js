import n104 from "./m104";
import n109_FlashlightHelper from "./m109";
import StoreBase from "./StoreBase";
import SettingsCore from "./SettingsCore";
import n42_LaunchStore from "./m42";
import * as n13 from "./m13";

class InstantSettingsStore extends StoreBase {
	constructor() {
		super();
		const __self = this;

		__self.name = "InstantSettingsStore";
		__self.oriSettings = [
			{
				name: "volume",
				icon: "sound-max",
				isShortcut: true,
				title: "volume",
				order: { portrait: 1, landscape: 1 },
				click: function (t) {
					return __self.volumeManagerTimer
						? void (("ArrowUp" !== t && "ArrowDown" !== t) || (__self.enterVolumeManagerMode(), navigator.volumeManager["request" + t.slice(5)]()))
						: (__self.enterVolumeManagerMode(), void navigator.volumeManager.requestShow());
				},
			},
			{
				name: "brightness",
				icon: "brightness",
				isShortcut: true,
				title: "brightness",
				subtitle: "percentage-number",
				order: { portrait: 2, landscape: 2 },
				cskType: "toggle",
				click: __self.toggleBrightness.bind(__self),
			},
			{
				name: "flashlight",
				icon: "flashlight-on",
				iconInactived: "flashlight-off",
				title: "flashlight",
				removed: true,
				order: { portrait: 4, landscape: 3 },
				cskType: "toggle",
				click: n109_FlashlightHelper.toggle.bind(n109_FlashlightHelper),
			},
			{
				name: "camera",
				icon: "camera",
				isShortcut: true,
				title: "camera",
				order: { portrait: 7, landscape: 6 },
				cskType: "launch",
				click: function () {
					n42_LaunchStore.launch("manifestURL", "app://camera.gaiamobile.org/manifest.webapp");
				},
			},
			{
				name: "calculator",
				icon: "calculator",
				isShortcut: true,
				title: "calculator",
				order: { portrait: 5, landscape: -1 },
				cskType: "launch",
				click: function () {
					n42_LaunchStore.launch("manifestURL", "app://calculator.gaiamobile.org/manifest.webapp");
				},
			},
			{
				name: "airplane-mode",
				icon: "airplane-mode",
				iconInactived: "airplane-mode-off",
				title: "airplane-mode",
				observerSetting: "airplaneMode.enabled",
				order: { portrait: 8, landscape: 7 },
				cskType: "toggle",
			},
			{
				name: "wifi",
				icon: "wifi-32px",
				iconInactived: "wifi-off-32px",
				title: "wifi",
				observerSetting: "wifi.enabled",
				removed: true,
				order: { portrait: 0, landscape: 0 },
				cskType: "toggle",
			},
			{
				name: "network",
				icon: "network-activity",
				iconInactived: "network-activity-off",
				title: "cellular-data",
				observerSetting: "ril.data.enabled",
				order: { portrait: 3, landscape: 4 },
				cskType: "toggle",
			},
			{
				name: "bluetooth",
				icon: "bluetooth-32px",
				iconInactived: "bluetooth-off-32px",
				title: "bluetooth",
				removed: true,
				observerSetting: "bluetooth.enabled",
				order: { portrait: 6, landscape: 5 },
				cskType: "toggle",
			},
		];
		__self.brightnessMap = { 100: 0.1, 10: 0.4, 40: 0.7, 70: 1 };
		__self.orderType = n13.isLandscape ? "landscape" : "portrait";
	}

	start() {
		var e = this,
			t = this.orderType;
		(this.settings = this.oriSettings
			.filter(function (e) {
				return -1 !== e.order[t];
			})
			.sort(function (e, n) {
				return e.order[t] - n.order[t];
			})),
			this.settings.forEach(function (t) {
				t.observerSetting && !t.removed && e.initSettingObserver(t);
			}),
			this.initSettingObserverForBrightness(),
			SettingsCore.addObserver("airplaneMode.status", this),
			navigator.hasFeature &&
				navigator.hasFeature("device.capability.torch").then(function (t) {
					if (t) {
						(e.getSetting("flashlight").removed = false),
							n109_FlashlightHelper.on("ready", e.updateFlashlightState.bind(e)),
							n109_FlashlightHelper.on("change", e.updateFlashlightState.bind(e));
					}
				}),
			navigator.hasFeature &&
				navigator.hasFeature("device.capability.bt").then(function (t) {
					if (t) {
						navigator.mozBluetooth.defaultAdapter ||
							(navigator.mozBluetooth.onattributechanged = function (e) {
								e.attrs.includes("defaultAdapter") && (navigator.mozBluetooth.onattributechanged = null);
							});
						var n = e.getSetting("bluetooth");
						(n.removed = false), e.initSettingObserver(n);
					}
				}),
			navigator.hasFeature &&
				navigator.hasFeature("device.capability.wifi").then(function (t) {
					if (t) {
						var n = e.getSetting("wifi");
						(n.removed = false), e.initSettingObserver(n);
					}
				}),
			this.emit("change");
	}
	initSettingObserver(e) {
		var t = this;
		SettingsCore.addObserver(e.observerSetting, this),
			(this["_observe_" + e.observerSetting] = function (n) {
				var i = t.getSetting(e.name);
				(i.isActive = n), true === n ? (i.subtitle = "on") : false === n ? (i.subtitle = "off") : (i.subtitle = n.toString()), t.emit("change");
			});
	}
	initSettingObserverForBrightness() {
		var e = this;
		SettingsCore.addObserver("screen.brightness", this),
			(this["_observe_screen.brightness"] = function (t) {
				(e.getSetting("brightness").subtitleArgs = { number: 100 * t }), e.emit("change");
			});
	}
	"_observe_airplaneMode.status"(e) {
		var t = "enabling" === e || "disabling" === e;
		(this.getSetting("airplane-mode").isDisabled = t), this.emit("change");
	}
	updateFlashlightState() {
		dump("cck updateFlashlightState entry");
		var e = this.getSetting("flashlight"),
			t = n109_FlashlightHelper.flashlightManager.flashlightEnabled;
		dump("cck updateFlashlightState _flashlightEnabled=" + t), (e.isActive = t), (e.subtitle = t ? "on" : "off"), this.emit("change");
	}
	checkSimCardState() {
		var e = n104.noSIMCardOnDevice() || n104.noSIMCardConnectedToNetwork(),
			t =
				-1 !==
				n104
					.getSlots()
					.map(function (e) {
						return e.conn.voice.state;
					})
					.indexOf("searching"),
			n = this.getSetting("network"),
			i = this.getSetting("airplane-mode");
		(n.isDisabled = i.isActive || e), !t && e && n.isActive && this.toggleSetting(n), this.emit("change");
	}
	addSimCardObserver() {
		var e = this;
		if (!this.isSimCardObserverAdded) {
			(this.isSimCardObserverAdded = true), this.checkSimCardState();
			var t = window.navigator.mozMobileConnections;
			t &&
				Array.from(t).forEach(function (t) {
					t.addEventListener("voicechange", e);
				}, this);
		}
	}
	removeSimCardObserver() {
		var e = this;
		this.isSimCardObserverAdded = false;
		var t = window.navigator.mozMobileConnections;
		t &&
			Array.from(t).forEach(function (t) {
				t.removeEventListener("voicechange", e);
			}, this);
	}
	_handle_voicechange() {
		this.checkSimCardState();
	}
	getIndex(e) {
		var t = this.settings.findIndex(function (t) {
			return t.name === e;
		});
		return t;
	}
	getSetting(e) {
		var t = this.settings.find(function (t) {
			return t.name === e;
		});
		return t;
	}
	toggleSetting(e) {
		var t = this;
		(e.isDisabled = true), this.emit("change");
		var n = function () {
			(e.isDisabled = false), t.emit("change");
		};
		SettingsCore.get(e.observerSetting).then(function (t) {
			var i = {};
			(i[e.observerSetting] = !t),
				SettingsCore.set(i).then(function () {
					switch (e.name) {
						case "airplane-mode":
							break;
						case "bluetooth":
							n13.toggleBletooth(t ? "disable" : "enable").then(
								function () {
									return n();
								},
								function (e) {
									n();
								}
							);
							break;
						default:
							n();
					}
				});
		});
	}
	toggleBrightness() {
		var e = this.getSetting("brightness").subtitleArgs.number;
		SettingsCore.set({ "screen.brightness": this.brightnessMap[e] || 0.1 });
	}
	enterVolumeManagerMode() {
		var e = this;
		this.volumeManagerTimer && this.exitVolumeManagerMode(),
			(this.volumeManagerTimer = setTimeout(function () {
				e.exitVolumeManagerMode();
			}, 2e3));
	}
	exitVolumeManagerMode() {
		window.clearTimeout(this.volumeManagerTimer), (this.volumeManagerTimer = null);
	}
	click(e, t) {
		var n = this.getSetting(e);
		if (n && !n.isDisabled)
			if ("toggle" === n.cskType && n.observerSetting) this.toggleSetting(n);
			else if (n.click) return n.click(t), n.cskType;
	}
}

const n209_InstantSettingsStore = new InstantSettingsStore();
n209_InstantSettingsStore.start();

export default n209_InstantSettingsStore;
