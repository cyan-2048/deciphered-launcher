import n5 from "./n5";

const require = () => {};

function moduleToESM(e) {
	if (e && e.__esModule) return e;
	var t = {};
	if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	return (t.default = e), t;
}
function toESM(e) {
	return e && e.__esModule ? e : { default: e };
}
function o(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function r(e, t) {
	if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
}
function s(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
		t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var u = (function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var i = t[n];
				(i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
			}
		}
		return function (t, n, i) {
			return n && e(t.prototype, n), i && e(t, i), t;
		};
	})(),
	l = require(14),
	c = toESM(l),
	f = require(215),
	d = toESM(f),
	m = require(64),
	v = toESM(m),
	g = require(41),
	y = toESM(g),
	b = require(110),
	w = toESM(b),
	k = require(13),
	_ = moduleToESM(k),
	S = (function (e) {
		function t() {
			var e, n, i, a;
			o(this, t);
			for (var s = arguments.length, u = Array(s), l = 0; l < s; l++) u[l] = arguments[l];
			return (n = i = r(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(u)))), (i.name = "SpeedDialHelper"), (a = n), r(i, a);
		}
		return (
			s(t, e),
			u(t, [
				{
					key: "speedDial",
					value: function (e) {
						var t = this;
						dump("launcher,speeddial:" + e), 0 == e && y.default.launchBrowser();
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
					},
				},
				{
					key: "dialOrAssignSpeedDial",
					value: function (e) {
						var t = d.default.contacts[e - 1].tel;
						t ? v.default.dial(t) : this.assignSpeedDial(e);
					},
				},
				{
					key: "dialVoicemail",
					value: function () {
						var e = this;
						n5.request("chooseSim", "call").then(function () {
							var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
								n = d.default["ril.iccInfo.mbdn"],
								i = (Array.isArray(n) ? n[t] : n) || (navigator.mozVoicemail && navigator.mozVoicemail.getNumber(t));
							i ? v.default.dial(i, !1, t) : e.assignSpeedDial(1);
						});
					},
				},
				{
					key: "assignSpeedDial",
					value: function (e) {
						(e = Number(e)),
							e &&
								(1 === e
									? n5.request("showDialog", { type: "alert", header: "confirmation", content: "assign-voicemail" })
									: n5.request("showDialog", {
											ok: "assign",
											type: "confirm",
											header: _.toL10n("confirmation"),
											content: _.toL10n("assign-speed-dial", { n: e }),
											translated: !0,
											onOk: function () {
												_.pickContact(function (t) {
													var n = t.target.result,
														i = n.id;
													if (n && i)
														return n.tel || n.tel[0] || n.tel[0].value
															? void d.default.set(e, n.tel[0].value, i)
															: void window.alert(_.toL10n("alert-for-contacts-without-number"));
												});
											},
									  }));
					},
				},
				{
					key: "removeSpeedDial",
					value: function (e) {
						var t = e.number,
							n = e.name,
							i = e.cb,
							a = function () {
								"function" == typeof i && i();
							};
						n5.request("showDialog", {
							ok: "remove",
							type: "confirm",
							header: _.toL10n("confirmation"),
							content: _.toL10n("remove-speed-dial", { name: n }),
							translated: !0,
							onOk: function () {
								d.default.remove(t);
							},
							onCancel: a,
							onBack: a,
						});
					},
				},
				{
					key: "replaceSpeedDial",
					value: function (e) {
						var t = e.number,
							n = e.name,
							i = e.contactId,
							a = d.default.contacts[t - 1].tel;
						_.pickContact(function (e) {
							var o = e.target.result,
								r = o.id;
							if (o && r) {
								var s = o.tel[0].value,
									u = o.name[0] || s;
								i + "-" + n + "-" + a == r + "-" + u + "-" + s
									? d.default.set(t, s, r)
									: n5.request("showDialog", {
											ok: "replace",
											type: "confirm",
											header: _.toL10n("confirmation"),
											content: _.toL10n("replace-speed-dial", { name: n, subName: u }),
											translated: !0,
											onOk: function () {
												d.default.set(t, s, r);
											},
									  });
							}
						});
					},
				},
				{
					key: "register",
					value: function (e) {
						e.addEventListener("keydown", this), e.addEventListener("keyup", this);
					},
				},
				{
					key: "_handle_keyup",
					value: function (e) {
						if (this.pressingTimer && !n5.query("LaunchStore.isLaunching") && n5.query("Dialer.ready")) {
							var t = w.default.translate(e.key);
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
									window.clearTimeout(this.pressingTimer), (this.pressingTimer = null), n5.query("App.panelAnimationRunning") || n5.request("Dialer:show", t);
							}
						}
					},
				},
				{
					key: "_handle_keydown",
					value: function (e) {
						var t = this;
						if (!n5.query("LaunchStore.isLaunching") && n5.query("Dialer.ready")) {
							var n = w.default.translate(e.key);
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
					},
				},
			]),
			t
		);
	})(c.default),
	O = new S();

export default O;
