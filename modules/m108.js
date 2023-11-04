import StoreBase from "./StoreBase";

class c extends StoreBase {
	start() {
		this.emit("user-has-selected");
	}
}

const n108 = new c();

export default n108;
