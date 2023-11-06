class ApnSelector {
	_getDefaultApns(e) {
		return new Promise(function (t, n) {
			var i = navigator.mozSettings.createLock(),
				a = i.get("ril.data.default.apns");
			a.onsuccess = function () {
				t(a.result["ril.data.default.apns"][e]);
			};
		});
	}
	_cloneApn(e) {
		var t = {};
		for (var n in e) t[n] = e[n];
		return t;
	}
	_separateApnsByType(e) {
		var t = this;
		return e
			? e.reduce(function (e, n) {
					return (
						n.types.forEach(function (i) {
							var a = t._cloneApn(n);
							(a.types = [i]), e.push(a);
						}),
						e
					);
			  }, [])
			: [];
	}
	_getApnSettings() {
		return new Promise(function (e, t) {
			var n = navigator.mozSettings.createLock(),
				i = n.get("ril.data.apnSettings");
			i.onsuccess = function () {
				e(i.result["ril.data.apnSettings"]);
			};
		});
	}
	_setApnSettings(e) {
		var t = navigator.mozSettings.createLock(),
			n = {};
		(n["ril.data.apnSettings"] = e), (n["apn.selections"] = null);
		t.set(n);
	}
	_updateApnSettings(e, t) {
		var n = this;
		this._getApnSettings().then(function (i) {
			if ((dump("ApnSelector in launcher _updateApnSettings apnSettings:" + JSON.stringify(i)), i && i[e])) {
				var a = i[e],
					o = false;
				t.forEach(function (e) {
					var t = a.findIndex(function (t) {
						return t.types.some(function (t) {
							return e.types[0] === t;
						});
					});
					t === -1 ? (a.push(e), (o = true)) : JSON.stringify(a[t]) != JSON.stringify(e) && ((a[t] = e), (o = true));
				}),
					o && (dump("_updateApnSettings to set new apns:" + JSON.stringify(i)), n._setApnSettings(i));
			}
		});
	}
	apnSelect(e, t) {
		var n = this;
		this._getDefaultApns(e).then(function (i) {
			if (null != i) {
				var a = n._separateApnsByType(i);
				dump("apnSelector  in launcher apnSelect for " + e);
				var o = [],
					r = new Set();
				a.forEach(function (e) {
					var n = e.types[0];
					dump("autoSelect check apn: + " + JSON.stringify(e) + " apnType:" + n), e.apn == t && (r.has(n) || (o.push(e), r.add(n)));
				}),
					o.length > 0 && (dump("apnSelector in launcher _updateApnSettings newApns:" + JSON.stringify(o)), n._updateApnSettings(e, o));
			}
		});
	}
}

const apnSelector = new ApnSelector();
export default apnSelector;
