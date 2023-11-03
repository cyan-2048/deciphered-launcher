var n19 = {
	start: function () {
		this.settings = window.navigator.mozSettings;
	},
	_lock: null,
	_observers: [],
	debug: function () {
		!this.DEBUG;
	},
	getSettingsLock: function () {
		return this._lock && !this._lock.closed ? this._lock : (this._lock = this.settings.createLock());
	},
	get: function (e) {
		var t = this;
		return new Promise(function (n, r) {
			t.debug("reading " + e + " from settings db.");
			var o = t.getSettingsLock().get(e);
			o.addEventListener("success", function () {
				t.debug("...value is " + o.result[e]), n(o.result[e]);
			}),
				o.addEventListener("error", function () {
					r();
				});
		});
	},
	set: function (e) {
		var t = this;
		return new Promise(function (n, r) {
			t.debug("writing " + JSON.stringify(e) + " to settings db.");
			var o = t.getSettingsLock(),
				i = o.set(e);
			i.addEventListener("success", function () {
				n();
			}),
				i.addEventListener("error", function () {
					r();
				});
		});
	},
	addObserver: function (e, t) {
		if ((this.debug("adding observer for " + t + " on " + e), t)) {
			if (!this.settings)
				return void window.setTimeout(function () {
					"observe" in t ? t.observe.call(t, e, null) : "function" == typeof t && t(null);
				});
			var n = this,
				r = this.getSettingsLock().get(e);
			r.addEventListener("success", function () {
				n.debug("get settings " + e + " as " + r.result[e]),
					n.debug("now performing the observer in " + t.name),
					"observe" in t ? t.observe.call(t, e, r.result[e]) : "function" == typeof t && t(r.result[e]);
			});
			var o = function (e) {
				n.debug("observing settings " + e.settingName + " changed to " + e.settingValue),
					n.debug("now performing the observer in " + t.name),
					"observe" in t ? t.observe.call(t, e.settingName, e.settingValue) : "function" == typeof t && t(e.settingValue);
			};
			this.settings.addObserver(e, o), this._observers.push({ name: e, context: t, observer: o });
		} else this.warn("irregular observer " + t.name + ", stop oberseving");
	},
	removeObserver: function (e, t) {
		var n = this.settings,
			r = this;
		this._observers.forEach(function (o, i) {
			o.name === e && o.context === t && (n.removeObserver(e, o.observer), r._observers.splice(i, 1));
		});
	},
};

n19.start();
export default n19;
