var n103 = {
	EMPTY_OPTION_TEXT: "--",
	EMPTY_OPTION_VALUE: -2,
	ALWAYS_ASK_OPTION_VALUE: -1,
	_callbacks: { outgoingCall: [], outgoingMessages: [], outgoingData: [] },
	observe: function (e, t) {
		var n = this._callbacks[e];
		n && n.push(t);
	},
	unobserve: function (e, t) {
		var n = this._callbacks[e];
		if (n) {
			var r = n.indexOf(t);
			r > -1 && n.splice(r, 1);
		}
	},
	getCardIndexFrom: function (e, t) {
		this._get(e)._onWhichCard(t);
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
n103._addSettingsObservers();

export default n103;
