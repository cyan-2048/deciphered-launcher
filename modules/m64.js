import EventEmitter from "./m30";
import n5_Service from "./m5";
import * as n13 from "./m13";
import n19 from "./m19";
import n104 from "./m104";
import n65_SimCardHelper from "./m65";

function o(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	}
	return Array.from(e);
}

var u = (function () {
		function e(e, t) {
			var n = [],
				r = !0,
				o = !1,
				i = void 0;
			try {
				for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
			} catch (u) {
				(o = !0), (i = u);
			} finally {
				try {
					!r && s.return && s.return();
				} finally {
					if (o) throw i;
				}
			}
			return n;
		}
		return function (t, n) {
			if (Array.isArray(t)) return t;
			if (Symbol.iterator in Object(t)) return e(t, n);
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		};
	})(),
	C = "*#33#",
	E = "*#43#";

class k extends EventEmitter {
	constructor(e) {
		super(e);

		// nested functions bruh, had to check everything again just because of this piece of shit
		var _self = this;

		_self.subsidyUnlockPattern = /^\*#865625\*(\d{8}(?:\d{7,12})?)\*([1-5])#$/;
		_self.onUssdReceived = function (e) {
			var t = _self.handleUssd;
			document.hasFocus()
				? t(e)
				: document.addEventListener("focus", function n() {
						t(e);
						document.removeEventListener("focus", n);
				  });
		};
		_self.handleUssd = function (e) {
			if (e.session) {
				_self._session = e.session;
				var t = function () {
					n5_Service.request("hideDialog");
					_self.mmiloading = !1;
					_self._session.cancel();
					_self._session = null;
				};
				n5_Service.request("showDialog", {
					type: "prompt",
					header: n13.toL10n("confirmation"),
					content: e.message.replace(/\\r\\n|\\r|\\n/g, "\n"),
					translated: !0,
					noClose: !1,
					onOk: function (e) {
						e ? ((_self.mmiloading = !0), _self.emit("mmiloading"), _self._session.send(e)) : t();
					},
					onCancel: t,
					onBack: t,
				});
			} else {
				_self.emit("ussd-received", e);
				_self.mmiloading = !1;
			}
		};
		_self.errorCases = {
			BadNumber: { header: "invalidNumberToDialTitle", content: "invalidNumberToDialMessage" },
			NoNetwork: { header: "emergencyDialogTitle", content: "emergencyDialogBodyBadNumber" },
			EmergencyCallOnly: { header: "emergency-call-only", content: "emergency-call-error", containNumber: !0 },
			RadioNotAvailable: { header: "callAirplaneModeTitle", content: "callAirplaneModeMessage" },
			DeviceNotAcceptedError: { header: "emergencyDialogTitle", content: "emergencyDialogBodyDeviceNotAccepted" },
			BusyError: { header: "numberIsBusyTitle", content: "numberIsBusyMessage" },
			FDNBlockedError: { header: "fdnIsActiveTitle", content: "fdnIsActiveMessage", containNumber: !0 },
			FdnCheckFailure: { header: "fdnIsActiveTitle", content: "fdnIsActiveMessage", containNumber: !0 },
			OtherConnectionInUse: { header: "otherConnectionInUseTitle", content: "otherConnectionInUseMessage" },
		};
		_self.validExp = /^(?!,)([0-9#+*,]){1,50}$/;
		_self.extraCharExp = /(\s|-|\.|\(|\))/g;
		_self.versionType = navigator.engmodeExtension.getPropertyValue("ro.build.type");
		dump("dial_helper--versionType is " + _self.versionType);
		_self.instantDialNumbers = ["*#*#372733#*#*", "*#06#", "*#0000#", "*#*#33284#*#*", "*#*#372733#*#*"];

		if (_self.versionType && "user" !== _self.versionType) {
			_self.instantDialNumbers = _self.instantDialNumbers.concat([
				"*#1219#",
				"*#07#",
				"*#2886#",
				"*#*#0574#*#*",
				"*#*#212018#*#*",
				"*#091#",
				"*#092#",
				"*#8378266#",
				"*#573564#",
				"*#7223#",
				"###2324#",
				"*#1314#",
			]);
		}
		navigator.mozSetMessageHandler("ussd-received", _self.onUssdReceived.bind(_self));
		n19.get("debugger.remote-mode").then(function (e) {
			if (_self.versionType && "user" !== _self.versionType && "disabled" !== e) {
				_self.debuggerRemoteMode = !0;
				_self.instantDialNumbers = _self.instantDialNumbers.concat(["*#0606#", "*#8378269#", "*#*#2637643#*#*"]);
			}
		});
	}

	listImeiAndSvn(e) {
		var t = navigator.mozL10n.get("imeiAndSvn"),
			n = "";
		navigator.customization.getValue("def.software.svn").then(function (e) {
			dump("listImeiAndSvn: def.software.svn in customization state is: " + e), e && (n = e), dump("listImeiAndSvn: svnValue = " + n);
		});
		var r = [].concat(o(navigator.mozMobileConnections)).map(function (t, n) {
			return t.getDeviceIdentities().then(function (t) {
				if (t[e]) return t[e];
				var r = "Could not retrieve the " + e.toUpperCase() + " code for SIM " + n;
				return Promise.reject(new Error(r));
			});
		});
		Promise.all(r).then(
			function (e) {
				n5_Service.request("showDialog", { type: "alert", header: t, content: "IMEI:" + e.join("\n") + "SVN:" + n, translated: !0, noClose: !1 });
			},
			function (e) {
				n5_Service.request("showDialog", { type: "alert", header: t, content: "IMEI: \nSVN:" + n, translated: !0, noClose: !1 });
			}
		);
	}
	listDeviceInfos(e) {
		var t = [].concat(o(navigator.mozMobileConnections)).map(function (t, n) {
			return t.getDeviceIdentities().then(function (t) {
				if (t[e]) return t[e];
				var r = "Could not retrieve the " + e.toUpperCase() + " code for SIM " + n;
				return Promise.reject(new Error(r));
			});
		});
		Promise.all(t).then(
			function (t) {
				n5_Service.request("showDialog", { type: "alert", header: e.toUpperCase(), content: t.join("\n"), translated: !0, noClose: !1 });
			},
			function (t) {
				n5_Service.request("showDialog", { type: "alert", header: e.toUpperCase(), content: t.message, translated: !0, noClose: !1 });
			}
		);
	}
	listIMEI(e) {
		var t = [].concat(o(navigator.mozMobileConnections)).map(function (t, n) {
			return t.getDeviceIdentities().then(function (t) {
				if (t[e]) return t[e];
				var r = "Could not retrieve the " + e.toUpperCase() + " code for SIM " + n;
				return Promise.reject(new Error(r));
			});
		});
		Promise.all(t).then(
			function (e) {
				n5_Service.request("openSheet", "qrface");
			},
			function (t) {
				n5_Service.request("showDialog", { type: "alert", header: e.toUpperCase(), content: t.message, translated: !0, noClose: !1 });
			}
		);
	}
	setDebuggerMode(e) {
		e ? n19.set({ "debugger.remote-mode": "adb-devtools" }) : n19.set({ "debugger.remote-mode": "disabled" });
	}
	showSarValue() {
		n19.get("deviceinfo.sar_value").then(function (e) {
			n5_Service.request("showDialog", { type: "alert", header: "SAR Information", content: (e || "0") + " W/kg", translated: !0, noClose: !1 });
		});
	}
	showInternalVersion() {
		var e = navigator.engmodeExtension,
			t = "",
			n = "",
			r = navigator.mozL10n.get("internalVersion");
		e && ((t = e.getPropertyValue("ro.tver.boot")), (n = e.getPropertyValue("ro.tver.sys")), dump("showInternalVersion: ro.tver.boot is: " + t + "ro.tver.sys is: " + n));
		var o = "boot: " + t + "\nsystem: " + n;
		Promise.resolve().then(function () {
			n5_Service.request("showDialog", { type: "alert", header: r, content: o, translated: !0, noClose: !1 });
		});
	}
	showFIHVersion() {
		var e = navigator.engmodeExtension,
			t = "",
			n = "",
			r = "",
			o = "",
			i = "";
		e &&
			((t = e.getPropertyValue("ro.build.version.fih")),
			dump("showFIHVersion: ro.build.version.fih: " + t),
			(n = e.getPropertyValue("ro.sw.release.date")),
			dump("showFIHVersion: ro.sw.release.date:" + n),
			(r = e.getPropertyValue("ro.fih.ver_info")),
			dump("showFIHVersion: ro.fih.ver_info:" + r)),
			(o = "Variant:" + this.getVariantInfo()),
			(i = ["Nokia 8110 4G", t, n, r, "(c)Nokia", o].join("\n")),
			Promise.resolve().then(function () {
				n5_Service.request("showDialog", { type: "alert", content: i, translated: !0, noClose: !1 });
			});
	}
	getVariantInfo() {
		var e = "",
			t = navigator.engmodeExtension.getPropertyValue("ro.fih.fota_code"),
			n = "",
			r = navigator.engmodeExtension.getPrefValue("fota.commercial.ref", "na");
		dump("dial_helper:getVariantInfo variantInfo is " + r);
		var o = r.length;
		return (n = "ROW" === r.substr(o - 4, 3) ? r.substr(o - 8, 2) : r.substr(o - 2, 2)), (e = t + "/" + n);
	}
	switchUsertoRoot() {
		var e = navigator.engmodeExtension.getPropertyValue("sys.usb.config");
		dump("switchUsertoRoot--sys.usb.config--before:" + e),
			"mtp" === e
				? (navigator.engmodeExtension.setPropertyValue("persist.sys.usb.config", "mtp,adb"), Toaster.showToast({ message: "adb enabled", latency: 3e3 }))
				: "mtp,adb" === e && (navigator.engmodeExtension.setPropertyValue("persist.sys.usb.config", "mtp"), Toaster.showToast({ message: "adb disabled", latency: 3e3 }));
	}
	changeDiagMode() {
		var e,
			t = navigator.engmodeExtension.getPropertyValue("sys.usb.config");
		"diag,serial_smd,rmnet_qti_bam,adb" === t
			? (navigator.engmodeExtension.setPropertyValue("persist.sys.usb.config", "mtp,adb"),
			  Promise.resolve().then(function () {
					n5_Service.request("showDialog", { type: "alert", header: "close diag", content: " ", translated: !0, noClose: !1 });
			  }))
			: "mtp,adb" === t &&
			  (navigator.engmodeExtension.setPropertyValue("persist.sys.usb.config", "diag,serial_smd,rmnet_qti_bam,adb"),
			  (e = navigator.mozSettings.createLock().set({ "ums.enabled": !1 })),
			  (e.onsuccess = function () {
					dump("close ums success");
			  }),
			  (e.onerror = function () {
					dump("close ums error");
			  }),
			  Promise.resolve().then(function () {
					n5_Service.request("showDialog", { type: "alert", header: "open diag", content: " ", translated: !0, noClose: !1 });
			  }));
	}
	changeAutoSmsMode() {
		var e = navigator.mozSettings.createLock().get("auto.send.crash.sms");
		e.onsuccess = function () {
			e.result["auto.send.crash.sms"]
				? (dump("sb_sms launcher get auto.send.crash.sms true"), (this._autoSmsEnable = !0))
				: (dump("sb_sms launcher get auto.send.crash.sms false"), (this._autoSmsEnable = !1)),
				this._autoSmsEnable
					? (navigator.mozSettings.createLock().set({ "auto.send.crash.sms": !1 }),
					  Promise.resolve().then(function () {
							n5_Service.request("showDialog", { type: "alert", header: "autosms off", content: " ", translated: !0, noClose: !1 });
					  }))
					: (navigator.mozSettings.createLock().set({ "auto.send.crash.sms": !0 }),
					  Promise.resolve().then(function () {
							n5_Service.request("showDialog", { type: "alert", header: "autosms on", content: " ", translated: !0, noClose: !1 });
					  }));
		}.bind(this);
	}
	instantDialIfNecessary(e) {
		return this.noSIMCardOnDevice()
			? (dump("instantDialIfNecessary:No SIM card on device"),
			  this.isValidSimLockPassword(e) ? (dump("instantDialIfNecessary:ValidSimLockPassword"), !0) : this.instantDialNumbers.includes(e))
			: this.instantDialNumbers.includes(e);
	}
	noSIMCardOnDevice() {
		var e = navigator.mozIccManager;
		return !e || !e.iccIds || 0 === e.iccIds.length;
	}
	isValidSimLockPassword(e) {
		return (this.validExpForSimLock = /(^#79\+)[0-9]{8,16}(\+[1-5]#$)/), this.validExpForSimLock.test(e);
	}
	unlockSimLock(e) {
		var t = e.length,
			n = t - 7,
			r = e.substr(4, n),
			o = e.charAt(t - 2),
			i = this.getSimLockType(o);
		if ((dump("unlockSimLock:password is: " + r), dump("unlockSimLock:simLockType is: " + i), null != i)) {
			({ lockType: i }).pin = r;
		}
	}
	getSimLockType(e) {
		switch (e) {
			case "1":
				return "nck";
			case "2":
				return "nsck";
			case "3":
				return "cck";
			case "4":
				return "spck";
			case "5":
				return "pck";
			default:
				return dump("getSimLockType: error"), null;
		}
	}
	mmiHandler(e, t) {
		var n = this;
		(this.mmiloading = !0),
			this.emit("mmiloading"),
			e.then(function (e) {
				if (!e) return void n.emit("mmiloaded", "!", "GenericFailure");
				var r = n13.toL10n(e.serviceCode),
					o = e.statusMessage,
					i = e.additionalInformation;
				switch (e.serviceCode) {
					case "scCall":
						return;
					case "scUssd":
						if (!o) return;
						break;
					case "scCallForwarding":
						o ? i && (o = n.processCf(i)) : (o = "GenericFailure");
						break;
					case "scCallBarring":
					case "scCallWaiting":
						if (t === C || t === E) {
							var a = [],
								s = { smServiceEnabled: "ServiceIsEnabled", smServiceDisabled: "ServiceIsDisabled", smServiceEnabledFor: "ServiceIsEnabledFor" };
							i && "smServiceEnabledFor" === o && Array.isArray(i) && (a = i.map(n13.toL10n)), a.unshift(n13.toL10n(s[o]) || o), (o = a.join("\n"));
						}
				}
				(n.mmiloading = !1), n.emit("mmiloaded", r, o);
			});
	}
	processCf(e) {
		for (var t = n13.toL10n("call-forwarding-inactive"), n = t, r = t, o = t, i = t, a = t, s = t, u = t, l = t, c = 0; c < e.length; c++)
			if (e[c].active)
				for (var p = 1; p <= this._conn.ICC_SERVICE_CLASS_MAX; p <<= 1)
					if (0 !== (p & e[c].serviceClass))
						switch (p) {
							case this._conn.ICC_SERVICE_CLASS_VOICE:
								n = e[c].number;
								break;
							case this._conn.ICC_SERVICE_CLASS_DATA:
								r = e[c].number;
								break;
							case this._conn.ICC_SERVICE_CLASS_FAX:
								o = e[c].number;
								break;
							case this._conn.ICC_SERVICE_CLASS_SMS:
								i = e[c].number;
								break;
							case this._conn.ICC_SERVICE_CLASS_DATA_SYNC:
								a = e[c].number;
								break;
							case this._conn.ICC_SERVICE_CLASS_DATA_ASYNC:
								s = e[c].number;
								break;
							case this._conn.ICC_SERVICE_CLASS_PACKET:
								u = e[c].number;
								break;
							case this._conn.ICC_SERVICE_CLASS_PAD:
								l = e[c].number;
								break;
							default:
								return n13.toL10n("call-forwarding-error");
						}
		return [
			n13.toL10n("call-forwarding-status"),
			n13.toL10n("call-forwarding-voice", { voice: n }),
			n13.toL10n("call-forwarding-data", { data: r }),
			n13.toL10n("call-forwarding-fax", { fax: o }),
			n13.toL10n("call-forwarding-sms", { sms: i }),
			n13.toL10n("call-forwarding-sync", { sync: a }),
			n13.toL10n("call-forwarding-async", { async: s }),
			n13.toL10n("call-forwarding-packet", { packet: u }),
			n13.toL10n("call-forwarding-pad", { pad: l }),
		].join("\n");
	}
	dialForcely(e, t) {
		navigator.mozTelephony.dial(e, t);
	}
	dial(e, t, n) {
		var r = this;
		return (
			(e = String(e).replace(this.extraCharExp, "")),
			this.checkSpecialNumber(e)
				? Promise.resolve()
				: this.isValid(e)
				? new Promise(function (o, i) {
						var a = function (n) {
							var a = navigator.mozMobileConnections && navigator.mozMobileConnections[n],
								s = r,
								u = void 0,
								l = e;
							if (((e = r.getNumberAsDtmfToneGroups(l)[0]), (r._conn = a), !a || !a.voice)) return i(), void r.errorHandler({ errorName: "NoNetwork" });
							var c = navigator.mozTelephony;
							if (!c) return void i();
							n5_Service.request("Dialer:toggleStayEffect", !0);
							var p = a.imsHandler && a.imsHandler.capability,
								d = !p && a.voice.emergencyCallsOnly;
							d ? (u = c.dialEmergency(e, n)) : t ? dump("dialVT, should not hanppen") : (u = c.dial(e, n)),
								u
									.then(function (t) {
										if ((o(), t instanceof TelephonyCall)) {
											c.addEventListener("callschanged", function e() {
												c.removeEventListener("callschanged", e), n5_Service.request("Dialer:toggleStayEffect");
											});
											var i = r.getNumberAsDtmfToneGroups(l);
											i.length > 1 &&
												t.addEventListener("connected", function e() {
													t.removeEventListener("connected", e), s.playDtmfToneGroups(i, n);
												});
										} else n5_Service.request("Dialer:toggleStayEffect"), r.mmiHandler(t.result, e);
									})
									.catch(function (t) {
										n5_Service.request("Dialer:toggleStayEffect"), i(), s.errorHandler({ errorName: t, number: e, isEmergencyOnly: d });
									});
						};
						parseInt(n, 10) >= 0
							? a(n)
							: navigator.mozTelephony
									.getEccList()
									.then(function (t) {
										return t.includes(e);
									})
									.then(function (e) {
										var t = function () {
											return !n104.isSIMCardAbsent(0) && !n104.isSIMCardAbsent(1);
										};
										return e && t() && n65_SimCardHelper.isAlwaysAsk() ? 0 : n5_Service.request("chooseSim", "call");
									})
									.then(function (e) {
										return a(e);
									})
									.catch(function (e) {
										return i(e);
									}),
							navigator.mozTelephony.getEccList().then(function (t) {
								var n = !1;
								return (
									n104.isMultiSIM()
										? n104.getSlots().forEach(function (e, t) {
												if (e) {
													(!e.isAbsent() && !e.isLocked()) || (n = !0);
												}
										  })
										: (n = !0),
									!n && t.includes(e)
										? void a(0)
										: void n5_Service
												.request("chooseSim", "call")
												.then(a)
												.catch(function () {
													i();
												})
								);
							});
				  })
				: (this.errorHandler({ errorName: "BadNumber" }), Promise.reject())
		);
	}
	checkSpecialNumber(e) {
		var t = this,
			n = !0;
		switch (e) {
			case "*#1219#":
				this.versionType && "user" !== this.versionType
					? (navigator.mozSettings.createLock().set({ "customization.value.last": "clearedbysecretcode" }),
					  Toaster.showToast({ message: "flag of customization is cleared by secret code", latency: 3e3 }))
					: (n = !1);
				break;
			case "*#06#":
				this.listIMEI("imei");
				break;
			case "*#091#":
				dump("set isTa4request true"),
					this.versionType && "user" !== this.versionType
						? (navigator.engmodeExtension.setPropertyValue("TA-4-request", "true"), Toaster.showToast({ message: "auto answer on", latency: 3e3 }))
						: (n = !1);
				break;
			case "*#092#":
				dump("set isTa4request false"),
					this.versionType && "user" !== this.versionType
						? (navigator.engmodeExtension.setPropertyValue("TA-4-request", "false"), Toaster.showToast({ message: "auto answer off", latency: 3e3 }))
						: (n = !1);
				break;
			case "*#07#":
				navigator.customization.getValue("ro.sar.enabled").then(function (e) {
					dump("checkSpecialNumber: ro.sar.enabled in customization state is: " + e);
					var t = !1;
					if ((e && (t = !0), dump("checkSpecialNumber: isSarEnabled = " + t), t)) {
						var n = new MozActivity({ name: "configure", data: { target: "device", section: "about-health-safety" } });
						n.onerror = function () {};
					}
				});
				break;
			case "*#*#372733#*#*":
				new MozActivity({ name: "mmitest" }).onerror = function () {};
				break;
			case "*#2886#":
				if (this.versionType && "user" !== this.versionType) {
					new MozActivity({ name: "mmitest" }).onerror = function () {};
				} else n = !1;
				break;
			case "*#*#33284#*#*":
				var r = !1;
				n19.get("debugger.remote-mode").then(function (e) {
					"disabled" !== e && (r = !0), dump("checkSpecialNumber: debuggerMode is: " + r), t.setDebuggerMode(!r);
				});
				break;
			case "*#7223#":
				this.showInternalVersion();
				break;
			case "*#0000#":
				this.showFIHVersion();
				break;
			case "*#573564#":
				this.versionType && "user" !== this.versionType
					? navigator.customization.getValue("jrdlog.enable").then(function (e) {
							if (1 == e) {
								new MozActivity({ name: "jrdlog" }).onerror = function () {};
							}
					  })
					: (n = !1);
				break;
			case "*#8378266#":
				new MozActivity({ name: "testbox" }).onerror = function () {};
				break;
			case "###2324#":
				this.changeDiagMode();
				break;
			case "*#1314#":
				this.versionType && "user" !== this.versionType ? this.changeAutoSmsMode() : (n = !1);
				break;
			case "*#*#0574#*#*":
				if (this.versionType && "user" !== this.versionType) {
					new MozActivity({ name: "logmanager" }).onerror = function () {};
				} else n = !1;
				break;
			case "*#*#212018#*#*":
				this.switchUsertoRoot();
				break;
			default:
				if (this.noSIMCardOnDevice() && this.isValidSimLockPassword(e)) {
					dump("checkSpecialNumber: unlocking and number is " + e), this.unlockSimLock(e);
					break;
				}
				if (this.subsidyUnlockPattern.test(e)) {
					var o = e.match(this.subsidyUnlockPattern).slice(1),
						i = u(o, 2),
						a = i[0],
						s = i[1];
					this.unlockSubsidySIM(a, Number(s));
				} else if (this.debuggerRemoteMode)
					switch (e) {
						case "*#*#2637643#*#*":
						case "*#8378269#":
							var l = new MozActivity({ name: "engmode" });
							l.onerror = function () {};
							break;
						case "*#0606#":
							this.listDeviceInfos("meid");
							break;
						default:
							n = !1;
					}
				else n = !1;
		}
		return n;
	}
	unlockSubsidySIM(e, t) {
		navigator.subsidyLockManager &&
			navigator.subsidyLockManager[0].getSubsidyLockStatus().then(function (n) {
				if (!n || !n.includes(t)) return void alert(n13.toL10n("deviceIsUnlocked"));
				var r = navigator.subsidyLockManager[0].unlockSubsidyLock({ lockType: t, password: e });
				(r.onsuccess = alert(n13.toL10n("simUnlockCodeAccepted"))), (r.onerror = alert(n13.toL10n("simUnlockCodeFailed")));
			});
	}
	playDtmfToneGroups(e, t) {
		var n = this;
		e = e.slice(1);
		for (var r = e.length, o = r - 1; "" === e[o]; ) o--;
		(e = e.slice(0, ++o)), (r = e.length);
		for (var i = Promise.resolve(), a = 0, s = void 0; a < r; ) {
			for (s = 1; "" === e[a]; ) s++, a++;
			i = i.then(n.playDtmfToneGroup.bind(null, e[a++], s, t));
		}
		return i;
	}
	playDtmfToneGroup(e, t, n) {
		var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3e3;
		return navigator.mozTelephony.sendTones(e, r * t, null, n);
	}
	errorHandler() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			t = e.errorName,
			n = e.number,
			r = e.isEmergencyOnly;
		"BadNumberError" === t && (t = r ? "NoNetwork" : "RegularCall");
		var o = this.errorCases[t];
		o || (o = { content: "CallFailed" });
		var i = Object.assign({ type: "alert", translated: !1, noClose: !1 }, o);
		i.containNumber && ((i.header = n13.toL10n(i.header, { number: n })), (i.content = n13.toL10n(i.content, { number: n })), (i.translated = !0)),
			n5_Service.request("showDialog", i);
	}
	isValid(e) {
		return this.validExp.test(e);
	}
	getNumberAsDtmfToneGroups(e) {
		return e.split(",");
	}
}

var n64 = new k();

export default n64;
