// seems to be taken from here: https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/apps/system/js/service.js
// not sure if it's the same, will test later
// will name this object "Service"

var n5_Service = {
	_providers: new Map(),
	_services: new Map(),
	_requestsByService: new Map(),
	_requestsByProvider: new Map(),
	request: function (e) {
		var t = e.split(":"),
			n = Array.prototype.slice.call(arguments, 1),
			r = this;
		if ((this.debug(t), t.length > 1)) {
			var o = t[0],
				i = t[1];
			return this._providers.get(o)
				? (this.debug("service: " + i + " is online, perform the request with " + n.concat()), Promise.resolve(this._providers.get(o)[i].apply(r._providers.get(o), n)))
				: new Promise(function (t, a) {
						r.debug("service: " + e + " is offline, queue the task."),
							r._requestsByProvider.has(o) || r._requestsByProvider.set(o, []),
							r._requestsByProvider.get(o).push({ service: i, resolve: t, args: n });
				  });
		}
		if (this._services.has(e)) {
			var a = this._services.get(e);
			return this.debug("service [" + e + "] provider [" + a.name + "] is online, perform the task."), Promise.resolve(a[e].apply(a, n));
		}
		return (
			this.debug("service: " + e + " is offline, queue the task."),
			new Promise(function (t, o) {
				r.debug("storing the requests..."), r._requestsByService.has(e) || r._requestsByService.set(e, []), r._requestsByService.get(e).push({ service: e, resolve: t, args: n });
			})
		);
	},
	register: function (e, t) {
		var n = this;
		return (
			this._providers.has(t.name) || this._providers.set(t.name, t),
			this.debug((t.name || "(Anonymous)") + " is registering service: [" + e + "]"),
			this.debug("checking awaiting requests by server.."),
			this._requestsByProvider.has(t.name) &&
				(this._requestsByProvider.get(t.name).forEach(function (e) {
					n.debug("resolving..", t, t.name, e.service, e.args);
					var r = "function" == typeof t[e.service] ? t[e.service].apply(t, e.args) : t[e.service];
					e.resolve(r);
				}),
				this._requestsByProvider.delete(t.name)),
			this._services.has(e)
				? void this.debug("the service [" + e + "] has already been registered by other server:", this._services.get(e).name)
				: (this._services.set(e, t),
				  this.debug("checking awaiting requests by service.."),
				  void (
						this._requestsByService.has(e) &&
						(this._requestsByService.get(e).forEach(function (e) {
							n.debug("resolving..", t, e.service);
							var r = t[e.service].apply(t, e.args);
							e.resolve(r);
						}),
						this._requestsByService.delete(e))
				  ))
		);
	},
	unregister: function (e, t) {
		this._providers.delete(t.name);
		var n = this._services.get(e);
		n && t === n && this._services.delete(e);
	},
	_states: new Map(),
	_statesByState: new Map(),
	registerState: function (e, t) {
		this._states.set(t.name, t), !t.name, this._statesByState.set(e, t);
	},
	unregisterState: function (e, t) {
		this._states.delete(t.name), this._statesByState.get(e) === t && this._statesByState.delete(e);
	},
	query: function (e) {
		this.debug(e);
		var t,
			n,
			r = e.split(".");
		if ((r.length > 1 ? ((n = this._states.get(r[0])), (t = r[1])) : ((t = r[0]), (n = this._statesByState.get(t))), !n))
			return void this.debug("Provider not ready, return undefined state.");
		if ("function" == typeof n[t]) {
			var o = Array.prototype.slice.call(arguments, 1);
			return n[t].apply(n, o);
		}
		return n[t];
	},
	_start: new Date().getTime() / 1e3,
	currentTime: function () {
		return (new Date().getTime() / 1e3 - this._start).toFixed(3);
	},
	debug: function () {},
};

export default n5_Service;
