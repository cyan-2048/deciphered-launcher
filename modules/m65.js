import SimSettingsHelper from "./SimSettingsHelper";
import StoreBase from "./StoreBase";

class SimCardHelper extends StoreBase {
	constructor(e) {
		super(e);
		this.name = "SimCardHelper";
		SimSettingsHelper.observe("outgoingCall", this._handle_outgoingCallChange.bind(this));
		SimSettingsHelper.getCardIndexFrom("outgoingCall", (e) => {
			this.cardIndex = e;
			this.emit("ready", e);
		});
	}

	isAlwaysAsk() {
		return SimSettingsHelper.ALWAYS_ASK_OPTION_VALUE === this.cardIndex;
	}

	_handle_outgoingCallChange(e) {
		this.cardIndex = e;
		this.emit("change", e);
	}
}

const n65_SimCardHelper = new SimCardHelper();

export default n65_SimCardHelper;
