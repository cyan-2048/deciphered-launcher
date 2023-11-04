import n14_StoreBase from "./m14";
import n41 from "./m41";
import n5_Service from "./m5";

class LaunchStore extends n14_StoreBase {
	constructor(e) {
		super(e);
		const __self = this;

		__self.name = "LaunchStore";
		__self.resetLaunchingMarker = function () {
			__self.isLaunching = false;
		};
		__self.ports = {};
		window.addEventListener("visibilitychange", __self.resetLaunchingMarker);
		window.addEventListener("blur", __self.resetLaunchingMarker);
		n5_Service.registerState("isLaunching", __self);
	}

	launch(e, t, n) {
		e &&
			t &&
			("iac" === e ? this.launchForIAC(t, n) : this.launchApp(e, t),
			this.resetTimer && (clearTimeout(this.resetTimer), (this.resetTimer = null)),
			(this.resetTimer = setTimeout(this.resetLaunchingMarker, 3e3)));
	}
	launchApp(e, t) {
		if (!this.isLaunching) {
			this.isLaunching = true;
			var n = n41.queryApp(e, t);
			n && n.launch();
		}
	}
	launchForIAC(e) {
		var t = this,
			n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
		if (!this.isLaunching) {
			if (!this.ports[e])
				return void (navigator.mozApps.getSelf().onsuccess = function (i) {
					i.target.result.connect(e).then(
						function (i) {
							(t.ports[e] = i), t.launchForIAC(e, n);
						},
						function (e) {}
					);
				});
			(this.isLaunching = true),
				this.ports[e].forEach(function (e) {
					e.postMessage(n);
				});
		}
	}
}

const n42_LaunchStore = new LaunchStore();

export default n42_LaunchStore;
