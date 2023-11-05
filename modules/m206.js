const EVENT_TYPES = { APP_POSITION: "app_position" },
	STORE_NAME = "eventlogger_event";

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
		var self = this;

		if (this.dataStore) return Promise.resolve(this.dataStore);

		return new Promise(function (resolve, reject) {
			if (navigator.getDataStores) {
				navigator.getDataStores(STORE_NAME).then(function (dataStores) {
					if (dataStores.length < 1) {
						reject("EventLogger: Cannot get access to the DataStore:", STORE_NAME);
					} else {
						self.dataStore = dataStores[0];
						resolve(self.dataStore);
					}
				}, reject);
			} else {
				reject("EventLogger: DataStore API is not available.");
			}
		});
	}
}

const eventLogger = new EventLogger();

export { EVENT_TYPES, eventLogger };
