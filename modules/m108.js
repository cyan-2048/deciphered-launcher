import n14_StoreBase from "./m14";

class c extends n14_StoreBase {
	start() {
		this.emit("user-has-selected");
	}
}

const n108 = new c();

export default n108;
