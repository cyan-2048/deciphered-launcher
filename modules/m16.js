import EventEmitter from "./m30";

// originally named c
class SoftKeyStore extends EventEmitter {
	constructor(...args) {
		super(...args); // the EventEmitter constructor literally has no arguments???
		this.name = "SoftKeyStore";
	}

	start() {
		(this.currentKeys = {}), (this.registeredDOMMap = new Map());
	}
	register(e, t) {
		var n = this.registeredDOMMap.get(t),
			r = this;
		n
			? n.updateKeys(e)
			: ((n = {
					start: function () {
						t.addEventListener("focus", this, true), this.updateKeys(e);
					},
					stop: function () {
						t.removeEventListener("focus", this, true);
					},
					handleEvent: function () {
						this.check();
					},
					check: function () {
						if (document.activeElement === t || t.contains(document.activeElement)) {
							var e = r.recount();
							r.store(e);
						}
					},
					updateKeys: function (e) {
						(this.keys = e), this.check();
					},
			  }),
			  this.registeredDOMMap.set(t, n),
			  n.start());
	}
	generateKeysInfo(e) {
		var t = [];
		for (var n in e) {
			var r = {};
			switch (n) {
				case "left":
					r.code = "SoftLeft";
					break;
				case "center":
					r.code = "Enter";
					break;
				case "right":
					r.code = "SoftRight";
			}
			(r.options = { name: e[n] }), t.push(r);
		}
		return t;
	}
	registerSoftkeys(e) {
		var t = this.generateKeysInfo(e);
		t.length && navigator.softkeyManager && navigator.softkeyManager.registerKeys(t);
	}
	store(e) {
		(this.currentKeys = e), this.registerSoftkeys(e), this.emit("change");
	}
	recount() {
		for (var e = {}, t = document.activeElement; t !== document.body; ) {
			var n = this.registeredDOMMap.get(t);
			if (n) {
				var r = n.keys;
				for (var o in r) o in e || (e[o] = r[o]);
			}
			t = t.parentNode;
		}
		return e;
	}
	unregister(e) {
		var t = this.registeredDOMMap.get(e);
		t && (t.stop(), this.registeredDOMMap.delete(e), this.store(this.recount()));
	}
}

var n16_SoftKeyStore = new SoftKeyStore();
n16_SoftKeyStore.start();

export default n16_SoftKeyStore;
