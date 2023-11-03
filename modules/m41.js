import n14_StoreBase from "./m14";
import n19 from "./m19";
import n5 from "./m5";
import * as n13 from "./m13";
import n211 from "./m211";

var u =
		"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
			? function (e) {
					return typeof e;
			  }
			: function (e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			  },
	w = [
		"Communications",
		"Contact",
		"KaiOS Plus",
		"Messages",
		"Camera",
		"Snake",
		"YouTube",
		"Assistant",
		"Music",
		"Gallery",
		"FM Radio",
		"Browser",
		"E-Mail",
		"Clock",
		"Video",
		"Google Search",
		"Maps",
		"Twitter",
		"Calendar",
		"Settings",
		"Note",
		"Calculator",
		"Recorder",
		"Unit Converter",
		"Danger Dash",
		"Castle Of Magic",
		"Nitro Street Run 2",
	],
	k = {
		app: { 56: "./style/images/default_app_56.png", 112: "./style/images/default_app_112.png" },
		web_shortcut: { 56: "./style/images/web_shortcut_56.png", 112: "./style/images/web_shortcut_112.png" },
		favicon: { 48: "./style/images/default_favicon_48.png" },
	};

class AppStore extends n14_StoreBase {
	constructor() {
		super();

		this.apps = [];
		this.stkEnabled = !1;
		window.AppStore = this;
	}

