// n3
import React from "react";
// n11
import ReactDOM from "react-dom";
// n5
import n5_Service from "./m5";

function s(e) {
	if (!e || "string" != typeof e) throw new Error("Event name should be a valid non-empty string!");
}
function u(e) {
	if ("function" != typeof e) throw new Error("Handler should be a function!");
}

class n6_RC extends React.Component {
	setHierarchy(e) {
		e && ReactDOM.findDOMNode(this).focus();
	}
	handleEvent(e) {
		if ("function" == typeof this._pre_handleEvent) {
			if (this._pre_handleEvent(e) === !1) return;
		} else this.debug("no handle event pre found. skip");
		"function" == typeof this["_handle_" + e.type] && (this.debug("handling " + e.type), this["_handle_" + e.type](e)),
			"function" == typeof this._post_handleEvent && this._post_handleEvent(e);
	}
	open() {}
	close() {}
	show() {
		ReactDOM.findDOMNode(this).classList.remove("hidden"), this.focus(), this.emit("opened");
	}
	hide() {
		ReactDOM.findDOMNode(this).classList.add("hidden"), this.emit("closed");
	}
	focus() {
		ReactDOM.findDOMNode(this).focus();
	}
	respondToHierarchyEvent(e) {
		return !this.isActive();
	}
	_changeState(e, t) {
		ReactDOM.findDOMNode(this).setAttribute(e + "-state", t.toString());
	}
	isHidden() {
		return ReactDOM.findDOMNode(this).classList.contains("hidden");
	}
	isActive() {
		return !ReactDOM.findDOMNode(this).classList.contains("hidden");
	}
	publish(e, t, n) {
		this.broadcast(e, t);
		var r = new CustomEvent(n ? e : this.EVENT_PREFIX + e, { bubbles: !0, detail: t || this });
		this.debug("publishing external event: " + e + (t ? JSON.stringify(t) : "")), ReactDOM.findDOMNode(this).dispatchEvent(r);
	}
	broadcast(e, t) {
		if (ReactDOM.findDOMNode(this)) {
			var n = new CustomEvent("_" + e, { bubbles: !1, detail: t || this });
			ReactDOM.findDOMNode(this).dispatchEvent(n);
		}
	}
	debug() {
		this.DEBUG ? this.TRACE : window.DUMP && DUMP("[" + this.name + "][" + n5_Service.currentTime() + "] " + Array.prototype.slice.call(arguments).concat());
	}
	on(e, t) {
		s(e), u(t), this.listeners || (this.listeners = new Map());
		var n = this.listeners.get(e);
		n || ((n = new Set()), this.listeners.set(e, n)), n.add(t);
	}
	off(e, t) {
		s(e), u(t);
		var n = this.listeners.get(e);
		n && (n.delete(t), n.size || this.listeners.delete(e));
	}
	offAll(e) {
		if ("undefined" == typeof e) return void this.listeners.clear();
		s(e);
		var t = this.listeners.get(e);
		t && (t.clear(), this.listeners.delete(e));
	}
	observe(e, t) {
		this._settings || (this._settings = {}), (this._settings[e] = t), "function" == typeof this["_observe_" + e] && this["_observe_" + e](t);
	}
	emit(e) {
		for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
		s(e), this.listeners || (this.listeners = new Map());
		var o = this.listeners.get(e);
		o &&
			o.forEach(function (e) {
				try {
					e.apply(null, n);
				} catch (t) {}
			});
	}
}

export default n6_RC;
