import n5_Service from "./m5";
import m14 from "./m14";
import * as n13 from "./m13";
import n215 from "./m215";
import n64 from "./m64";
import n41 from "./m41";
import n110 from "./m110";

class SpeedDialHelper extends m14 {
	constructor() {
		super(...arguments); // useless?? m14 doesn't even take any arguments
		this.name = "SpeedDialHelper";
	}

	speedDial(e) {
		var t = this;
		dump("launcher,speeddial:" + e), 0 == e && n41.launchBrowser();
		var n = e - 1;
		if (!(n < 0))
			return 0 === n
				? void this.dialVoicemail()
				: void navigator.customization.getValue("speed.dial.enable").then(function (i) {
						dump("speed dial enable result ====== " + i);
						var a = !0;
						i || (a = !1),
							dump("speed dial enable speedDialEnable ====== " + a),
							a &&
								(0 == n
									? navigator.customization.getValue("voice.mail.enable").then(function (n) {
											(n = void 0 === n || n),
												dump("speed_dial_helper.js voicemail get result = " + n),
												n ? t.dialOrAssignSpeedDial(e) : dump("speed_dial_helper.js voicemail disabled!!!");
									  })
									: t.dialOrAssignSpeedDial(e));
				  });
	}
	dialOrAssignSpeedDial(e) {
		var t = n215.contacts[e - 1].tel;
		t ? n64.dial(t) : this.assignSpeedDial(e);
	}
	dialVoicemail() {
		var e = this;
		n5_Service.request("chooseSim", "call").then(function () {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
				n = n215["ril.iccInfo.mbdn"],
				i = (Array.isArray(n) ? n[t] : n) || (navigator.mozVoicemail && navigator.mozVoicemail.getNumber(t));
			i ? n64.dial(i, !1, t) : e.assignSpeedDial(1);
		});
	}
	assignSpeedDial(e) {
		(e = Number(e)),
			e &&
				(1 === e
					? n5_Service.request("showDialog", { type: "alert", header: "confirmation", content: "assign-voicemail" })
					: n5_Service.request("showDialog", {
							ok: "assign",
							type: "confirm",
							header: n13.toL10n("confirmation"),
							content: n13.toL10n("assign-speed-dial", { n: e }),
							translated: !0,
							onOk: function () {
								n13.pickContact(function (t) {
									var n = t.target.result,
										i = n.id;
									if (n && i) return n.tel || n.tel[0] || n.tel[0].value ? void n215.set(e, n.tel[0].value, i) : void window.alert(n13.toL10n("alert-for-contacts-without-number"));
								});
							},
					  }));
	}
	removeSpeedDial(e) {
		var t = e.number,
			n = e.name,
			i = e.cb,
			a = function () {
				"function" == typeof i && i();
			};
		n5_Service.request("showDialog", {
			ok: "remove",
			type: "confirm",
			header: n13.toL10n("confirmation"),
			content: n13.toL10n("remove-speed-dial", { name: n }),
			translated: !0,
			onOk: function () {
				n215.remove(t);
			},
			onCancel: a,
			onBack: a,
		});
	}
	replaceSpeedDial(e) {
		var t = e.number,
			n = e.name,
			i = e.contactId,
			a = n215.contacts[t - 1].tel;
		n13.pickContact(function (e) {
			var o = e.target.result,
				r = o.id;
			if (o && r) {
				var s = o.tel[0].value,
					u = o.name[0] || s;
				i + "-" + n + "-" + a == r + "-" + u + "-" + s
					? n215.set(t, s, r)
					: n5_Service.request("showDialog", {
							ok: "replace",
							type: "confirm",
							header: n13.toL10n("confirmation"),
							content: n13.toL10n("replace-speed-dial", { name: n, subName: u }),
							translated: !0,
							onOk: function () {
								n215.set(t, s, r);
							},
					  });
			}
		});
	}
	register(e) {
		e.addEventListener("keydown", this), e.addEventListener("keyup", this);
	}
	_handle_keyup(e) {
		if (this.pressingTimer && !n5_Service.query("LaunchStore.isLaunching") && n5_Service.query("Dialer.ready")) {
			var t = n110.translate(e.key);
			switch (t) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
				case "*":
				case "#":
				case "+":
					window.clearTimeout(this.pressingTimer), (this.pressingTimer = null), n5_Service.query("App.panelAnimationRunning") || n5_Service.request("Dialer:show", t);
			}
		}
	}
	_handle_keydown(e) {
		var t = this;
		if (!n5_Service.query("LaunchStore.isLaunching") && n5_Service.query("Dialer.ready")) {
			var n = n110.translate(e.key);
			switch ((this.pressingTimer && (window.clearTimeout(this.pressingTimer), (this.pressingTimer = null)), n)) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					this.pressingTimer = window.setTimeout(function () {
						t.speedDial(parseInt(n, 10)), (t.pressingTimer = null);
					}, 1500);
					break;
				case "*":
				case "#":
				case "+":
					this.pressingTimer = window.setTimeout(function () {
						t.pressingTimer = null;
					}, 500);
			}
		}
	}
}

const n63_SpeedDialHelper = new SpeedDialHelper();

export default n63_SpeedDialHelper;
