import ComponentBase from "./ComponentBase";
import SettingsCore from "./SettingsCore";
import contactStore from "./contactStore";

// dunno what to call this, it's not exactly a store but it does act like it....
// I get it now, it's like a store, but for settings
// StoreBase doesn't have a working SettingsCore observer
// therefore a good name for this would probably be "SpeedDialSettings"
// because it's not a Store nor is it a React.Component

class SpeedDialSettings extends ComponentBase {
	constructor() {
		super(...arguments);

		this.SIZE = 9;
		this.contacts = [];
		this.voicemailNumber = null;
	}

	start() {
		this.fetch(),
			this.getCustomSpeedDials(),
			SettingsCore.addObserver("ril.iccInfo.mbdn", this),
			navigator.mozContacts.addEventListener("speeddialchange", this.fetch.bind(this)),
			navigator.mozContacts.addEventListener("contactchange", this.fetch.bind(this));
	}

	"_observe_ril.iccInfo.mbdn"(e) {
		(this["ril.iccInfo.mbdn"] = e),
			(e = (Array.isArray(e) ? e[0] : e) || (navigator.mozVoicemail && navigator.mozVoicemail.getNumber(0))),
			(this.voicemailNumber = e),
			(this.contacts[0].tel = e),
			this.emit("changed");
	}

	getCustomSpeedDials() {
		var e = this;
		SettingsCore.get("custom.speeddials").then(function (t) {
			t && ((e.customSpeedDials = t), e.fillCustomSpeedDials(t), e.emit("changed"));
		});
	}
	fillCustomSpeedDials() {
		var e = this;
		(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function (t) {
			var n = parseInt(t.key, 10);
			e.contacts[n - 1] = { dial: n, editable: false, tel: t.tel, name: t.name, id: "customsd" };
		});
	}
	fetch() {
		var e = this;
		this.initData(),
			this.fillCustomSpeedDials(this.customSpeedDials),
			navigator.mozContacts.getSpeedDials().then(function (t) {
				e.parse(t);
			});
	}
	set(e, t, n) {
		navigator.mozContacts.setSpeedDial(e, t, n).onerror = function (e) {};
	}
	remove(e) {
		navigator.mozContacts.removeSpeedDial(e).onerror = function (e) {};
	}
	initData() {
		(this.contacts = Array(this.SIZE)
			.fill(null)
			.map(function (e, t) {
				return { dial: t + 1, editable: true };
			})),
			Object.assign(this.contacts[0], { tel: this.voicemailNumber, editable: false, voicemail: true, name: "voicemail", id: "voicemail" });
	}
	parse(e) {
		var t = this,
			n = e.map(function (e) {
				return new Promise(function (n) {
					contactStore.findById(e.contactId, function (i) {
						if (!(i instanceof window.mozContact)) return void n();
						var a = void 0;
						i.photo && i.photo.length && (a = window.URL.createObjectURL(i.photo[0]));
						var o = parseInt(e.speedDial, 10);
						Object.assign(t.contacts[o - 1], {
							id: e.contactId,
							name: i.name && i.name[0],
							photo: a,
							dial: o,
							tel: e.tel,
						}),
							n();
					});
				});
			}, this);
		Promise.all(n).then(function () {
			t.emit("changed");
		});
	}
}

var speedDialSettings = new SpeedDialSettings();
speedDialSettings.start();

export default speedDialSettings;
