import StoreBase from "./StoreBase";

class FlashlightHelper extends StoreBase {
	constructor(e) {
		dump("cck flashlight constructor");
		super(e);

		const __self = this;

		__self.name = "FlashlightHelper";
		__self.init = function (e) {
			dump("cck flashlight init");
			e.addEventListener("flashlightchange", __self);
			__self.flashlightManager = e;
			__self.emit("ready", e.flashlightEnabled);
		};
		navigator.getFlashlightManager &&
			navigator.hasFeature &&
			navigator.hasFeature("device.capability.torch").then(function (e) {
				__self.capability = e;
				navigator.getFlashlightManager().then(__self.init);
			});
	}

	_handle_flashlightchange() {
		dump("cck _handle_flashlightchange flashlightEnabled=" + this.flashlightManager.flashlightEnabled), this.emit("change", this.flashlightManager.flashlightEnabled);
	}
	toggle() {
		dump("cck FlashlightHelper toggle flashlightEnabled=" + this.flashlightManager.flashlightEnabled),
			(this.flashlightManager.flashlightEnabled = !this.flashlightManager.flashlightEnabled);
	}
}

const flashlightHelper = new FlashlightHelper();

export default flashlightHelper;
