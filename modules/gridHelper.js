import * as n13 from "./m13";
import EventEmitter from "./EventEmitter";

class GridHelper extends EventEmitter {
	constructor(e) {
		super(e);

		const __self = this;
		__self.name = "GridHelper";
		__self.grid = n13.isLandscape ? { row: 2, col: 4 } : { row: 3, col: 3 };
		__self.emit("change", __self.grid);
	}
}

const gridHelper = new GridHelper();

export default gridHelper;
