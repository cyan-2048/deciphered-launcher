const EVENT_TYPES = { APP_POSITION: "app_position" },
	o = "eventlogger_event";

class EventLogger {
	dataStore = null;

	log(e) {
		if (e && e.type)
			switch (e.type) {
				case EVENT_TYPES.APP_POSITION:
					this.write({
						event_type: EVENT_TYPES.APP_POSITION,
						starting_position: e.starting_position,
						end_position: e.end_position,
						app_id: e.app_id,
						app_version: e.app_version,
					});
			}
	}
	write(e) {
		return this.getStore().then(function (t) {
			return t.add(e);
		});
	}
	getStore() {
		var e = this;
		return this.dataStore
			? Promise.resolve(this.dataStore)
			: new Promise(function (t, n) {
					return navigator.getDataStores
						? void navigator.getDataStores(o).then(function (i) {
								return i.length < 1 ? void n("EventLogger: Cannot get access to the DataStore:", o) : ((e.dataStore = i[0]), void t(e.dataStore));
						  }, n)
						: void n("EventLogger: DataStore API is not available.");
			  });
	}
}

const eventLogger = new EventLogger();

export { EVENT_TYPES, eventLogger };