	start() {
		var e = this,
			t = navigator.mozApps.mgmt;
		t &&
			(window.addEventListener("localized", function () {
				e.updateAllItems();
			}),
			t.addEventListener("update", function (t) {
				var n = t.application;
				e.addMozAppItem(n), e.emit("change");
			}),
			t.addEventListener("install", function (t) {
				var n = t.application;
				(n.toBeTracked = !0),
					"installed" === n.installState && (e.addMozAppItem(n), e.emit("change")),
					(n.ondownloadapplied = function (t) {
						var n = t.application;
						e.addMozAppItem(n), e.emit("change");
					}),
					(n.ondownloaderror = function () {});
			}),
			t.addEventListener("uninstall", function (t) {
				var n = t.application;
				(e.removeMozAppItem(n).toBeTracked = !0), e.emit("change"), e.removeItemFromAppsOrder(n.manifest.name);
			}),
			t.addEventListener("enabledstatechange", function () {
				(e.apps = []), e.updateAllItems();
			}),
			BookmarksDatabase.addEventListener("added", function (t) {
				var n = t.target;
				(e.addBookmarkItem(n).toBeTracked = !0), e.emit("change");
			}),
			BookmarksDatabase.addEventListener("updated", function () {
				e.updateAllItems();
			}),
			BookmarksDatabase.addEventListener("removed", function (t) {
				var n = t.target.id;
				(e.removeBookmarkItem(n).toBeTracked = !0), e.emit("change"), e.removeItemFromAppsOrder(n);
			}),
			n19.addObserver("icc.applications", this));
	}
	"_observe_icc.applications"(e) {
		(e = JSON.parse(e)), (this.stkEnabled = e && "object" === ("undefined" == typeof e ? "undefined" : u(e)) && Object.keys(e).length > 0), this.emit("change");
	}
	queryApp(e, t) {
		var n = void 0;
		return (
			this.apps.some(function (i) {
				return n13.getDeepProp(i, e) === t && ((n = i), !0);
			}),
			n
		);
	}
	getAppIconUrl(e, t, n) {
		if (((t = t || e.manifest.icons), !t)) return null;
		var i = this.pickUpAppIconInProperSize(t, n);
		return /^(http|data)/.test(i) || (i = e.origin + i), i;
	}
	pickUpAppIconInProperSize(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 56;
		return e[
			Object.keys(e).sort(function (e, n) {
				return (e - n) * (e >= t ? 1 : -1);
			})[0]
		];
	}
	getDataMcc() {
		var e = "000";
		return navigator.mozMobileConnections.length > 0 && (e = navigator.mozMobileConnections[0].data.network.mcc), e;
	}
	getSimmcc() {
		var e = "";
		if (0 === SIMSlotManager.getSlots().length) return "";
		var t = SIMSlotManager.getSlots()[0],
			n = SIMSlotManager.getSlots()[1];
		return (
			t && t.simCard && t.simCard.iccInfo
				? (dump("[app_store-getSimmcc] SIM 1 is inserted"), (e = t.simCard.iccInfo.mcc))
				: n && n.simCard && n.simCard.iccInfo && (dump("[app_store-getSimmcc] NO SIM 1, select SIM 2"), (e = n.simCard.iccInfo.mcc)),
			e
		);
	}
	getDataMccmnc() {
		var e = "00000";
		return navigator.mozMobileConnections.length > 0 && (e = navigator.mozMobileConnections[0].data.network.mcc + navigator.mozMobileConnections[0].data.network.mnc), e;
	}
	getSimmccmnc() {
		var e = "";
		if (0 === SIMSlotManager.getSlots().length) return "";
		var t = SIMSlotManager.getSlots()[0],
			n = SIMSlotManager.getSlots()[1];
		return (
			t && t.simCard && t.simCard.iccInfo
				? (e = t.simCard.iccInfo.mcc + t.simCard.iccInfo.mnc)
				: n && n.simCard && n.simCard.iccInfo && (e = n.simCard.iccInfo.mcc + n.simCard.iccInfo.mnc),
			e
		);
	}
	updateAppIcon(e) {
		var t = this;
		return new Promise(function (n, i) {
			var a = t.apps.findIndex(function (t) {
				return t.manifestURL === e.manifestURL;
			});
			a < 0 && n();
			var o = t.apps[a],
				r = t.pickUpAppIconInProperSize(o.manifest.icons);
			navigator.mozApps.mgmt
				.getIcon(e, r)
				.then(function (e) {
					(o.icon_url = URL.createObjectURL(e)), n();
				})
				.catch(function (e) {
					i(e);
				});
		});
	}
	checkImage(e, t, n) {
		var i = this,
			a = new Image();
		(a.src = e[t]),
			(a.onerror = function () {
				(e[t] = n), i.emit("change");
			});
	}
	getAppUid(e) {
		var t = e.manifestURL;
		return e.entry && (t = t + "+" + e.entry), t;
	}
	getAppsOrder() {
		var e = this;
		return new Promise(function (t) {
			n13.asyncLocalStorage.getItem("app-order").then(function (n) {
				(e.appsOrder = JSON.parse(n) || w), t();
			});
		});
	}
	setAppsOrder(e) {
		(this.appsOrder = e), n13.asyncLocalStorage.setItem("app-order", JSON.stringify(e)), this.resort(), this.emit("change");
	}
	resort() {
		var e = this,
			t = this.apps.length;
		this.apps.forEach(function (n, i) {
			var a = n.manifest.name,
				o = e.appsOrder.indexOf(a);
			n.order = -1 === o ? t + i : o;
		});
	}
	updateAllItems() {
		var e = this;
		this.getAppsOrder()
			.then(function () {
				return e.updateMozAppItems();
			})
			.then(function () {
				return e.updateBookmarkItems();
			})
			.then(function () {
				e.emit("change");
			});
	}
	addItem(e, t) {
		var n = this,
			i = e.manifest.icons;
		switch (e.type) {
			default:
			case "mozapp":
				(e.mozApp = t),
					i &&
						((e.icon_url = this.getAppIconUrl(e, i)),
						(e.icon_url_hq = this.getAppIconUrl(e, i, 112)),
						(/^http/.test(e.icon_url) || /^http/.test(e.icon_url_hq)) && (this.checkImage(e, "icon_url", k.app[56]), this.checkImage(e, "icon_url_hq", k.app[112])));
				break;
			case "bookmark":
				(e.icon_url = k.web_shortcut[56]),
					(e.icon_url_hq = k.web_shortcut[112]),
					(e.favicon_url = e.favicon),
					/^http/.test(e.favicon_url) && this.checkImage(e, "favicon_url", k.favicon[48]);
		}
		null == this.browser && "Browser" === e.manifest.name && (this.browser = e),
			(e.uid = this.getAppUid(e)),
			(e.launch = function () {
				window.performance.mark("appLaunch@" + e.origin), "bookmark" === e.type ? new MozActivity({ name: "view", data: { type: "url", url: e.url } }) : t.launch(e.entry);
			}),
			(e.shouldHide = function () {
				return (
					!e.enabled || "dialer" === e.entry || ("stk" === e.manifest.name && !n.stkEnabled) || ["system", "input", "theme", "homescreen", "invisible"].includes(e.manifest.role)
				);
			});
		var a = this.appsOrder.indexOf(e.manifest.name);
		(e.order = a !== -1 ? a : 99), (e.theme = e.manifest.theme_color || null);
		var o = void 0;
		this.apps.some(function (t, n) {
			var i = t.manifestURL === e.manifestURL;
			return i && (o = n), i;
		}),
			o >= 0 ? (this.apps[o] = e) : this.apps.push(e);
	}
	launchBrowser() {
		null != this.browser
			? this.browser.launch()
			: this.apps.some(function (e) {
					var t = "Browser" === e.manifest.name;
					return t && e.launch(), t;
			  });
	}
	addMozAppItem(e) {
		var t = e.manifest || e.updateManifest,
			n = t.entry_points;
		if (n) {
			var i = "";
			t = JSON.parse(JSON.stringify(t));
			for (var a in n) {
				var o = {},
					r = n[a];
				i = new n211(r).name;
				for (var s in r) "locale" !== s && "name" !== s && (t[s] = r[s]);
				for (var u in e) o[u] = e[u];
				(o.type = "mozapp"), (o.manifest = t), (o.displayName = i), (o.entry = a), this.addItem(o, e);
			}
		} else {
			var l = {};
			for (var c in e) l[c] = e[c];
			l.manifest || (l.manifest = l.updateManifest), (l.type = "mozapp"), (l.displayName = new n211(l.manifest).name), this.addItem(l, e);
		}
	}
	removeMozAppItem(e) {
		var t = this.getAppUid(e),
			n = this.apps.findIndex(function (e) {
				return e.uid === t;
			});
		return n >= 0 ? this.apps.splice(n, 1).shift() : null;
	}
	removeItemFromAppsOrder(e) {
		var t = this.appsOrder.indexOf(e);
		-1 !== t && (this.appsOrder.splice(t, 1), this.setAppsOrder(this.appsOrder));
	}
	updateMozAppItems() {
		var e = this;
		return new Promise(function (t, n) {
			var i = navigator.mozApps.mgmt.getAll();
			(i.onsuccess = function (n) {
				n.target.result.forEach(function (t) {
					return e.addMozAppItem(t);
				}),
					t();
			}),
				(i.onerror = function () {
					n();
				});
		});
	}
	uninstallMozApp(e) {
		n5.request("showDialog", {
			type: "confirm",
			ok: "uninstall",
			header: n13.toL10n("confirmation"),
			content: n13.toL10n("confirm-to-uninstall-app", { appName: e.manifest.name }),
			translated: !0,
			onOk: function () {
				navigator.mozApps.mgmt.uninstall(e);
			},
		});
	}
	addBookmarkItem(e) {
		if (e.url) {
			var t = this.transformBookmarkIntoApp(e);
			return this.addItem(t), t;
		}
	}
	removeBookmarkItem(e) {
		var t = this.apps.findIndex(function (t) {
			return t.url === e;
		});
		return t >= 0 ? this.apps.splice(t, 1).shift() : null;
	}
	updateBookmarkItems() {
		var e = this;
		return new Promise(function (t) {
			BookmarksDatabase.getAll().then(function (n) {
				Object.keys(n)
					.map(function (e) {
						return n[e];
					})
					.forEach(function (t) {
						return e.addBookmarkItem(t);
					}),
					t();
			});
		});
	}
	transformBookmarkIntoApp(e) {
		return {
			type: "bookmark",
			displayName: e.name,
			enabled: !0,
			removable: !0,
			manifestURL: e.url,
			url: e.url,
			favicon: e.icon,
			manifest: { name: e.url, theme_color: "#20AFCC" },
		};
	}
	unpinBookmark(e) {
		n5.request("showDialog", {
			type: "confirm",
			ok: "unpin",
			header: n13.toL10n("confirmation"),
			content: n13.toL10n("confirm-to-unpin-bookmark"),
			translated: !0,
			onOk: function () {
				BookmarksDatabase.remove(e.url);
			},
		});
	}
	renameBookmark(e) {
		var t = e.displayName.slice(0, 255);
		n5.request("showDialog", {
			type: "prompt",
			content: "rename",
			ok: "ok",
			initialValue: t,
			maxLength: 255,
			onOk: function (t) {
				e.displayName !== t &&
					BookmarksDatabase.get(e.url).then(function (e) {
						(e.name = t), BookmarksDatabase.put(e);
					});
			},
		});
	}
}

var n41 = new AppStore();
n41.start();

export default n41;
