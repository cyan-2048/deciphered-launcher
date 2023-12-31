/**
 * SimSettingsHelper is a helper to provide semantic ways set / get
 * mozSettings. It is used by SimCardManager.
 *
 * Seems to be taken from
 * @link  https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/shared/js/sim_settings_helper.js
 */
const SimSettingsHelper = {
	EMPTY_OPTION_TEXT: "--",
	EMPTY_OPTION_VALUE: -2,
	ALWAYS_ASK_OPTION_VALUE: -1,
	_callbacks: {
		outgoingCall: [],
		outgoingMessages: [],
		outgoingData: [],
	},

	observe(serviceName, callback) {
		var serviceCallbacks = this._callbacks[serviceName];
		if (serviceCallbacks) {
			serviceCallbacks.push(callback);
		}
	},

	unobserve(serviceName, callback) {
		var serviceCallbacks = this._callbacks[serviceName];
		if (serviceCallbacks) {
			var index = serviceCallbacks.indexOf(callback);
			if (index > -1) {
				serviceCallbacks.splice(index, 1);
			}
		}
	},

	getCardIndexFrom(serviceName, callback) {
		// _get(), _onWhichCard() and _getFromSettingsDB() are internal methods
		// and should be used together, so I wrap them inside this method
		// and expose them outside the world to make sure developers
		// will not call them separately.
		this._get(serviceName)._onWhichCard(callback);
	},

	_get(serviceName) {
		this.settingKeys = [];
		switch (serviceName) {
			case "outgoingCall":
				this.settingKeys.push("ril.telephony.defaultServiceId");
				break;
			case "outgoingMessages":
				this.settingKeys.push("ril.sms.defaultServiceId");
				break;
			case "outgoingData":
				this.settingKeys.push("ril.data.defaultServiceId");
				break;
		}
		return this;
	},

	_onWhichCard(callback) {
		this.settingKeys.forEach(
			function (key) {
				this._getFromSettingsDB(key, callback);
			}.bind(this)
		);
	},

	_getFromSettingsDB(key, callback) {
		var settings = window.navigator.mozSettings;
		var getReq = settings.createLock().get(key);
		var done = function done() {
			if (callback) {
				// if there is no card set on the service,
				// we will just use the first card
				var previousCardIndex = getReq.result[key] || 0;
				callback(previousCardIndex);
			}
		};
		getReq.onsuccess = done;
		getReq.onerror = done;
	},

	setServiceOnCard(serviceName, cardIndex) {
		// _set(), _on() and _setToSettingsDB() are internal methods
		// and should be used together, so I wrap them inside this
		// method and expose them outside the world to make sure
		// developers will not call them separately.
		this._set(serviceName)._on(+cardIndex);
	},

	_set(serviceName) {
		// cleanup old keys first
		this.settingKeys = [];

		switch (serviceName) {
			case "outgoingCall":
				this.settingKeys.push("ril.telephony.defaultServiceId");
				this.settingKeys.push("ril.voicemail.defaultServiceId");
				break;

			case "outgoingMessages":
				this.settingKeys.push("ril.sms.defaultServiceId");
				break;

			case "outgoingData":
				this.settingKeys.push("ril.mms.defaultServiceId");
				this.settingKeys.push("ril.data.defaultServiceId");
				break;
		}

		return this;
	},

	_on(cardIndex) {
		this.settingKeys.forEach(
			function (key) {
				this._setToSettingsDB(key, cardIndex);
			}.bind(this)
		);
	},

	_setToSettingsDB(key, newValue, callback) {
		var done = function done() {
			if (callback) {
				callback();
			}
		};

		var settings = window.navigator.mozSettings;
		var getReq = settings.createLock().get(key);

		getReq.onsuccess = function () {
			var oldValue = getReq.result[key];

			if (oldValue !== newValue) {
				var setObject = {};
				setObject[key] = newValue;
				var setReq = settings.createLock().set(setObject);

				setReq.onsuccess = done;
				setReq.onerror = done;
			} else {
				done();
			}
		};
		getReq.onerror = done;
	},

	_addSettingsObservers: function () {
		var self = this;

		navigator.mozSettings.addObserver("ril.telephony.defaultServiceId", function (event) {
			self._callbacks.outgoingCall.forEach(function (cb) {
				cb(event.settingValue);
			});
		});
		navigator.mozSettings.addObserver("ril.sms.defaultServiceId", function (event) {
			self._callbacks.outgoingMessages.forEach(function (cb) {
				cb(event.settingValue);
			});
		});
		navigator.mozSettings.addObserver("ril.data.defaultServiceId", function (event) {
			self._callbacks.outgoingData.forEach(function (cb) {
				cb(event.settingValue);
			});
		});
	},
};

// add obsersvers
SimSettingsHelper._addSettingsObservers();

export default SimSettingsHelper;
