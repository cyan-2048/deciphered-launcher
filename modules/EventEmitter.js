// probably an EventEmitter implementation

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
 * @class EventEmitter
 * @description seems to be taken from EventDispatcher
 * @link https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/shared/js/event_dispatcher.js
 */
class EventEmitter {
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

export default EventEmitter;
