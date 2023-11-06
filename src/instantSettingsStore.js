import simSlotManagerStore from "./simSlotManagerStore";
import flashlightHelper from "./flashlightHelper";
import StoreBase from "./StoreBase";
import SettingsCore from "./SettingsCore";
import launchStore from "./launchStore";
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
				click: flashlightHelper.toggle.bind(flashlightHelper),
			},
			{
				name: "camera",
				icon: "camera",
				isShortcut: true,
				title: "camera",
				order: { portrait: 7, landscape: 6 },
				cskType: "launch",
				click: function () {
					launchStore.launch("manifestURL", "app://camera.gaiamobile.org/manifest.webapp");
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
					launchStore.launch("manifestURL", "app://calculator.gaiamobile.org/manifest.webapp");
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
		var self = this,
			orderType = this.orderType;
		this.settings = this.oriSettings
			.filter(function (e) {
				return -1 !== e.order[orderType];
			})
			.sort(function (e, n) {
				return e.order[orderType] - n.order[orderType];
			});
		this.settings.forEach(function (t) {
			t.observerSetting && !t.removed && self.initSettingObserver(t);
		});
		this.initSettingObserverForBrightness();
		SettingsCore.addObserver("airplaneMode.status", this);

		if (navigator.hasFeature) {
			navigator.hasFeature("device.capability.torch").then(function (t) {
				if (t) {
					self.getSetting("flashlight").removed = false;
					flashlightHelper.on("ready", self.updateFlashlightState.bind(self));
					flashlightHelper.on("change", self.updateFlashlightState.bind(self));
				}
			});

			navigator.hasFeature("device.capability.bt").then(function (t) {
				if (t) {
					navigator.mozBluetooth.defaultAdapter ||
						(navigator.mozBluetooth.onattributechanged = function (e) {
							// what is this for?
							if (e.attrs.includes("defaultAdapter")) {
								navigator.mozBluetooth.onattributechanged = null;
							}
						});
					var n = self.getSetting("bluetooth");
					n.removed = false;
					self.initSettingObserver(n);
				}
			});

			navigator.hasFeature("device.capability.wifi").then(function (t) {
				if (t) {
					var n = self.getSetting("wifi");
					n.removed = false;
					self.initSettingObserver(n);
				}
			});
		}

		this.emit("change");
	}
	initSettingObserver(e) {
		var self = this;
		SettingsCore.addObserver(e.observerSetting, this),
			(this["_observe_" + e.observerSetting] = function (n) {
				var i = self.getSetting(e.name);
				i.isActive = n;
				if (n === true) {
					i.subtitle = "on";
				} else if (n === false) {
					i.subtitle = "off";
				} else {
					i.subtitle = n.toString();
				}
				self.emit("change");
			});
	}
	initSettingObserverForBrightness() {
		var self = this;
		SettingsCore.addObserver("screen.brightness", this),
			(this["_observe_screen.brightness"] = function (t) {
				(self.getSetting("brightness").subtitleArgs = { number: 100 * t }), self.emit("change");
			});
	}
	"_observe_airplaneMode.status"(e) {
		var t = "enabling" === e || "disabling" === e;
		(this.getSetting("airplane-mode").isDisabled = t), this.emit("change");
	}
	updateFlashlightState() {
		dump("cck updateFlashlightState entry");
		var e = this.getSetting("flashlight"),
			t = flashlightHelper.flashlightManager.flashlightEnabled;
		dump("cck updateFlashlightState _flashlightEnabled=" + t), (e.isActive = t), (e.subtitle = t ? "on" : "off"), this.emit("change");
	}
	checkSimCardState() {
		var e = simSlotManagerStore.noSIMCardOnDevice() || simSlotManagerStore.noSIMCardConnectedToNetwork(),
			t =
				-1 !==
				simSlotManagerStore
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
		var self = this;
		if (!this.isSimCardObserverAdded) {
			(this.isSimCardObserverAdded = true), this.checkSimCardState();
			var t = window.navigator.mozMobileConnections;
			t &&
				Array.from(t).forEach(function (t) {
					t.addEventListener("voicechange", self);
				}, this);
		}
	}
	removeSimCardObserver() {
		var self = this;
		this.isSimCardObserverAdded = false;
		var mobileConnections = window.navigator.mozMobileConnections;
		mobileConnections &&
			Array.from(mobileConnections).forEach(function (mobileConnection) {
				mobileConnection.removeEventListener("voicechange", self);
			}, this);
	}
	_handle_voicechange() {
		this.checkSimCardState();
	}
	getIndex(settingName) {
		var index = this.settings.findIndex(function (setting) {
			return setting.name === settingName;
		});
		return index;
	}
	getSetting(settingName) {
		var setting = this.settings.find(function (setting) {
			return setting.name === settingName;
		});
		return setting;
	}
	toggleSetting(setting) {
		var self = this;
		setting.isDisabled = true;
		this.emit("change");

		var disableSetting = function () {
			setting.isDisabled = false;
			self.emit("change");
		};

		SettingsCore.get(setting.observerSetting).then(function (boolean) {
			var settings = {};
			settings[setting.observerSetting] = !boolean;
			SettingsCore.set(settings).then(function () {
				switch (setting.name) {
					case "airplane-mode":
						break;
					case "bluetooth":
						n13.toggleBletooth(boolean ? "disable" : "enable").then(
							function () {
								return disableSetting();
							},
							function (e) {
								disableSetting();
							}
						);
						break;
					default:
						disableSetting();
				}
			});
		});
	}
	toggleBrightness() {
		var currentBrightness = this.getSetting("brightness").subtitleArgs.number;
		SettingsCore.set({ "screen.brightness": this.brightnessMap[currentBrightness] || 0.1 });
	}
	enterVolumeManagerMode() {
		var self = this;
		this.volumeManagerTimer && this.exitVolumeManagerMode();
		this.volumeManagerTimer = setTimeout(function () {
			self.exitVolumeManagerMode();
		}, 2e3);
	}
	exitVolumeManagerMode() {
		window.clearTimeout(this.volumeManagerTimer);
		this.volumeManagerTimer = null;
	}
	click(settingName, clickArg) {
		var setting = this.getSetting(settingName);
		if (setting && !setting.isDisabled)
			if ("toggle" === setting.cskType && setting.observerSetting) {
				this.toggleSetting(setting);
			} else if (setting.click) {
				setting.click(clickArg);
				return setting.cskType;
			}
	}
}

const instantSettingsStore = new InstantSettingsStore();
instantSettingsStore.start();

export default instantSettingsStore;
