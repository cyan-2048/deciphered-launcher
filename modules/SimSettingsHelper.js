/**
 * Seems to be taken from
 * @link  https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/shared/js/sim_settings_helper.js
 */
var SimSettingsHelper = {
	EMPTY_OPTION_TEXT: "--",
	EMPTY_OPTION_VALUE: -2,
	ALWAYS_ASK_OPTION_VALUE: -1,
	_callbacks: {
		outgoingCall: [],
		outgoingMessages: [],
		outgoingData: [],
	},

	observe: function (serviceName, callback) {
		var serviceCallbacks = this._callbacks[serviceName];
		if (serviceCallbacks) {
			serviceCallbacks.push(callback);
		}
	},

	unobserve: function (serviceName, callback) {
		var serviceCallbacks = this._callbacks[serviceName];
		if (serviceCallbacks) {
			var index = serviceCallbacks.indexOf(callback);
			if (index > -1) {
				serviceCallbacks.splice(index, 1);
			}
		}
	},

	getCardIndexFrom: function (serviceName, callback) {
		// _get(), _onWhichCard() and _getFromSettingsDB() are internal methods
		// and should be used together, so I wrap them inside this method
		// and expose them outside the world to make sure developers
		// will not call them separately.
		this._get(serviceName)._onWhichCard(callback);
	},
	_get: function (e) {
		switch (((this.settingKeys = []), e)) {
			case "outgoingCall":
				this.settingKeys.push("ril.telephony.defaultServiceId");
				break;
			case "outgoingMessages":
				this.settingKeys.push("ril.sms.defaultServiceId");
				break;
			case "outgoingData":
				this.settingKeys.push("ril.data.defaultServiceId");
		}
		return this;
	},
	_onWhichCard: function (e) {
		this.settingKeys.forEach(
			function (t) {
				this._getFromSettingsDB(t, e);
			}.bind(this)
		);
	},
	_getFromSettingsDB: function (e, t) {
		var n = window.navigator.mozSettings,
			r = n.createLock().get(e),
			o = function () {
				if (t) {
					t((r.result && r.result[e]) || 0);
				}
			};
		r.onsuccess = o;
		r.onerror = o;
	},
	setServiceOnCard: function (e, t) {
		this._set(e)._on(+t);
	},
	_set: function (e) {
		switch (((this.settingKeys = []), e)) {
			case "outgoingCall":
				this.settingKeys.push("ril.telephony.defaultServiceId"), this.settingKeys.push("ril.voicemail.defaultServiceId");
				break;
			case "outgoingMessages":
				this.settingKeys.push("ril.sms.defaultServiceId");
				break;
			case "outgoingData":
				this.settingKeys.push("ril.mms.defaultServiceId"), this.settingKeys.push("ril.data.defaultServiceId");
		}
		return this;
	},
	_on: function (e) {
		this.settingKeys.forEach(
			function (t) {
				this._setToSettingsDB(t, e);
			}.bind(this)
		);
	},
	_setToSettingsDB: function (e, t, n) {
		var r = function () {
				n && n();
			},
			o = window.navigator.mozSettings,
			i = o.createLock().get(e);
		i.onsuccess = function () {
			if (i.result[e] !== t) {
				var n = {};
				n[e] = t;
				var a = o.createLock().set(n);
				(a.onsuccess = r), (a.onerror = r);
			} else r();
		};
		i.onerror = r;
	},
	_addSettingsObservers: function () {
		var e = this;
		navigator.mozSettings.addObserver("ril.telephony.defaultServiceId", function (t) {
			e._callbacks.outgoingCall.forEach(function (e) {
				e(t.settingValue);
			});
		});
		navigator.mozSettings.addObserver("ril.sms.defaultServiceId", function (t) {
			e._callbacks.outgoingMessages.forEach(function (e) {
				e(t.settingValue);
			});
		});
		navigator.mozSettings.addObserver("ril.data.defaultServiceId", function (t) {
			e._callbacks.outgoingData.forEach(function (e) {
				e(t.settingValue);
			});
		});
	},
};
SimSettingsHelper._addSettingsObservers();

export default SimSettingsHelper;
