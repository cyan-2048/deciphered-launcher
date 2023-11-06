import React from "react";
import ReactDOM from "react-dom";
import Service from "../Service";

function ensureValidEventName(eventName) {
	if (!eventName || typeof eventName !== "string") {
		throw new Error("Event name should be a valid non-empty string!");
	}
}

function ensureValidHandler(handler) {
	if (typeof handler !== "function") {
		throw new Error("Handler should be a function!");
	}
}

/**
 * @class ComponentBase
 * @extends React.Component
 * @description Base class for most of the React Components found in the launcher. seems to implement a modified version of EventDispatcher and Base Module Mixins found in mozilla/gaia
 * @link https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/shared/js/event_dispatcher.js
 * @link https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/apps/system/js/base_module.js
 */
class ComponentBase extends React.Component {
	setHierarchy(e) {
		e && ReactDOM.findDOMNode(this).focus();
	}

	/**
	 * @param {Event} evt
	 * @returns
	 */
	handleEvent(evt) {
		if (typeof this._pre_handleEvent == "function") {
			var shouldContinue = this._pre_handleEvent(evt);
			if (shouldContinue === false) {
				return;
			}
		} else {
			console.log("no handle event pre found. skip");
		}
		if (typeof this["_handle_" + evt.type] == "function") {
			this.debug("handling " + evt.type);
			this["_handle_" + evt.type](evt);
		}
		if (typeof this._post_handleEvent == "function") {
			this._post_handleEvent(evt);
		}
	}

	open() {}
	close() {}

	show() {
		ReactDOM.findDOMNode(this).classList.remove("hidden");
		this.focus();
		this.emit("opened");
	}

	hide() {
		ReactDOM.findDOMNode(this).classList.add("hidden");
		this.emit("closed");
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

	publish(event, detail, noPrefix) {
		this.broadcast(event, detail);

		var evt = new CustomEvent(noPrefix ? event : this.EVENT_PREFIX + event, { bubbles: true, detail: detail || this });
		this.debug("publishing external event: " + event + (detail ? JSON.stringify(detail) : ""));
		ReactDOM.findDOMNode(this).dispatchEvent(evt);
	}

	broadcast(e, t) {
		if (ReactDOM.findDOMNode(this)) {
			var n = new CustomEvent("_" + e, { bubbles: false, detail: t || this });
			ReactDOM.findDOMNode(this).dispatchEvent(n);
		}
	}

	debug() {
		this.DEBUG ? this.TRACE : window.DUMP && DUMP("[" + this.name + "][" + Service.currentTime() + "] " + Array.prototype.slice.call(arguments).concat());
	}

	/**
	 * Registers listener function to be executed once event occurs.
	 * @param {string} eventName Name of the event to listen for.
	 * @param {function} handler Handler to be executed once event occurs.
	 */
	on(eventName, handler) {
		ensureValidEventName(eventName);
		ensureValidHandler(handler);

		if (!this.listeners) {
			this.listeners = new Map();
		}

		var handlers = this.listeners.get(eventName);

		if (!handlers) {
			handlers = new Set();
			this.listeners.set(eventName, handlers);
		}

		// Set.add ignores handler if it has been already registered
		handlers.add(handler);
	}

	/**
	 * Removes registered listener for the specified event.
	 * @param {string} eventName Name of the event to remove listener for.
	 * @param {function} handler Handler to remove, so it won't be executed
	 * next time event occurs.
	 */
	off(eventName, handler) {
		ensureValidEventName(eventName);
		ensureValidHandler(handler);

		var handlers = this.listeners.get(eventName);

		if (!handlers) {
			return;
		}

		handlers.delete(handler);

		if (!handlers.size) {
			this.listeners.delete(eventName);
		}
	}

	/**
	 * Removes all registered listeners for the specified event.
	 * @param {string} eventName Name of the event to remove all listeners for.
	 */
	offAll(eventName) {
		if (typeof eventName === "undefined") {
			this.listeners.clear();
			return;
		}

		ensureValidEventName(eventName);

		var handlers = this.listeners.get(eventName);

		if (!handlers) {
			return;
		}

		handlers.clear();

		this.listeners.delete(eventName);
	}

	observe(name, value) {
		this._settings || (this._settings = {});

		this._settings[name] = value;
		if (typeof this["_observe_" + name] == "function") {
			this["_observe_" + name](value);
		}
	}

	/**
	 * Emits specified event so that all registered handlers will be called
	 * with the specified parameters.
	 * @param {string} eventName Name of the event to call handlers for.
	 * @param {...*} parameters Optional parameters that will be passed to
	 * every registered handler.
	 */
	emit(eventName, ...parameters) {
		ensureValidEventName(eventName);

		if (!this.listeners) {
			this.listeners = new Map();
		}

		/**
		 * @type {Set<function>}
		 */
		var handlers = this.listeners.get(eventName);

		handlers &&
			handlers.forEach(function (handler) {
				try {
					handler.apply(null, parameters);
				} catch (t) {}
			});
	}
}

export default ComponentBase;
