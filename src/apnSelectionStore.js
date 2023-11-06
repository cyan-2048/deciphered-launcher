import StoreBase from "./StoreBase";

class APNSelected extends StoreBase {
	start() {
		this.emit("user-has-selected");
	}
}

const apnSelectionStore = new APNSelected();

export default apnSelectionStore;
