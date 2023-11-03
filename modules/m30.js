// probably an EventEmitter implementation

function throwEmptyStringError(e) {
	if (!e || "string" != typeof e) throw new Error("Event name should be a valid non-empty string!");
}
function throwHandlerError(e) {
	if ("function" != typeof e) throw new Error("Handler should be a function!");
}

class EventEmitter {
	on(e, t) {
		throwEmptyStringError(e), throwHandlerError(t), this.listeners || (this.listeners = new Map());
		var n = this.listeners.get(e);
		n || ((n = new Set()), this.listeners.set(e, n)), n.add(t);
	}
	off(e, t) {
		throwEmptyStringError(e), throwHandlerError(t);
		var n = this.listeners.get(e);
		n && (n.delete(t), n.size || this.listeners.delete(e));
	}
	offAll(e) {
		if ("undefined" == typeof e) return void this.listeners.clear();
		throwEmptyStringError(e);
		var t = this.listeners.get(e);
		t && (t.clear(), this.listeners.delete(e));
	}
	emit(e) {
		for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
		throwEmptyStringError(e), this.listeners || (this.listeners = new Map());
		var i = this.listeners.get(e);
		i &&
			i.forEach(function (e) {
				try {
					e.apply(null, n);
				} catch (t) {}
			});
	}
}

export default EventEmitter;
