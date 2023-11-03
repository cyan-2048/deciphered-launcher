const bundleJS = {
	0: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		function s() {
			var e,
				t = navigator.mozMobileConnections,
				n = Array.from(t).map(function (e) {
					var t = navigator.mozIccManager.getIccById(e.iccId);
					if (!t) return null;
					var n = t.iccInfo;
					return { iccid: e.iccId, mccmnc: n ? n.mcc + n.mnc : null };
				}),
				i = navigator.mozSettings.createLock().get("ril.sms.StatusReport_enabled");
			(i.onsuccess = function () {
				e = i.result["ril.sms.StatusReport_enabled"];
				var t = {},
					n = window.navigator.mozSettings;
				(t["ril.sms.requestStatusReport.enabled"] = e), n.createLock().set(t);
			}),
				n && dump("launcher app newoperators = " + JSON.stringify(n));
			var a = JSON.parse(localStorage.getItem("operators"));
			a && dump("launcher app oldOperators = " + JSON.stringify(a));
			var o = function (e) {
				dump("apn_selection item = " + e),
					n &&
						n[e] &&
						"23415" === n[e].mccmnc &&
						(a && (dump("apn_selection oldOperators != null..."), a[e] && dump("apn_selection oldOperators[item] = " + JSON.stringify(a[e]))),
						n[e] && dump("apn_selection operators[item]     = " + JSON.stringify(n[e])),
						(a && JSON.stringify(a[e]) === JSON.stringify(n[e])) ||
							(e > 0 && n[e - 1] && "23415" === n[e - 1].mccmnc && (!a || (JSON.stringify(n[e - 1]) !== JSON.stringify(a[e - 1]) && JSON.stringify(n[e]) !== JSON.stringify(a[e])))
								? (dump("apn_selection waiting for open the 2nd dialog"),
								  F.default.on("user-has-selected", function () {
										dump("launcher app recv user-has-selected message..."),
											n[e] &&
												"23415" === n[e].mccmnc &&
												setTimeout(function () {
													b.default.request("APNSelection:setOperatorId", e), b.default.request("openSheet", "apnselection");
												}, 500);
								  }))
								: (b.default.request("APNSelection:setOperatorId", e), b.default.request("openSheet", "apnselection"))));
			};
			for (var r in n) o(r);
			localStorage.setItem("operators", JSON.stringify(n));
		}
		var u =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
					}
					return e;
				},
			l = (function () {
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
			c = n(3),
			f = i(c),
			d = n(11),
			p = i(d),
			h = n(6),
			m = i(h),
			v = n(73),
			g = i(v),
			y = n(5),
			b = i(y),
			w = n(72),
			k = i(w),
			_ = n(210),
			S = i(_),
			O = n(200),
			E = i(O),
			I = n(208),
			P = i(I),
			T = n(203),
			M = i(T),
			C = n(213),
			A = i(C),
			L = n(198),
			j = i(L),
			N = n(106),
			D = i(N),
			x = n(107),
			z = i(x),
			q = n(207),
			R = i(q),
			B = n(108),
			F = i(B);
		n(63),
			n(112),
			n(111),
			window.performance.mark("navigationLoaded"),
			window.addEventListener("load", function () {
				window.performance.mark("fullyLoaded"),
					document.body.classList.add("loaded"),
					setTimeout(function () {
						document.body.classList.remove("loaded");
					}, 3e3),
					s();
			});
		var K = (function (e) {
			function t(e) {
				a(this, t);
				var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (
					(n.name = "App"),
					(n.panels = {}),
					(n.state = { grid: R.default.grid }),
					(window.app = n),
					(window.Service = b.default),
					window.performance.mark("navigationInteractive"),
					n
				);
			}
			return (
				r(t, e),
				l(t, [
					{
						key: "componentWillMount",
						value: function () {
							window.performance.mark("contentInteractive");
						},
					},
					{
						key: "componentDidMount",
						value: function () {
							(this.element = p.default.findDOMNode(this)),
								window.performance.mark("visuallyLoaded"),
								this.focusWhenReady(),
								this._handle_largetextenabledchanged(),
								window.addEventListener("largetextenabledchanged", this),
								b.default.register("openSheet", this),
								b.default.register("closeSheet", this),
								b.default.registerState("lastSheet", this),
								b.default.registerState("panelAnimationRunning", this),
								this.element.style.setProperty("--grid-row", this.state.grid.row),
								this.element.style.setProperty("--grid-col", this.state.grid.col);
						},
					},
					{
						key: "_handle_largetextenabledchanged",
						value: function () {
							document.body.classList.toggle("large-text", navigator.largeTextEnabled);
						},
					},
					{
						key: "focusWhenReady",
						value: function () {
							var e = this;
							if (!this.focusMainView()) {
								var t = function t() {
									e.focusMainView(), document.removeEventListener("visibilitychange", t);
								};
								document.addEventListener("visibilitychange", t);
							}
						},
					},
					{
						key: "focusMainView",
						value: function () {
							return this.panels.mainView.focus(), !document.hidden;
						},
					},
					{
						key: "openSheet",
						value: function (e) {
							(this.lastSheet = e), this.panels[e].open(), "dialer" !== e && "qrface" !== e && this.element.classList.add("panel-" + e + "--opened");
						},
					},
					{
						key: "closeSheet",
						value: function (e) {
							(this.panels[e].isClosed && this.panels[e].isClosed()) ||
								(this.panels[e].close && this.panels[e].close(),
								this.element.classList.remove("panel-" + e + "--opened"),
								("dialer" !== e && "qrface" !== e) || this.panels.appList.isClosed()
									? (this.panels.mainView.focus(), (this.lastSheet = "MainView"))
									: (this.panels.appList.focus(), (this.lastSheet = "AppList")));
						},
					},
					{
						key: "render",
						value: function () {
							var e = this;
							return f.default.createElement(
								"div",
								{ className: "app-workspace" },
								f.default.createElement(
									"div",
									{ className: "app-content" },
									f.default.createElement(S.default, {
										ref: function (t) {
											e.panels.mainView = t;
										},
									}),
									f.default.createElement(
										E.default,
										u(
											{
												ref: function (t) {
													e.panels.appList = t;
												},
											},
											this.state.grid
										)
									),
									f.default.createElement(
										P.default,
										u({}, this.state.grid, {
											ref: function (t) {
												e.panels.instantSettings = t;
											},
										})
									),
									f.default.createElement(M.default, {
										ref: function (t) {
											e.panels.dialer = t;
										},
									}),
									f.default.createElement(A.default, {
										ref: function (t) {
											e.panels.qrface = t;
										},
									}),
									f.default.createElement(j.default, {
										ref: function (t) {
											e.panels.apnselection = t;
										},
									})
								),
								f.default.createElement(z.default, null),
								f.default.createElement(k.default, null),
								f.default.createElement(D.default, null),
								f.default.createElement(g.default, {
									ref: function (t) {
										e.panels.softKey = t;
									},
								})
							);
						},
					},
				]),
				t
			);
		})(m.default);
		p.default.render(f.default.createElement(K, null), document.getElementById("root"));
	},
	26: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
					}
					return e;
				},
			u = (function () {
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
			l = n(3),
			c = i(l),
			f = n(11),
			d = i(f),
			p = n(130),
			h = i(p),
			m = n(6),
			v = i(m),
			g = n(5),
			y = i(g),
			b = n(113),
			w = i(b);
		n(218);
		var k = function (e, t, n) {
			return (function (i) {
				function l(e) {
					a(this, l);
					var t = o(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, e));
					return (t.state = { popup: null }), t;
				}
				return (
					r(l, i),
					u(l, [
						{
							key: "componentDidMount",
							value: function () {
								var e = this;
								(this.refs.composed.open = this.refs.composing.open.bind(this.refs.composing)),
									(this.refs.composed.close = this.refs.composing.close.bind(this.refs.composing)),
									y.default.register("open", this.refs.composed),
									y.default.register("close", this.refs.composed),
									(this.refs.composed.isActive = this.refs.composing.isActive.bind(this.refs.composing)),
									this.refs.composing.on("closed", function () {
										e.refs.composed.emit("closed"), e.emit("closed");
									}),
									this.refs.composing.on("opened", function () {
										e.refs.composed.emit("opened"), e.emit("opened");
									});
							},
						},
						{
							key: "open",
							value: function (e) {
								this.refs.composing.open(e);
							},
						},
						{
							key: "focus",
							value: function () {
								var e = d.default.findDOMNode(this.refs.composed);
								e.activeElement ? (e.activeElement.focus(), document.activeElement === document.body && e.focus()) : e.focus();
							},
						},
						{
							key: "close",
							value: function (e) {
								this.refs.composing.close(e);
							},
						},
						{
							key: "isClosed",
							value: function () {
								return "closed" === this.refs.composing.state.transition;
							},
						},
						{
							key: "isTransitioning",
							value: function () {
								return this.refs.composing.isTransitioning();
							},
						},
						{
							key: "getTopMost",
							value: function () {
								return this.refs.popup.refs.popup ? this.refs.popup.refs.popup.getTopMost() : this;
							},
						},
						{
							key: "openPopup",
							value: function (e) {
								this.refs.popup.setState({ popup: e });
							},
						},
						{
							key: "componentDidUpdate",
							value: function () {
								this.refs.popup && this.refs.popup.open();
							},
						},
						{
							key: "render",
							value: function () {
								return c.default.createElement(
									h.default,
									{ ref: "composing", openAnimation: t, closeAnimation: n },
									c.default.createElement(e, s({ ref: "composed" }, this.props)),
									c.default.createElement(w.default, { ref: "popup" })
								);
							},
						},
					]),
					l
				);
			})(v.default);
		};
		t.default = k;
	},
	41: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		Object.defineProperty(t, "__esModule", { value: !0 });
		var u =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			l = (function () {
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
			c = n(14),
			f = a(c),
			d = n(5),
			p = a(d),
			h = n(19),
			m = a(h),
			v = n(211),
			g = a(v),
			y = n(13),
			b = i(y),
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
			},
			_ = (function (e) {
				function t() {
					o(this, t);
					var e = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return (e.apps = []), (e.stkEnabled = !1), (window.AppStore = e), e;
				}
				return (
					s(t, e),
					l(t, [
						{
							key: "start",
							value: function () {
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
									m.default.addObserver("icc.applications", this));
							},
						},
						{
							key: "_observe_icc.applications",
							value: function (e) {
								(e = JSON.parse(e)), (this.stkEnabled = e && "object" === ("undefined" == typeof e ? "undefined" : u(e)) && Object.keys(e).length > 0), this.emit("change");
							},
						},
						{
							key: "queryApp",
							value: function (e, t) {
								var n = void 0;
								return (
									this.apps.some(function (i) {
										return b.getDeepProp(i, e) === t && ((n = i), !0);
									}),
									n
								);
							},
						},
						{
							key: "getAppIconUrl",
							value: function (e, t, n) {
								if (((t = t || e.manifest.icons), !t)) return null;
								var i = this.pickUpAppIconInProperSize(t, n);
								return /^(http|data)/.test(i) || (i = e.origin + i), i;
							},
						},
						{
							key: "pickUpAppIconInProperSize",
							value: function (e) {
								var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 56;
								return e[
									Object.keys(e).sort(function (e, n) {
										return (e - n) * (e >= t ? 1 : -1);
									})[0]
								];
							},
						},
						{
							key: "getDataMcc",
							value: function () {
								var e = "000";
								return navigator.mozMobileConnections.length > 0 && (e = navigator.mozMobileConnections[0].data.network.mcc), e;
							},
						},
						{
							key: "getSimmcc",
							value: function () {
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
							},
						},
						{
							key: "getDataMccmnc",
							value: function () {
								var e = "00000";
								return (
									navigator.mozMobileConnections.length > 0 && (e = navigator.mozMobileConnections[0].data.network.mcc + navigator.mozMobileConnections[0].data.network.mnc), e
								);
							},
						},
						{
							key: "getSimmccmnc",
							value: function () {
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
							},
						},
						{
							key: "updateAppIcon",
							value: function (e) {
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
							},
						},
						{
							key: "checkImage",
							value: function (e, t, n) {
								var i = this,
									a = new Image();
								(a.src = e[t]),
									(a.onerror = function () {
										(e[t] = n), i.emit("change");
									});
							},
						},
						{
							key: "getAppUid",
							value: function (e) {
								var t = e.manifestURL;
								return e.entry && (t = t + "+" + e.entry), t;
							},
						},
						{
							key: "getAppsOrder",
							value: function () {
								var e = this;
								return new Promise(function (t) {
									b.asyncLocalStorage.getItem("app-order").then(function (n) {
										(e.appsOrder = JSON.parse(n) || w), t();
									});
								});
							},
						},
						{
							key: "setAppsOrder",
							value: function (e) {
								(this.appsOrder = e), b.asyncLocalStorage.setItem("app-order", JSON.stringify(e)), this.resort(), this.emit("change");
							},
						},
						{
							key: "resort",
							value: function () {
								var e = this,
									t = this.apps.length;
								this.apps.forEach(function (n, i) {
									var a = n.manifest.name,
										o = e.appsOrder.indexOf(a);
									n.order = -1 === o ? t + i : o;
								});
							},
						},
						{
							key: "updateAllItems",
							value: function () {
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
							},
						},
						{
							key: "addItem",
							value: function (e, t) {
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
										window.performance.mark("appLaunch@" + e.origin),
											"bookmark" === e.type ? new MozActivity({ name: "view", data: { type: "url", url: e.url } }) : t.launch(e.entry);
									}),
									(e.shouldHide = function () {
										return (
											!e.enabled ||
											"dialer" === e.entry ||
											("stk" === e.manifest.name && !n.stkEnabled) ||
											["system", "input", "theme", "homescreen", "invisible"].includes(e.manifest.role)
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
							},
						},
						{
							key: "launchBrowser",
							value: function () {
								null != this.browser
									? this.browser.launch()
									: this.apps.some(function (e) {
											var t = "Browser" === e.manifest.name;
											return t && e.launch(), t;
									  });
							},
						},
						{
							key: "addMozAppItem",
							value: function (e) {
								var t = e.manifest || e.updateManifest,
									n = t.entry_points;
								if (n) {
									var i = "";
									t = JSON.parse(JSON.stringify(t));
									for (var a in n) {
										var o = {},
											r = n[a];
										i = new g.default(r).name;
										for (var s in r) "locale" !== s && "name" !== s && (t[s] = r[s]);
										for (var u in e) o[u] = e[u];
										(o.type = "mozapp"), (o.manifest = t), (o.displayName = i), (o.entry = a), this.addItem(o, e);
									}
								} else {
									var l = {};
									for (var c in e) l[c] = e[c];
									l.manifest || (l.manifest = l.updateManifest), (l.type = "mozapp"), (l.displayName = new g.default(l.manifest).name), this.addItem(l, e);
								}
							},
						},
						{
							key: "removeMozAppItem",
							value: function (e) {
								var t = this.getAppUid(e),
									n = this.apps.findIndex(function (e) {
										return e.uid === t;
									});
								return n >= 0 ? this.apps.splice(n, 1).shift() : null;
							},
						},
						{
							key: "removeItemFromAppsOrder",
							value: function (e) {
								var t = this.appsOrder.indexOf(e);
								-1 !== t && (this.appsOrder.splice(t, 1), this.setAppsOrder(this.appsOrder));
							},
						},
						{
							key: "updateMozAppItems",
							value: function () {
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
							},
						},
						{
							key: "uninstallMozApp",
							value: function (e) {
								p.default.request("showDialog", {
									type: "confirm",
									ok: "uninstall",
									header: b.toL10n("confirmation"),
									content: b.toL10n("confirm-to-uninstall-app", { appName: e.manifest.name }),
									translated: !0,
									onOk: function () {
										navigator.mozApps.mgmt.uninstall(e);
									},
								});
							},
						},
						{
							key: "addBookmarkItem",
							value: function (e) {
								if (e.url) {
									var t = this.transformBookmarkIntoApp(e);
									return this.addItem(t), t;
								}
							},
						},
						{
							key: "removeBookmarkItem",
							value: function (e) {
								var t = this.apps.findIndex(function (t) {
									return t.url === e;
								});
								return t >= 0 ? this.apps.splice(t, 1).shift() : null;
							},
						},
						{
							key: "updateBookmarkItems",
							value: function () {
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
							},
						},
						{
							key: "transformBookmarkIntoApp",
							value: function (e) {
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
							},
						},
						{
							key: "unpinBookmark",
							value: function (e) {
								p.default.request("showDialog", {
									type: "confirm",
									ok: "unpin",
									header: b.toL10n("confirmation"),
									content: b.toL10n("confirm-to-unpin-bookmark"),
									translated: !0,
									onOk: function () {
										BookmarksDatabase.remove(e.url);
									},
								});
							},
						},
						{
							key: "renameBookmark",
							value: function (e) {
								var t = e.displayName.slice(0, 255);
								p.default.request("showDialog", {
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
							},
						},
					]),
					t
				);
			})(f.default),
			S = new _();
		S.start(), (t.default = S);
	},
	42: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(14),
			l = i(u),
			c = n(5),
			f = i(c),
			d = n(41),
			p = i(d),
			h = (function (e) {
				function t(e) {
					a(this, t);
					var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (
						(n.name = "LaunchStore"),
						(n.resetLaunchingMarker = function () {
							n.isLaunching = !1;
						}),
						(n.ports = {}),
						window.addEventListener("visibilitychange", n.resetLaunchingMarker),
						window.addEventListener("blur", n.resetLaunchingMarker),
						f.default.registerState("isLaunching", n),
						n
					);
				}
				return (
					r(t, e),
					s(t, [
						{
							key: "launch",
							value: function (e, t, n) {
								e &&
									t &&
									("iac" === e ? this.launchForIAC(t, n) : this.launchApp(e, t),
									this.resetTimer && (clearTimeout(this.resetTimer), (this.resetTimer = null)),
									(this.resetTimer = setTimeout(this.resetLaunchingMarker, 3e3)));
							},
						},
						{
							key: "launchApp",
							value: function (e, t) {
								if (!this.isLaunching) {
									this.isLaunching = !0;
									var n = p.default.queryApp(e, t);
									n && n.launch();
								}
							},
						},
						{
							key: "launchForIAC",
							value: function (e) {
								var t = this,
									n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
								if (!this.isLaunching) {
									if (!this.ports[e])
										return void (navigator.mozApps.getSelf().onsuccess = function (i) {
											i.target.result.connect(e).then(
												function (i) {
													(t.ports[e] = i), t.launchForIAC(e, n);
												},
												function (e) {}
											);
										});
									(this.isLaunching = !0),
										this.ports[e].forEach(function (e) {
											e.postMessage(n);
										});
								}
							},
						},
					]),
					t
				);
			})(l.default);
		t.default = new h();
	},
	63: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		Object.defineProperty(t, "__esModule", { value: !0 });
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
			l = n(14),
			c = a(l),
			f = n(215),
			d = a(f),
			p = n(5),
			h = a(p),
			m = n(64),
			v = a(m),
			g = n(41),
			y = a(g),
			b = n(110),
			w = a(b),
			k = n(13),
			_ = i(k),
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
								h.default.request("chooseSim", "call").then(function () {
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
											? h.default.request("showDialog", { type: "alert", header: "confirmation", content: "assign-voicemail" })
											: h.default.request("showDialog", {
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
								h.default.request("showDialog", {
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
											: h.default.request("showDialog", {
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
								if (this.pressingTimer && !h.default.query("LaunchStore.isLaunching") && h.default.query("Dialer.ready")) {
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
											window.clearTimeout(this.pressingTimer), (this.pressingTimer = null), h.default.query("App.panelAnimationRunning") || h.default.request("Dialer:show", t);
									}
								}
							},
						},
						{
							key: "_handle_keydown",
							value: function (e) {
								var t = this;
								if (!h.default.query("LaunchStore.isLaunching") && h.default.query("Dialer.ready")) {
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
		t.default = O;
	},
	105: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		function u(e, t, n) {
			var i = {};
			e: for (var a = 0, o = t.terms.length; a < o; a++)
				for (var r = t.terms[a], s = 0, u = t.fields.length; s < u; s++) {
					var l = t.fields[s];
					if (e[l])
						for (var c = 0, f = e[l].length; c < f; c++) {
							var d = e[l][c];
							if (("undefined" != typeof d.value && (d = d.value), (i[r] = n(d.trim(), r)))) continue e;
						}
				}
			return Object.keys(i).every(function (e) {
				return i[e];
			});
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var l = (function () {
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
			c = n(14),
			f = a(c),
			d = n(13),
			p = i(d),
			h = {
				contains: function (e, t) {
					return (e = e.toLowerCase()), (t = t.toLowerCase()), e.contains(t);
				},
				equality: function (e, t) {
					return (e = e.toLowerCase()), (t = t.toLowerCase()), e === t;
				},
			},
			m = /\s+/,
			v = (function (e) {
				function t() {
					return o(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
				}
				return (
					s(t, e),
					l(t, [
						{
							key: "start",
							value: function () {
								(this.contactStore = new Map()), (this.API = window.mozContacts || navigator.mozContacts), this.API.addEventListener("contactchange", this), this.initObserver();
							},
						},
						{
							key: "getContactChildren",
							value: function (e) {
								return e ? e.querySelectorAll("*[data-contact-number]") : [];
							},
						},
						{
							key: "updateFragment",
							value: function (e) {
								"function" == typeof e.hasAttribute && e.hasAttribute("data-contact-number") && this.updateContact(e);
								for (var t = this.getContactChildren(e), n = 0; n < t.length; n++) this.updateContact(t[n]);
							},
						},
						{
							key: "initObserver",
							value: function () {
								var e = this,
									t = { attributes: !0, characterData: !1, childList: !0, subtree: !0, attributeFilter: ["data-contact-number"] };
								new MutationObserver(function (n, i) {
									i.disconnect(), e.updateContacts(n), i.observe(document, t);
								}).observe(document, t);
							},
						},
						{
							key: "updateContacts",
							value: function (e) {
								for (var t = this, n = void 0, i = new Set(), a = 0; a < e.length; a++) {
									if (((n = e[a]), "childList" === n.type))
										for (var o = void 0, r = 0; r < n.addedNodes.length; r++) (o = n.addedNodes[r]), o.nodeType === Node.ELEMENT_NODE && i.add(o);
									"attributes" === n.type && i.add(n.target);
								}
								i.forEach(function (e) {
									e.childElementCount ? t.updateFragment(e) : e.dataset.contactNumber && t.updateContact(e);
								}, this);
							},
						},
						{
							key: "updateContact",
							value: function (e) {
								var t = this,
									n = e.dataset.contactNumber,
									i = "name" === e.dataset.contactColumn ? e : e.querySelector("[data-contact-column=name]"),
									a = "photo" === e.dataset.contactColumn ? e : e.querySelector("[data-contact-column=photo]");
								this.findByAddress(n, function (o) {
									var r = p.getContactDetails(n, o, { photoURL: !0 });
									i
										? r.name
											? i.textContent !== r.name && (t.debug("updating name", r, e), (i.textContent = r.name))
											: i.textContent && (t.debug("cleaning name", r, e), (i.textContent = ""))
										: t.debug("no contact name DOM"),
										a ? (t.debug("updating photo", r, e), (a.style.backgroundImage = r.photoURL ? "url(" + r.photoURL + ")" : null)) : t.debug("no photo DOM");
								});
							},
						},
						{
							key: "_handle_contactchange",
							value: function () {
								this.updateFragment(document.body), this.emit("contact-changed");
							},
						},
						{
							key: "findBy",
							value: function (e, t) {
								var n,
									i,
									a = [],
									o = (e.filterValue || "").trim(),
									r = this;
								return navigator.mozContacts && o.length
									? ((n = o.split(m)),
									  (e.filterValue =
											1 === n.length
												? n[0]
												: n.reduce(function (e, t) {
														return a.push(t.toLowerCase()), t.length > e.length ? t : e;
												  }, "")),
									  e.filterValue.length < 3 && (e.filterLimit = 10),
									  a.splice(a.indexOf(e.filterValue.toLowerCase()), 1),
									  a.push.apply(a, n),
									  (i = r.API.find(e)),
									  (i.onsuccess = function () {
											var e,
												i = this.result.slice(),
												o = ["tel", "givenName", "familyName"],
												r = { fields: o, terms: a },
												s = [];
											if (n.length > 1) for (; (e = i.pop()); ) u(e, r, h.contains) && s.push(e);
											else s = i;
											t(s, { terms: n });
									  }),
									  void (i.onerror = function () {
											(this.onsuccess = null), (this.onerror = null), t(null);
									  }))
									: void setTimeout(function () {
											t("undefined" == typeof e.filterValue ? null : [], {});
									  });
							},
						},
						{
							key: "findContactByString",
							value: function (e, t) {
								var n = ["tel", "givenName", "familyName"];
								return this.findBy({ filterBy: n, filterOp: "contains", filterValue: e }, t);
							},
						},
						{
							key: "findExact",
							value: function (e, t) {
								return this.findBy({ filterBy: ["givenName", "familyName"], filterOp: "contains", filterValue: e }, function (n) {
									var i = n && n.length ? n[0] : null,
										a = { fields: ["name"], terms: [e] },
										o = !1;
									i && (o = u(i, a, h.equality)), t(o ? [i] : []);
								});
							},
						},
						{
							key: "findByPhoneNumber",
							value: function (e, t) {
								return this.findBy({ filterBy: ["tel"], filterOp: "match", filterValue: e.replace(/\s+/g, "") }, function (e) {
									return e && e.length ? void t(e) : void t([]);
								});
							},
						},
						{
							key: "findByAddress",
							value: function (e, t) {
								this.findByPhoneNumber(e, t);
							},
						},
						{
							key: "findExactByEmail",
							value: function (e, t) {
								return this.findBy({ filterBy: ["email"], filterOp: "equals", filterValue: e }, t);
							},
						},
						{
							key: "findById",
							value: function (e, t) {
								return this.findBy({ filterBy: ["id"], filterOp: "equals", filterValue: e }, function (e) {
									var n = [];
									e && e.length && (n = e[0]), t(n);
								});
							},
						},
					]),
					t
				);
			})(f.default),
			g = new v();
		g.start(), (t.default = g);
	},
	108: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(14),
			l = i(u),
			c = (function (e) {
				function t() {
					return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
				}
				return (
					r(t, e),
					s(t, [
						{
							key: "start",
							value: function () {
								this.emit("user-has-selected");
							},
						},
					]),
					t
				);
			})(l.default),
			f = new c();
		t.default = f;
	},
	109: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(14),
			l = i(u),
			c = (function (e) {
				function t(e) {
					a(this, t), dump("cck flashlight constructor");
					var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (
						(n.name = "FlashlightHelper"),
						(n.init = function (e) {
							dump("cck flashlight init"), e.addEventListener("flashlightchange", n), (n.flashlightManager = e), n.emit("ready", e.flashlightEnabled);
						}),
						navigator.getFlashlightManager &&
							navigator.hasFeature &&
							navigator.hasFeature("device.capability.torch").then(function (e) {
								(n.capability = e), navigator.getFlashlightManager().then(n.init);
							}),
						n
					);
				}
				return (
					r(t, e),
					s(t, [
						{
							key: "_handle_flashlightchange",
							value: function () {
								dump("cck _handle_flashlightchange flashlightEnabled=" + this.flashlightManager.flashlightEnabled), this.emit("change", this.flashlightManager.flashlightEnabled);
							},
						},
						{
							key: "toggle",
							value: function () {
								dump("cck FlashlightHelper toggle flashlightEnabled=" + this.flashlightManager.flashlightEnabled),
									(this.flashlightManager.flashlightEnabled = !this.flashlightManager.flashlightEnabled);
							},
						},
					]),
					t
				);
			})(l.default);
		t.default = new c();
	},
	110: function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", { value: !0 });
		var n = { w: "1", e: "2", r: "3", s: "4", d: "5", f: "6", z: "7", x: "8", c: "9", ",": "0", o: "+", a: "*", q: "#" };
		t.default = {
			translate: function (e) {
				return n[e] || e;
			},
		};
	},
	113: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(3),
			l = i(u),
			c = n(11),
			f = i(c),
			d = n(6),
			p = i(d),
			h = (function (e) {
				function t(e) {
					a(this, t);
					var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.state = { popup: null }), n;
				}
				return (
					r(t, e),
					s(t, [
						{ key: "componentDidMount", value: function () {} },
						{
							key: "focus",
							value: function () {
								f.default.findDOMNode(this.refs.composed).focus();
							},
						},
						{
							key: "open",
							value: function (e) {
								this.refs.popup && this.refs.popup.open(e);
							},
						},
						{
							key: "componentDidUpdate",
							value: function () {
								var e = this;
								this.refs.popup &&
									(this.refs.popup.open("bottom-to-up"),
									(this.refs.popup.refs.composed.close = this.close.bind(this)),
									this.refs.popup.refs.composing.on("closing", function () {
										e.setState({ popup: null });
									}));
							},
						},
						{
							key: "render",
							value: function () {
								var e = this.state.popup ? l.default.cloneElement(this.state.popup, { ref: "popup" }) : null;
								return l.default.createElement("div", { className: "popup" }, e);
							},
						},
					]),
					t
				);
			})(p.default);
		t.default = h;
	},
	128: function (e, t, n) {
		var i;
		"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
			? function (e) {
					return typeof e;
			  }
			: function (e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			  };
		!(function (a) {
			(i = function (e, t, n) {
				"use strict";
				function i(e, t) {
					var n = a(t),
						i = n.measureText(e).width;
					return r("got text width", i), i;
				}
				function a(e) {
					r("get canvas context", e);
					var t = s[e];
					if (t) return t;
					var n = document.createElement("canvas");
					n.setAttribute("moz-opaque", "true"), n.setAttribute("width", "1px"), n.setAttribute("height", "1px"), r("created canvas", n);
					var i = n.getContext("2d", { willReadFrequently: !0 });
					return (i.font = e), (s[e] = i);
				}
				function o(e) {
					return e.replace(/\s+/g, " ").trim();
				}
				var r = function () {},
					s = {};
				n.exports = function (e) {
					r("font fit", e);
					var t,
						n,
						a = e.space - 0.03 * e.space,
						s = e.min || 16,
						u = e.max || 24,
						l = o(e.text),
						c = u;
					do (n = e.font.replace(/\d+px/, c + "px")), (t = i(l, n));
					while (t > a && c !== s && c--);
					return { textWidth: t, fontSize: c, overflowing: t > a };
				};
			}.call(t, n, t, e)),
				!(void 0 !== i && (e.exports = i));
		})(n(237));
	},
	130: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(3),
			l = i(u),
			c = n(11),
			f = i(c),
			d = n(6),
			p = i(d),
			h = n(131),
			m = i(h);
		n(219);
		var v = (function (e) {
			function t(e) {
				a(this, t);
				var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (n.state = { transition: "closed", animation: "immediate" }), n;
			}
			return (
				r(t, e),
				s(t, [
					{
						key: "isHidden",
						value: function () {
							return "opened" !== this.state.transition;
						},
					},
				]),
				s(t, [
					{
						key: "isActive",
						value: function () {
							return "opened" === this.state.transition || "opening" === this.state.transition;
						},
					},
					{
						key: "isTransitioning",
						value: function () {
							return "opening" === this.state.transition || "closing" === this.state.transition;
						},
					},
					{
						key: "onAnimationEnd",
						value: function (e) {
							if (e.target === f.default.findDOMNode(this))
								switch (this.state.transition) {
									case "opening":
										this.setState({ transition: "opened", animation: "" });
										break;
									case "closing":
										this.setState({ transition: "closed", animation: "" });
								}
						},
					},
					{
						key: "componentDidMount",
						value: function () {
							f.default.findDOMNode(this).addEventListener("animationend", this.onAnimationEnd.bind(this), !1);
						},
					},
					{
						key: "getActivatedState",
						value: function () {
							switch (this.state.transition) {
								case "opening":
									return "-activating";
								case "closing":
									return "-deactivating";
								case "opened":
									return "-activated";
								case "closed":
									return "-deactivated";
							}
						},
					},
					{
						key: "componentDidUpdate",
						value: function () {
							this.emit(this.state.transition), this.publish(this.getActivatedState());
							var e = (l.default.Children.toArray(this.props.children)[0], f.default.findDOMNode(this.refs.shadow).firstChild);
							if (!e) return void this.debug("no content");
							if ("opened" === this.state.transition) {
								if ((this.debug("focusing inner content"), this.props.noFocus)) return;
								e.activeElement ? e.activeElement.focus() : e.focus();
							} else "closing" === this.state.transition && e.blur();
						},
					},
					{
						key: "shouldComponentUpdate",
						value: function (e, t) {
							return t.transition !== this.state.transition || t.animation !== this.state.animation;
						},
					},
					{
						key: "open",
						value: function (e) {
							switch (((e = e || this.props.openAnimation), this.state.transition)) {
								case "opened":
									break;
								case "opening":
								case "closing":
								case "closed":
									"immediate" !== e && e ? this.setState({ transition: "opening", animation: e }) : this.setState({ transition: "opened", animation: "" });
							}
						},
					},
					{
						key: "focus",
						value: function () {
							var e = f.default.findDOMNode(this.refs.shadow).firstChild;
							e && e.focus();
						},
					},
					{
						key: "close",
						value: function (e) {
							switch (((e = e || this.props.closeAnimation), this.state.transition)) {
								case "closed":
									break;
								case "opening":
								case "closing":
								case "opened":
									"immediate" !== e && e ? this.setState({ transition: "closing", animation: e }) : this.setState({ transition: "closed", animation: "" });
							}
						},
					},
					{
						key: "render",
						value: function () {
							return l.default.createElement(
								"div",
								{
									tabIndex: "-1",
									className: "x-window " + this.state.animation,
									"aria-hidden": "opened" === this.state.transition ? "false" : "true",
									"data-transition-state": this.state.transition,
								},
								l.default.createElement(m.default, { ref: "shadow", transition: this.state.transition, animation: this.state.animation }, this.props.children)
							);
						},
					},
				]),
				t
			);
		})(p.default);
		(v.defaultProps = { openAnimation: "immediate", closeAnimation: "immediate", noFocus: !1 }),
			(v.propTypes = { openAnimation: l.default.PropTypes.string, closeAnimation: l.default.PropTypes.string, noFocus: l.default.PropTypes.bool }),
			(t.default = v);
	},
	131: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(3),
			l = i(u),
			c = n(11),
			f =
				(i(c),
				(function (e) {
					function t() {
						return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
					}
					return (
						r(t, e),
						s(t, [
							{
								key: "isOpening",
								value: function (e) {
									var t = e || this.props;
									return "opening" === t.transition || ("opened" === t.transition && "immediate" === t.animation);
								},
							},
							{
								key: "isClosed",
								value: function (e) {
									return "closed" === (e || this.props).transition;
								},
							},
							{
								key: "shouldComponentUpdate",
								value: function (e, t) {
									return !!this.isOpening(e);
								},
							},
							{
								key: "render",
								value: function () {
									return l.default.createElement("div", { className: "shadow-window" }, this.props.children);
								},
							},
						]),
						t
					);
				})(l.default.Component));
		(f.defaultProps = { transition: "", animation: "" }),
			(f.propTypes = { transition: l.default.PropTypes.string.isRequired, animation: l.default.PropTypes.string.isRequired }),
			(t.default = f);
	},
	198: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(3),
			l = i(u),
			c = n(6),
			f = i(c),
			d = n(26),
			p = i(d),
			h = n(16),
			m = i(h),
			v = n(62),
			g = i(v),
			y = n(5),
			b = i(y),
			w = n(108),
			k = i(w);
		n(224);
		var _ = n(199),
			S = i(_),
			O = ["Contract WAP", "PAYG WAP"],
			E = [
				{ l10nId: "apnConfigPostpay", value: O[0] },
				{ l10nId: "apnConfigPrepay", value: O[1] },
			],
			I = (function (e) {
				function t(e) {
					a(this, t);
					var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.name = "APNSelection"), (n.FOCUS_SELECTOR = ".list-item"), (n.state = { whichCard: 0 }), n;
				}
				return (
					r(t, e),
					s(t, [
						{
							key: "componentDidMount",
							value: function () {
								(this.navigator = new g.default(this.FOCUS_SELECTOR, this.element)), this.updateSoftkeys(), b.default.register("setOperatorId", this);
							},
						},
						{
							key: "updateSoftkeys",
							value: function () {
								m.default.register({ center: "select" }, this.element);
							},
						},
						{
							key: "onKeyDown",
							value: function (e) {
								switch (e.key) {
									case "Enter":
										var t = document.activeElement.dataset.value;
										dump("apn_selection value = " + t + ", id = " + this.id);
										var n = navigator.mozSettings.createLock(),
											i = {};
										t === O[0]
											? ((i["apn_default_show_" + this.id] = "wap.vodafone.co.uk"), S.default.apnSelect(this.id, "wap.vodafone.co.uk"))
											: t === O[1]
											? ((i["apn_default_show_" + this.id] = "pp.vodafone.co.uk"), S.default.apnSelect(this.id, "pp.vodafone.co.uk"))
											: (i["apn_default_show_" + this.id] = ""),
											n.set(i),
											n.set({ apn_auto_disable: !0 }),
											this.hide(),
											0 == this.id && k.default.start();
										break;
									case "Backspace":
										e.preventDefault(), b.default.request("back");
								}
							},
						},
						{
							key: "hide",
							value: function () {
								b.default.request("closeSheet", "apnselection"),
									this._lock && this._lock.unlock && (dump("apn_selection unlock the _lock"), this._lock.unlock(), (this._lock = null));
							},
						},
						{
							key: "setOperatorId",
							value: function (e) {
								dump("apn_selection.js setOperatorId id = " + e), (this._lock = navigator.requestWakeLock("screen")), (this.id = e), this.setState({ whichCard: e });
							},
						},
						{
							key: "render",
							value: function () {
								var e = this,
									t = [];
								return (
									E.forEach(function (e) {
										var n = e.value === O[0];
										t.push(
											l.default.createElement(
												"li",
												{ tabIndex: "-1", className: "list-item", "data-value": e.value },
												l.default.createElement("p", { "data-l10n-id": e.l10nId }),
												l.default.createElement(
													"div",
													{ className: "apnselection-key" },
													l.default.createElement("i", { className: "icon control", "data-icon": n ? "radio-on" : "radio-off", "aria-hidden": "true" }),
													l.default.createElement("input", { type: "radio", checked: n, className: "hidden" })
												)
											)
										);
									}),
									l.default.createElement(
										"section",
										{
											role: "region",
											tabIndex: "-1",
											onKeyDown: function (t) {
												e.onKeyDown(t);
											},
											ref: function (t) {
												e.element = t;
											},
										},
										l.default.createElement(
											"header",
											{ class: "apnheader" },
											l.default.createElement("h1", { "data-l10n-id": 0 == this.state.whichCard ? "apn-sim1" : "apn-sim2" })
										),
										l.default.createElement("ul", { id: "apnconfig-list" }, t),
										l.default.createElement("p", { "data-l10n-id": "apn-defaultconfig-message" }, "Set which type of apn to show")
									)
								);
							},
						},
					]),
					t
				);
			})(f.default);
		t.default = (0, p.default)(I, "immediate", "immediate");
	},
	199: function (e, t) {
		"use strict";
		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var i = (function () {
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
			a = (function () {
				function e() {
					n(this, e);
				}
				return (
					i(e, [
						{
							key: "_getDefaultApns",
							value: function (e) {
								return new Promise(function (t, n) {
									var i = navigator.mozSettings.createLock(),
										a = i.get("ril.data.default.apns");
									a.onsuccess = function () {
										t(a.result["ril.data.default.apns"][e]);
									};
								});
							},
						},
						{
							key: "_cloneApn",
							value: function (e) {
								var t = {};
								for (var n in e) t[n] = e[n];
								return t;
							},
						},
						{
							key: "_separateApnsByType",
							value: function (e) {
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
							},
						},
						{
							key: "_getApnSettings",
							value: function () {
								return new Promise(function (e, t) {
									var n = navigator.mozSettings.createLock(),
										i = n.get("ril.data.apnSettings");
									i.onsuccess = function () {
										e(i.result["ril.data.apnSettings"]);
									};
								});
							},
						},
						{
							key: "_setApnSettings",
							value: function (e) {
								var t = navigator.mozSettings.createLock(),
									n = {};
								(n["ril.data.apnSettings"] = e), (n["apn.selections"] = null);
								t.set(n);
							},
						},
						{
							key: "_updateApnSettings",
							value: function (e, t) {
								var n = this;
								this._getApnSettings().then(function (i) {
									if ((dump("ApnSelector in launcher _updateApnSettings apnSettings:" + JSON.stringify(i)), i && i[e])) {
										var a = i[e],
											o = !1;
										t.forEach(function (e) {
											var t = a.findIndex(function (t) {
												return t.types.some(function (t) {
													return e.types[0] === t;
												});
											});
											t === -1 ? (a.push(e), (o = !0)) : JSON.stringify(a[t]) != JSON.stringify(e) && ((a[t] = e), (o = !0));
										}),
											o && (dump("_updateApnSettings to set new apns:" + JSON.stringify(i)), n._setApnSettings(i));
									}
								});
							},
						},
						{
							key: "apnSelect",
							value: function (e, t) {
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
							},
						},
					]),
					e
				);
			})(),
			o = new a();
		t.default = o;
	},
	200: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e) {
			if (Array.isArray(e)) {
				for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
				return n;
			}
			return Array.from(e);
		}
		function r(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function s(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function u(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		function l(e) {
			return p.default.createElement(
				"div",
				{ className: "app-tile", style: f({}, e.renderProps.orderStyle) },
				p.default.createElement(
					"div",
					{ tabIndex: "-1", role: "menuitem", className: "app", key: e.uid, onClick: e.launch },
					p.default.createElement(
						"div",
						{ className: "app__icon", style: e.renderProps.iconStyle },
						p.default.createElement("div", { className: "app__icon--hq", style: { backgroundImage: "url('" + e.icon_url_hq + "')" } }),
						e.favicon_url && p.default.createElement("div", { className: "app__icon--favicon", style: { backgroundImage: "url('" + e.favicon_url + "')" } })
					),
					p.default.createElement("div", { className: "app__name" }, (0, T.unescapeNumericHTMLEntities)(e.displayName))
				)
			);
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var c = (function () {
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
			f =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
					}
					return e;
				},
			d = n(3),
			p = a(d),
			h = n(6),
			m = a(h),
			v = n(26),
			g = a(v),
			y = n(41),
			b = a(y),
			w = n(16),
			k = a(w),
			_ = n(5),
			S = a(_),
			O = n(63),
			E = a(O),
			I = n(13),
			P = i(I),
			T = n(216),
			M = n(42),
			C = a(M),
			A = n(19),
			L = a(A),
			j = n(206);
		n(225);
		var N = ["Siberian Strike", "Danger Dash", "Castle Of Magic", "Nitro Street Run 2"],
			D = ["Assistant", "Maps", "Google Search", "YouTube", "Twitter"],
			x = (function (e) {
				function t(e) {
					r(this, t);
					var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (
						(n.name = "AppList"),
						(n.navItemThrottleTime = 60),
						(n.ready = !1),
						(n.menuOptions = [
							{
								id: "rename",
								callback: function () {
									n.element.focus(), n.focusIfPossible(), b.default.renameBookmark(n.state.apps[n.focusIndex]);
								},
							},
							{ id: "move", tags: ["grid", "list"], callback: n.enterReorderMode.bind(n) },
							{
								id: "unpin",
								callback: function () {
									n.element.focus(), n.focusIfPossible(), b.default.unpinBookmark(n.state.apps[n.focusIndex]);
								},
							},
							{ id: "grid-view", tags: ["list", "single"], callback: n.switchViewMode.bind(n, "grid") },
							{ id: "list-view", tags: ["grid", "single"], callback: n.switchViewMode.bind(n, "list") },
							{ id: "single-view", tags: ["grid", "list"], callback: n.switchViewMode.bind(n, "single") },
							{
								id: "uninstall",
								callback: function () {
									n.element.focus(), n.focusIfPossible(), b.default.uninstallMozApp(n.state.apps[n.focusIndex].mozApp);
								},
							},
						]),
						(n.initFocus = [0, 0]),
						(n.state = { col: n.props.col, apps: [], viewMode: n.props.viewMode, focus: n.initFocus }),
						(n.gridsPerPage = n.props.col * n.props.row),
						(n.onKeyDown = n.onKeyDown.bind(n)),
						(n.onFocus = n.onFocus.bind(n)),
						(n.updateApps = n.updateApps.bind(n)),
						(n.currentPage = 0),
						n.getLauncherApps(),
						L.default.addObserver("custom.launcher.apps", n),
						window.addEventListener("visibilitychange", function () {
							var e = document.activeElement;
							document.hidden && n.appElements && [].concat(o(n.appElements)).includes(e) && ((n.isStickyApp = !0), e && e.classList.add("is-focus-app"));
						}),
						P.asyncLocalStorage.getItem("app-view-mode").then(function (e) {
							e && n.switchViewMode(e);
						}),
						n
					);
				}
				return (
					u(t, e),
					c(t, [
						{
							key: "getLauncherApps",
							value: function () {
								var e = this;
								L.default.get("custom.launcher.apps").then(function (t) {
									(e.custom_apps = t), e.updateApps();
								});
							},
						},
						{
							key: "_observe_custom.launcher.apps",
							value: function (e) {
								(this.custom_apps = e), this.updateApps();
							},
						},
						{
							key: "customAppHandler",
							value: function (e) {
								for (var t = [], n = [], i = b.default.getDataMcc(), a = b.default.getSimmcc(), o = 0; o < e.length; o++)
									if ("TIMGate" != e[o].manifest.name)
										D.includes(e[o].manifest.name) ? (a ? "460" !== a && t.push(e[o]) : "460" !== i && t.push(e[o])) : N.includes(e[o].manifest.name) ? n.push(e[o]) : t.push(e[o]);
									else {
										var r = b.default.getDataMccmnc(),
											s = b.default.getSimmccmnc();
										("22201" != r && "22201" != s) || t.push(e[o]);
									}
								if (this.custom_apps)
									for (var u = this.custom_apps.split(","), l = 0; l < n.length; l++) {
										var c = N.indexOf(n[l].manifest.name).toString();
										u.indexOf(c) !== -1 && t.push(n[l]);
									}
								return (
									t.sort(function (e, t) {
										return e.order - t.order;
									}),
									t
								);
							},
						},
						{
							key: "componentDidMount",
							value: function () {
								var e = this;
								b.default.on("change", this.updateApps),
									S.default.register("show", this),
									S.default.register("hide", this),
									S.default.registerState("ready", this),
									E.default.register(this.element),
									this.element.addEventListener("animationstart", function () {
										e.isAnimationEnd = !1;
									}),
									this.element.addEventListener("animationend", function () {
										e.isAnimationEnd = !0;
									});
							},
						},
						{
							key: "componentDidUpdate",
							value: function (e, t) {
								this.focusIfPossible(), this.updateSoftKeys(), this.scrollIntoViewIfPossible(), this.ready || (this.ready = this.state.apps.length > 0);
								var n = t.apps,
									i = this.state.apps,
									a = i.length - n.length;
								if (a > 0) {
									i.filter(function (e) {
										return !n.includes(e);
									})
										.filter(function (e) {
											return e.toBeTracked || (e.mozApp && e.mozApp.toBeTracked);
										})
										.forEach(function (e) {
											j.eventLogger.log({
												type: j.EVENT_TYPES.APP_POSITION,
												starting_position: -1,
												end_position: i.indexOf(e),
												app_id: e.manifestURL,
												app_version: e.manifest.version,
											});
										});
								} else if (a < 0) {
									var o = n.filter(function (e) {
											return !i.includes(e);
										}),
										r = o.filter(function (e) {
											return e.toBeTracked || (e.mozApp && e.mozApp.toBeTracked);
										});
									r.forEach(function (e) {
										j.eventLogger.log({
											type: j.EVENT_TYPES.APP_POSITION,
											starting_position: n.indexOf(e),
											end_position: -1,
											app_id: e.manifestURL,
											app_version: e.manifest.version,
										});
									});
								}
							},
						},
						{
							key: "scrollIntoViewIfPossible",
							value: function () {
								switch (this.state.viewMode) {
									case "grid":
										this.goPage(this.getPage(this.state.reorderMode ? this.reorder.focus[0] : this.state.focus[0]));
										break;
									case "list":
										this.scrollIntoViewForListView();
										break;
									case "single":
										document.activeElement.scrollIntoView();
								}
							},
						},
						{
							key: "scrollIntoViewForListView",
							value: function () {
								if (!this.wrapperBondary) {
									var e = this.appElements && this.appElements[0].offsetParent;
									if (!e) return;
									var t = e.getBoundingClientRect();
									this.wrapperBondary = { top: t.top, bottom: window.innerHeight - t.bottom };
								}
								var n = document.activeElement,
									i = n.getBoundingClientRect();
								i.top < this.wrapperBondary.top ? n.scrollIntoView(!0) : i.bottom > window.innerHeight - this.wrapperBondary.bottom && n.scrollIntoView(!1);
							},
						},
						{
							key: "getPage",
							value: function (e) {
								return Math.floor(e / this.props.row);
							},
						},
						{
							key: "goPage",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.currentPage;
								!this.appElements ||
									this.state.pageLength < 2 ||
									(this.currentPage !== e &&
										(void 0 === this.pageOffsetY && (this.pageOffsetY = this.appElements[this.gridsPerPage].offsetTop - this.appElements[0].offsetTop),
										(this._container.scrollTop = this.pageOffsetY * e),
										(this.currentPage = e)));
							},
						},
						{
							key: "updateApps",
							value: function () {
								var e = this,
									t = this.element.contains(document.activeElement),
									n = this.appHandler(b.default.apps);
								(n = this.customAppHandler(n)),
									this.setState(
										function (t) {
											return (t.apps = n), (t.pageLength = Math.ceil(t.apps.length / e.gridsPerPage)), t;
										},
										function () {
											t && (e.focus(), e.focusIfPossible());
										}
									);
							},
						},
						{
							key: "updateSoftKeys",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { center: "select", right: "options" };
								this.state.reorderMode && (e = { center: "set", right: "", left: "cancel" }), k.default.register(e, this.element);
							},
						},
						{
							key: "onFocus",
							value: function () {
								return (
									this.isStickyApp && ((this.isStickyApp = !1), document.querySelector(".is-focus-app").classList.remove("is-focus-app")),
									this.element === document.activeElement
										? (this.focusIfPossible(), this.scrollIntoViewIfPossible(), void this.updateSoftKeys())
										: (this.element.contains(document.activeElement) || this.element.focus(), void this.updateSoftKeys())
								);
							},
						},
						{
							key: "focusIfPossible",
							value: function () {
								if (this.element.contains(document.activeElement)) {
									var e = this.getFocusGridElement();
									return e ? void e.focus() : void this.setState({ focus: this.initFocus });
								}
							},
						},
						{
							key: "getFocusGridElement",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : P.rowColToIndex(this.state.focus, this.state.col),
									t = this.state.apps.length - 1;
								return (
									e > t && ((e = t), (this.state.focus = P.indexToRowCol(e, this.state.col))),
									(this.focusIndex = e),
									this.appElements || (this.appElements = this.element.getElementsByClassName("app")),
									this.appElements[e]
								);
							},
						},
						{
							key: "enterReorderMode",
							value: function () {
								this.setState({ reorderMode: !0 }),
									(this.reorder = {
										target: this.element.querySelectorAll(".app-tile")[this.focusIndex],
										focus: this.state.focus,
										app: this.state.apps[this.focusIndex],
										indexFrom: this.focusIndex,
										indexTo: this.focusIndex,
									});
							},
						},
						{
							key: "exitReorderMode",
							value: function (e) {
								var t = this;
								this.setState(
									function (n) {
										if (((n.reorderMode = !1), e)) n.focus = [].concat(o(t.reorder.focus));
										else {
											var i = t.focusIndex;
											n.apps[i].renderProps.orderStyle.order = t.calcOrder(i);
										}
										return n;
									},
									function () {
										t.reorder = {};
									}
								);
							},
						},
						{
							key: "saveOrderAndExit",
							value: function () {
								b.default.setAppsOrder(
									[]
										.concat(o(this.state.apps))
										.sort(function (e, t) {
											return e.renderProps.orderStyle.order - t.renderProps.orderStyle.order;
										})
										.map(function (e) {
											return e.manifest.name;
										})
								),
									j.eventLogger.log({
										type: j.EVENT_TYPES.APP_POSITION,
										starting_position: this.reorder.indexFrom,
										end_position: this.reorder.indexTo,
										app_id: this.reorder.app.manifestURL,
										app_version: this.reorder.app.manifest.version,
									}),
									this.exitReorderMode(!0);
							},
						},
						{
							key: "handleMoveGrid",
							value: function (e) {
								var t = this,
									n = P.rowColToIndex(e, this.state.col),
									i = this.focusIndex > n ? -1 : 1;
								(this.reorder.focus = e),
									(this.reorder.indexTo = n),
									this.setState(function (e) {
										return (e.apps[t.focusIndex].renderProps.orderStyle.order = t.calcOrder(n, i)), e;
									});
							},
						},
						{
							key: "switchViewMode",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "grid",
									t = "grid" === e ? this.props.col : 1,
									n = P.rowColToIndex(this.state.focus, this.state.col);
								(this.currentPage = null), this.setState({ focus: P.indexToRowCol(n, t), col: t, viewMode: e }), P.asyncLocalStorage.setItem("app-view-mode", e);
							},
						},
						{
							key: "navItem",
							value: function (e) {
								var t = this;
								this.navItemTimer ||
									((this.navItemTimer = setTimeout(function () {
										window.clearTimeout(t.navItemTimer), (t.navItemTimer = null);
									}, this.navItemThrottleTime)),
									this.state.reorderMode ? this.handleMoveGrid(e) : this.setState({ focus: e }));
							},
						},
						{
							key: "onKeyDown",
							value: function (e) {
								var t = this,
									n = this.state.reorderMode,
									i = void 0,
									a = e.key;
								switch (a) {
									case "ArrowLeft":
									case "ArrowRight":
										if ("grid" !== this.state.viewMode) return;
									case "ArrowUp":
									case "ArrowDown":
										if (!this.isAnimationEnd) return void e.preventDefault();
										var o = n ? this.reorder.focus || this.state.focus : this.state.focus;
										(i = P.navGrid({ currentRowCol: o, dir: a, col: this.state.col, total: this.state.apps.length })), this.navItem(i);
										break;
									case "Call":
										C.default.launch("manifestURL", "app://communications.gaiamobile.org/manifest.webapp");
										break;
									case "SoftRight":
										if (!n) {
											var r = this.state.apps[this.focusIndex],
												s = this.menuOptions.filter(function (e) {
													switch (e.id) {
														case "uninstall":
															return "mozapp" === r.type && r.mozApp.removable;
														case "unpin":
														case "rename":
															return "bookmark" === r.type;
														default:
															return !!e.tags && e.tags.includes(t.state.viewMode);
													}
												});
											S.default.request("showOptionMenu", { options: s });
										}
										break;
									case "SoftLeft":
										n && this.exitReorderMode();
										break;
									case "Enter":
										n ? this.saveOrderAndExit() : e.target.click();
										break;
									case "EndCall":
									case "BrowserBack":
									case "Backspace":
										n ? this.exitReorderMode() : (this.setState({ focus: this.initFocus }), S.default.request("closeSheet", "appList"));
								}
								i && (e.stopPropagation(), e.preventDefault());
							},
						},
						{
							key: "appHandler",
							value: function (e) {
								var t = this;
								return e
									.filter(function (e) {
										return !e.shouldHide();
									})
									.sort(function (e, t) {
										return e.order - t.order;
									})
									.map(function (e, n) {
										return (e.renderProps = { orderStyle: { order: t.calcOrder(n) }, iconStyle: { color: e.theme, backgroundImage: "url('" + e.icon_url + "')" } }), e;
									});
							},
						},
						{
							key: "renderPagination",
							value: function () {
								var e = void 0,
									t = this.getPage(this.state.reorderMode ? this.reorder.focus[0] : this.state.focus[0]);
								if (this.state.pageLength > 1) {
									var n = Array(this.state.pageLength)
										.fill()
										.map(function (e, n) {
											var i = n === t ? "page-indicator active" : "page-indicator";
											return p.default.createElement("div", { key: "page-indicator--" + n, className: i });
										});
									e = p.default.createElement("div", { className: "pagination" }, n);
								}
								return e;
							},
						},
						{
							key: "calcOrder",
							value: function (e) {
								return 1e3 * (e + 1 + 0.5 * (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0));
							},
						},
						{
							key: "render",
							value: function () {
								var e = this,
									t = "grid" === this.state.viewMode ? this.renderPagination() : null,
									n = this.state.apps.map(function (e) {
										return p.default.createElement(l, f({ key: e.manifestURL }, e));
									}),
									i = ["appList", this.state.reorderMode ? "is-reordering" : ""].filter(Boolean).join(" ");
								return p.default.createElement(
									"div",
									{
										className: i,
										"data-view-mode": this.state.viewMode,
										tabIndex: "-1",
										onKeyDown: this.onKeyDown,
										onFocus: this.onFocus,
										ref: function (t) {
											e.element = t;
										},
									},
									t,
									p.default.createElement("h1", { className: "readout-only", id: "all-apps", "data-l10n-id": "all-apps" }),
									p.default.createElement(
										"div",
										{
											className: "appList__container",
											role: "heading",
											"aria-labelledby": "all-apps",
											ref: function (t) {
												return (e._container = t);
											},
										},
										p.default.createElement("div", { className: "app-wall" }, n)
									)
								);
							},
						},
					]),
					t
				);
			})(m.default);
		(x.defaultProps = { viewMode: "grid", col: 3, row: 3 }),
			(x.propTypes = { viewMode: p.default.PropTypes.string, col: p.default.PropTypes.number, row: p.default.PropTypes.number }),
			(t.default = (0, g.default)(x, "immediate", "immediate"));
	},
	201: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e) {
			if (Array.isArray(e)) {
				for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
				return n;
			}
			return Array.from(e);
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
		Object.defineProperty(t, "__esModule", { value: !0 });
		var u = (function () {
				function e(e, t) {
					var n = [],
						i = !0,
						a = !1,
						o = void 0;
					try {
						for (var r, s = e[Symbol.iterator](); !(i = (r = s.next()).done) && (n.push(r.value), !t || n.length !== t); i = !0);
					} catch (u) {
						(a = !0), (o = u);
					} finally {
						try {
							!i && s.return && s.return();
						} finally {
							if (a) throw o;
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
			l =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
					}
					return e;
				},
			c = (function () {
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
			f = n(3),
			d = i(f),
			p = n(6),
			h = i(p),
			m = n(5),
			v = i(m),
			g = n(19),
			y = i(g);
		n(226), n(227);
		var b = (function (e) {
			function t(e) {
				o(this, t);
				var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (
					(n.name = "Clock"),
					(n.initState = {
						datetime: "",
						timeForReadout: "",
						date: "",
						weekday: "",
						h1: "0",
						h2: "0",
						m1: "0",
						m2: "0",
						ampm: "",
						visible: "true" === localStorage.getItem("home.clock.visible"),
					}),
					(n.state = l({}, n.initState)),
					navigator.mozL10n.ready(function () {
						null === navigator.mozHour12 && (navigator.mozHour12 = "true" === localStorage.getItem("locale.hour12")), n.refresh();
					}),
					(n.digiKey = 0),
					(n.digiIcons = function () {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "bold",
							t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
						return (
							(n.digiKey += 1),
							[].concat(a(Array(t))).map(function (t, i) {
								return d.default.createElement("i", { key: "key_" + i + "_" + e + "_" + n.digiKey, "data-icon": "numeric_" + i + "_" + e, "aria-hidden": "true" });
							})
						);
					}),
					(n.iconsHtml = { bold: n.digiIcons("rounded_semibold"), light: n.digiIcons("light") }),
					n
				);
			}
			return (
				s(t, e),
				c(t, [
					{ key: "focus", value: function () {} },
					{
						key: "componentWillMount",
						value: function () {
							y.default.addObserver("home.clock.visible", this), y.default.addObserver("locale.hour12", this);
						},
					},
					{
						key: "componentDidMount",
						value: function () {
							v.default.register("start", this), v.default.register("stop", this), v.default.register("forcedRefresh", this), window.addEventListener("moztimechange", this);
						},
					},
					{
						key: "_handle_moztimechange",
						value: function () {
							this.stop(), this.start();
						},
					},
					{
						key: "_handle_timeformatchange",
						value: function () {
							this.refresh();
						},
					},
					{
						key: "_handle_visibilitychange",
						value: function () {
							"visible" === document.visibilityState ? this.start() : this.stop();
						},
					},
					{
						key: "start",
						value: function () {
							var e = this,
								t = new Date();
							this.refresh(),
								(this.timer = setTimeout(function () {
									e.start();
								}, 1e3 * (60 - t.getSeconds())));
						},
					},
					{
						key: "refresh",
						value: function (e) {
							var t = this;
							(this.state.visible || e) &&
								navigator.mozL10n.ready(function () {
									var e = new Date(),
										n = "%a, %e %b";
									navigator.language.startsWith("zh") ? (n = "%-m月%e日 %a") : navigator.language.startsWith("ko") && (n = "%-m월%e일 %a");
									var i = (navigator.mozL10n.language.code, navigator.mozHour12 ? "%I" : "%H"),
										a = new navigator.mozL10n.DateTimeFormat(),
										o = a.localeFormat(e, n + " | %p | " + i + " | %M"),
										r = o.split(" | "),
										s = u(r, 4),
										l = s[0],
										c = s[1],
										f = s[2],
										d = s[3];
									(f = ("00" + f).slice(-2).split("")),
										(d = d.split("")),
										t.setState({
											datetime: a.localeFormat(e, "%Y-%m-%dT%T"),
											timeForReadout: a.localeFormat(e, "homescreen %I:%M " + (navigator.mozHour12 ? "%p" : "") + ", %A %B %e"),
											date: l,
											h1: f[0],
											h2: f[1],
											m1: d[0],
											m2: d[1],
											ampm: c,
										});
								});
						},
					},
					{
						key: "forcedRefresh",
						value: function () {
							this.refresh(!0);
						},
					},
					{
						key: "_observe_locale.hour12",
						value: function (e) {
							localStorage.setItem("locale.hour12", e);
						},
					},
					{
						key: "_observe_home.clock.visible",
						value: function (e) {
							localStorage.setItem("home.clock.visible", e),
								this.setState({ visible: e }),
								this.stop(),
								e
									? (this.start(),
									  window.addEventListener("moztimechange", this),
									  window.addEventListener("timeformatchange", this),
									  window.addEventListener("visibilitychange", this))
									: (window.removeEventListener("moztimechange", this), window.removeEventListener("timeformatchange", this), window.removeEventListener("visibilitychange", this));
						},
					},
					{
						key: "stop",
						value: function () {
							clearInterval(this.timer), (this.timer = null);
						},
					},
					{
						key: "render",
						value: function () {
							return this.state.visible
								? d.default.createElement(
										"time",
										{ className: "ClockComponent", dateTime: this.state.datetime, role: "menuitem", "aria-label": this.state.timeForReadout },
										d.default.createElement(
											"div",
											{ className: "clock-upper" },
											d.default.createElement(
												"bdi",
												{ className: "clockDigi-container" },
												d.default.createElement(
													"span",
													{ className: "hour clockDigi-box" },
													d.default.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.h1 }, this.iconsHtml.bold),
													d.default.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.h2 }, this.iconsHtml.bold)
												),
												d.default.createElement("div", { className: "clock-colon" }),
												d.default.createElement(
													"span",
													{ className: "minute clockDigi-box" },
													d.default.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.m1 }, this.iconsHtml.bold),
													d.default.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.m2 }, this.iconsHtml.bold)
												)
											),
											d.default.createElement("div", { className: "clock-ampm primary", "data-hour-24": !navigator.mozHour12 }, this.state.ampm)
										),
										d.default.createElement("hr", { className: "clock-divider" }),
										d.default.createElement("div", { className: "date primary" }, this.state.date)
								  )
								: null;
						},
					},
				]),
				t
			);
		})(h.default);
		t.default = b;
	},
	203: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		Object.defineProperty(t, "__esModule", { value: !0 });
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
			l = n(3),
			c = a(l),
			f = n(5),
			d = a(f),
			p = n(6),
			h = a(p),
			m = n(26),
			v = a(m),
			g = n(204),
			y = a(g),
			b = n(205),
			w = a(b),
			k = n(13),
			_ = i(k),
			S = n(64),
			O = a(S),
			E = n(105),
			I = a(E);
		n(228), n(231);
		var P = (function (e) {
			function t(e) {
				o(this, t);
				var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (
					(n.name = "Dialer"),
					(n.ready = !1),
					(n.toggleStayEffect = function () {
						var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
						n.parentBox.classList.toggle("with-dialer-stay-effect", e);
					}),
					(n.initState = { dialerState: null, matchedContact: null, telNum: "", suggestions: [] }),
					(n.state = Object.assign({}, n.initState)),
					O.default.on("mmiloading", n.showLoading.bind(n)),
					O.default.on("mmiloaded", n.showAlert.bind(n)),
					O.default.on("ussd-received", n.onUssdReceived.bind(n)),
					(n.children = {}),
					["onKeyDown", "call", "hide", "updateTelNum", "focusInput"].forEach(function (e) {
						n[e] = n[e].bind(n);
					}),
					(n.timer = null),
					d.default.register("show", n),
					d.default.register("hide", n),
					d.default.register("toggleStayEffect", n),
					d.default.register("resetCallingMarker", n),
					d.default.registerState("ready", n),
					d.default.registerState("isShown", n),
					d.default.registerState("isCalling", n),
					n
				);
			}
			return (
				s(t, e),
				u(t, [
					{
						key: "componentDidMount",
						value: function () {
							var e = this;
							I.default.on("contact-changed", function () {
								e.isShown && e.getSuggestions(e.state.telNum);
							}),
								this.updateTelTypes(),
								(this.parentBox = this.element.parentElement.parentElement),
								this.parentBox.addEventListener("animationend", function () {
									e.toggleStayEffect();
								}),
								(this.ready = !0);
						},
					},
					{
						key: "onUssdReceived",
						value: function (e) {
							if ((O.default.mmiloading && d.default.request("hideDialog"), !e.message))
								return void d.default.request("showDialog", { type: "alert", header: "Error USSD case!", content: JSON.stringify(e), translated: !0, noClose: !1 });
							var t = navigator.mozMobileConnections[e.serviceId || 0].voice.network,
								n = t ? t.shortName || t.longName : "";
							d.default.request("showDialog", { type: "alert", header: n, content: e.message.replace(/\\r\\n|\\r|\\n/g, "\n"), translated: !0, noClose: !1 });
						},
					},
					{
						key: "show",
						value: function (e) {
							this.isShown ||
								(this.isHidden() &&
									(this.updateTelTypes(),
									d.default.request("openSheet", "dialer"),
									(this.isShown = !0),
									this.element.focus(),
									e && (this.focusInput(), this.children.dialerInput.sendFirstChar(e))));
						},
					},
					{
						key: "hide",
						value: function () {
							this.isHidden() || d.default.request("closeSheet", "dialer"),
								(this.isShown = !1),
								(this.children.dialerInput.element.style.fontSize = ""),
								this.setState(this.initState),
								this.children.dialerInput.setState({ telNum: "" });
						},
					},
					{
						key: "updateTelTypes",
						value: function () {
							var e = this;
							navigator.mozL10n.ready(function () {
								e.telTypes = ["personal", "mobile", "home", "work", "fax-home", "fax-office", "fax-other"].reduce(function (e, t) {
									return (e[t] = _.toL10n(t)), e;
								}, {});
							});
						},
					},
					{
						key: "isHidden",
						value: function () {
							for (var e = this.element; e !== document.body && !e.classList.contains("hidden") && "closed" !== e.dataset.transitionState; ) e = e.parentElement;
							return e.classList.contains("hidden") || "closed" === e.dataset.transitionState;
						},
					},
					{
						key: "updateTelNum",
						value: function (e) {
							var t = this,
								n = { telNum: e };
							e.length < 2 && ((n.matchedContact = this.initState.matchedContact), (n.suggestions = this.initState.suggestions)),
								this.setState(n, function () {
									0 === e.length ? t.hide() : O.default.instantDialIfNecessary(e) && (t.children.dialerInput.exitDialer(), O.default.dial(e)),
										e.length >= 4 &&
											(clearTimeout(t.timer),
											(t.timer = setTimeout(function () {
												t.getSuggestions(e);
											}, 500)));
								});
						},
					},
					{
						key: "focusInput",
						value: function () {
							this.stopRenderSteply(), this.children.dialerInput.element.focus();
						},
					},
					{
						key: "focusSuggestions",
						value: function () {
							var e = this;
							this.state.suggestions.length &&
								(this.children.dialerSuggestions.initFocus(),
								this.allSuggestions.keyword ||
									setTimeout(function () {
										e.renderSteply();
									}, 0));
						},
					},
					{
						key: "renderSteply",
						value: function () {
							var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10,
								t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
								n = this.state.suggestions.length;
							if (this.allSuggestions.length <= n) return void this.stopRenderSteply();
							var i = this.allSuggestions.slice(0, n + e);
							(i.keyword = this.state.telNum), this.setState({ suggestions: i }), (this.suggestionRenderTimer = setTimeout(this.renderSteply.bind(this), t));
						},
					},
					{
						key: "stopRenderSteply",
						value: function () {
							this.suggestionRenderTimer && (window.clearTimeout(this.suggestionRenderTimer), (this.suggestionRenderTimer = null));
						},
					},
					{
						key: "call",
						value: function () {
							var e = this,
								t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
								n = t.number,
								i = void 0 === n ? this.state.telNum : n,
								a = t.isVideo,
								o = void 0 !== a && a;
							return this.isCalling
								? void d.default.request("showDialog", {
										ok: "skip",
										cancel: "cancel",
										type: "confirm",
										content: "otherConnectionInUseMessage",
										onOk: function () {
											d.default.request("Dialer:resetCallingMarker");
										},
								  })
								: ((this.isCalling = !0),
								  this.stopRenderSteply(),
								  void O.default
										.dial(i, o)
										.then(function () {
											(e.isCalling = !1), d.default.request("Dialer:hide"), d.default.request("hideDialog");
										})
										.catch(function () {
											e.isCalling = !1;
										}));
						},
					},
					{
						key: "getSuggestions",
						value: function (e) {
							O.default.isValid(e) && _.contactNumFilter({ telNum: e }).then(this.filterSuggestions.bind(this, e));
						},
					},
					{
						key: "filterSuggestions",
						value: function (e, t) {
							var n = this,
								i = void 0,
								a = t
									.reduce(function (t, a) {
										return t.concat(
											a.tel.map(function (t) {
												var o = { id: a.id, name: a.name && a.name[0], type: n.getL10nFromTelTypes(t.type[0] || "mobile"), number: t.value };
												return i || t.value !== e || (i = o), o;
											})
										);
									}, [])
									.filter(function (e) {
										return -1 !== e.number.indexOf(n.state.telNum);
									});
							(this.allSuggestions = a), this.renderSuggestions(a.slice(0, 5), i, e);
						},
					},
					{
						key: "renderSuggestions",
						value: function (e, t, n) {
							var i = this;
							n === this.state.telNum &&
								((e.keyword = n),
								this.setState({ matchedContact: t, suggestions: e }, function () {
									i.children.dialerSuggestions.element.scrollTo(0, 0);
								}));
						},
					},
					{
						key: "onKeyDown",
						value: function (e) {
							var t = e.key;
							switch ((e.stopPropagation(), t)) {
								case "EndCall":
									this.hide();
									break;
								case "ArrowDown":
									this.focusSuggestions();
							}
						},
					},
					{
						key: "getMatchedContactInfo",
						value: function () {
							var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.matchedContact,
								t = void 0;
							return e && (t = [e.name, e.type].filter(Boolean).join(", ")), t;
						},
					},
					{
						key: "showAlert",
						value: function (e, t) {
							this.resetCallingMarker(),
								d.default.request("Dialer:hide"),
								(e || t) &&
									d.default.request("showDialog", {
										type: "custom",
										header: e,
										content: _.toL10n(t),
										buttons: [{ message: "" }, { message: "ok" }, { message: "" }],
										translated: !0,
										noClose: !1,
									});
						},
					},
					{
						key: "resetCallingMarker",
						value: function () {
							this.isCalling = !1;
						},
					},
					{
						key: "showLoading",
						value: function () {
							d.default.request("Dialer:hide").then(function () {
								d.default.request("showDialog", {
									type: "custom",
									content: "sending",
									buttons: [{ message: "" }, { message: "ok" }, { message: "" }],
									otherClass: "is-loading",
									noClose: !1,
								});
							});
						},
					},
					{
						key: "getL10nFromTelTypes",
						value: function (e) {
							return this.telTypes[e] || e;
						},
					},
					{
						key: "render",
						value: function () {
							var e = this;
							return c.default.createElement(
								"div",
								{
									className: "dialerBox",
									tabIndex: "-1",
									onKeyDown: this.onKeyDown,
									ref: function (t) {
										e.element = t;
									},
								},
								c.default.createElement(
									"div",
									{ className: "dialer-header" },
									c.default.createElement("div", { className: "dialer-state text-thi" }, this.state.dialerState),
									c.default.createElement(y.default, {
										ref: function (t) {
											e.children.dialerInput = t;
										},
										dial: this.call,
										exitDialer: this.hide,
										updateTelNum: this.updateTelNum,
									}),
									c.default.createElement("div", { className: "dialer-info text-thi" }, this.getMatchedContactInfo())
								),
								c.default.createElement(w.default, {
									ref: function (t) {
										e.children.dialerSuggestions = t;
									},
									suggestions: this.state.suggestions,
									exitSuggestions: this.focusInput,
									dial: this.call,
								})
							);
						},
					},
				]),
				t
			);
		})(h.default);
		t.default = (0, v.default)(P, "immediate", "immediate");
	},
	204: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		Object.defineProperty(t, "__esModule", { value: !0 });
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
			l = n(3),
			c = a(l),
			f = n(6),
			d = a(f),
			p = n(5),
			h = a(p),
			m = n(16),
			v = a(m),
			g = n(19),
			y = a(g),
			b = n(128),
			w = a(b),
			k = n(13),
			_ = i(k),
			S = n(110),
			O = a(S),
			E = n(65),
			I = a(E),
			P = n(42),
			T = a(P),
			M = (function (e) {
				function t(e) {
					o(this, t);
					var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (
						(n.name = "DialerInput"),
						(n.SPECIAL_CHARS = ["*", "+", ","]),
						(n.telNum = ""),
						(n.fontStyles = ""),
						(n.isVTSupported = !1),
						LazyLoader.load(["shared/js/dialer/tone_player.js"], function () {
							TonePlayer.init("normal"),
								(TonePlayer.gTonesFrequencies = {
									1: [697, 1209],
									2: [697, 1336],
									3: [697, 1477],
									A: [697, 1633],
									4: [770, 1209],
									5: [770, 1336],
									6: [770, 1477],
									B: [770, 1633],
									7: [852, 1209],
									8: [852, 1336],
									9: [852, 1477],
									C: [852, 1633],
									"*": [941, 1209],
									0: [941, 1336],
									"#": [941, 1477],
									D: [941, 1633],
									",": [941, 1209],
									"+": [941, 1336],
								});
						}),
						(n.specialCharsCount = n.SPECIAL_CHARS.length),
						(n.onKeyPress = n.onKeyPress.bind(n)),
						(n.onKeyDown = n.onKeyDown.bind(n)),
						(n.onKeyUp = n.onKeyUp.bind(n)),
						(n.onInput = n.onInput.bind(n)),
						n
					);
				}
				return (
					s(t, e),
					u(t, [
						{
							key: "componentDidMount",
							value: function () {
								this.element.setAttribute("x-inputmode", "native"),
									y.default.addObserver("phone.ring.keypad", this),
									this.updateSoftKeys(),
									this.getFontStyles(),
									this.getVTSupportability();
							},
						},
						{
							key: "componentDidUpdate",
							value: function () {
								this.updateSoftKeys();
							},
						},
						{
							key: "updateSoftKeys",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { left: "contacts", center: "call", right: "options" };
								if (navigator.mozMobileConnections && navigator.mozMobileConnections.length > 1 && !I.default.isAlwaysAsk()) {
									e.center = { text: "call", icon: "" };
									var t = SIMSlotManager.isMultiSIM() && !SIMSlotManager.hasOnlyOneSIMCardDetected(),
										n = void 0 !== I.default.cardIndex;
									t && n && (e.center.icon = "sim-" + (I.default.cardIndex + 1));
								}
								v.default.register(e, this.element);
							},
						},
						{
							key: "onInput",
							value: function () {
								var e = this.element.value;
								this.props.updateTelNum(e), (this.telNum = e), this.updateFontSize(e), "" === e && this.exitDialer();
							},
						},
						{
							key: "onKeyPress",
							value: function (e) {
								e.preventDefault();
							},
						},
						{
							key: "onKeyUp",
							value: function (e) {
								var t = O.default.translate(e.key);
								"Backspace" === t && this.clearLongpressDeleteTimer(), "0" === t && (window.clearTimeout(this.longpressSpecialChar), (this.longpressSpecialChar = null));
							},
						},
						{
							key: "onKeyDown",
							value: function (e) {
								var t = this,
									n = O.default.translate(e.key);
								if (!this.longpressDeleteTimer && (!h.default.query("Dialer.isCalling") || ("Call" === n && "Enter" === n)))
									switch (n) {
										case "1":
										case "2":
										case "3":
										case "4":
										case "5":
										case "6":
										case "7":
										case "8":
										case "9":
										case "0":
										case "#":
										case "+":
										case "*":
											if (
												(e.stopPropagation && e.stopPropagation(),
												"0" === n &&
													void 0 !== e.target &&
													_.isLandscape &&
													(window.clearTimeout(this.longpressSpecialChar),
													(this.longpressSpecialChar = setTimeout(function () {
														var e = t.SPECIAL_CHARS[2],
															n = t.element.selectionStart,
															i = t.element.value;
														t.replaceLeftChar(e, n, i), t.playKeyTone(e);
													}, 1e3))),
												!_.isLandscape && "*" === n && -1 !== this.SPECIAL_CHARS.indexOf(this.lastKeyinChar) && this.getNowTime() - this.lastInputTime < 1e3)
											) {
												var i = this.element,
													a = i.selectionStart,
													o = i.value,
													r = o[a - 1],
													s = this.SPECIAL_CHARS.indexOf(r);
												(this.element.value = o.slice(0, a - 1) + o.slice(a)),
													this.element.setSelectionRange(a - 1, a - 1),
													(n = this.SPECIAL_CHARS[(s + 1) % this.specialCharsCount]);
											}
											e.preventDefault && e.preventDefault(),
												this.insertKeyAtCaret(n),
												this.playKeyTone(n),
												(this.lastKeyinChar = n),
												(this.lastInputTime = this.getNowTime()),
												this.onInput();
											break;
										case "Backspace":
											e.stopPropagation(), (this.longpressDeleteTimer = setTimeout(this.longpressDelete.bind(this), 1e3));
											break;
										case "EndCall":
											e.stopPropagation(), this.deleteAllText();
											break;
										case "SoftLeft":
											e.stopPropagation(), T.default.launch("manifestURL", "app://contact.gaiamobile.org/manifest.webapp");
											break;
										case "SoftRight":
											e.stopPropagation(), this.handleTelNumber();
											break;
										case "Enter":
										case "Call":
											e.preventDefault(), e.stopPropagation(), this.props.dial({ number: this.telNum });
											break;
										case "ArrowDown":
										case "ArrowUp":
											e.preventDefault();
											break;
										case "ArrowLeft":
										case "ArrowRight":
											this.lastKeyinChar = null;
											break;
										default:
											e.stopPropagation(), e.preventDefault();
									}
							},
						},
						{
							key: "_observe_phone.ring.keypad",
							value: function (e) {
								this._keypadSoundIsEnabled = e;
							},
						},
						{
							key: "insertKeyAtCaret",
							value: function (e) {
								var t = this.element.selectionEnd,
									n = this.element.value;
								(this.element.value = n.substr(0, t) + e + n.substr(t)), (this.element.selectionEnd = t + 1);
							},
						},
						{
							key: "sendFirstChar",
							value: function (e) {
								(this.element.value = ""), this.onKeyDown({ key: e }), this.getFontStyles();
							},
						},
						{
							key: "getNowTime",
							value: function () {
								return +new Date();
							},
						},
						{
							key: "replaceLeftChar",
							value: function (e, t, n) {
								var i = t - 1;
								(this.element.value = n.substr(0, i) + e + n.substr(i + e.length)), this.element.setSelectionRange(t, t);
							},
						},
						{
							key: "clearLongpressDeleteTimer",
							value: function () {
								window.clearTimeout(this.longpressDeleteTimer), (this.longpressDeleteTimer = null);
							},
						},
						{
							key: "longpressDelete",
							value: function () {
								this.clearLongpressDeleteTimer(), this.deleteAllText();
							},
						},
						{
							key: "deleteAllText",
							value: function () {
								(this.element.value = ""), this.onInput();
							},
						},
						{
							key: "playKeyTone",
							value: function (e) {
								this._keypadSoundIsEnabled && TonePlayer.start(TonePlayer.gTonesFrequencies[e], !0);
							},
						},
						{
							key: "handleTelNumber",
							value: function () {
								var e = this,
									t = [
										{
											id: "add-to-existing-contact",
											callback: function () {
												_.sendNumberToContact({ name: "update", telNum: e.telNum });
											},
										},
										{
											id: "create-new-contact",
											callback: function () {
												_.sendNumberToContact({ name: "new", telNum: e.telNum });
											},
										},
									];
								h.default.request("showOptionMenu", {
									options: t,
									onCancel: function () {
										return e.element.focus();
									},
								});
							},
						},
						{
							key: "getFontStyles",
							value: function () {
								var e = this;
								this.fontStyles = (function () {
									var t = window.getComputedStyle(e.element);
									return t
										? ["font-style", "font-weight", "font-size", "font-family"]
												.map(function (e) {
													return t[e];
												})
												.join(" ")
										: "";
								})();
							},
						},
						{
							key: "updateFontSize",
							value: function (e) {
								this.offsetWidth || (this.offsetWidth = this.element.offsetWidth);
								var t = this.element.style.fontSize,
									n = (0, w.default)({ text: e, font: this.fontStyles, space: this.offsetWidth, min: 22, max: 30 }).fontSize + "px";
								t !== n && (this.element.style.fontSize = n);
							},
						},
						{
							key: "getVTSupportability",
							value: function () {
								var e = this;
								navigator.hasFeature &&
									navigator.hasFeature("device.capability.vilte").then(function (t) {
										e.isVTSupported = t;
									});
							},
						},
						{
							key: "exitDialer",
							value: function () {
								this.clearLongpressDeleteTimer(), this.props.exitDialer();
							},
						},
						{
							key: "render",
							value: function () {
								var e = this;
								return c.default.createElement("input", {
									tabIndex: "-1",
									className: "dialer-input",
									dir: "ltr",
									onKeyPress: this.onKeyPress,
									onKeyDown: this.onKeyDown,
									onKeyUp: this.onKeyUp,
									onInput: this.onInput,
									ref: function (t) {
										e.element = t;
									},
								});
							},
						},
					]),
					t
				);
			})(d.default);
		(M.defaultProps = { dial: null, exitDialer: null, updateTelNum: null }),
			(M.propTypes = { dial: c.default.PropTypes.func, exitDialer: c.default.PropTypes.func, updateTelNum: c.default.PropTypes.func }),
			(t.default = M);
	},
	205: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(3),
			l = i(u),
			c = n(6),
			f = i(c),
			d = n(5),
			p = i(d),
			h = n(16),
			m = i(h),
			v = n(62),
			g = i(v),
			y = n(65),
			b = i(y),
			w = (function (e) {
				function t(e) {
					a(this, t);
					var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.name = "DialerSuggestions"), (n.onKeyDown = n.onKeyDown.bind(n)), n;
				}
				return (
					r(t, e),
					s(t, [
						{
							key: "componentDidMount",
							value: function () {
								(this.suggestionNavigator = new g.default(".dialer-focusable", this.element)), this.updateSoftKeys(), this.getVTSupportability();
							},
						},
						{
							key: "componentDidUpdate",
							value: function () {
								this.updateSoftKeys();
							},
						},
						{
							key: "updateSoftKeys",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { left: "", center: "call", right: this.isVTSupported ? "options" : "" };
								if (navigator.mozMobileConnections && navigator.mozMobileConnections.length > 1 && !b.default.isAlwaysAsk()) {
									e.center = { text: "call", icon: "" };
									var t = SIMSlotManager.isMultiSIM() && !SIMSlotManager.hasOnlyOneSIMCardDetected(),
										n = void 0 !== b.default.cardIndex;
									t && n && (e.center.icon = "sim-" + (b.default.cardIndex + 1));
								}
								m.default.register(e, this.element);
							},
						},
						{
							key: "getVTSupportability",
							value: function () {
								var e = this;
								navigator.hasFeature &&
									navigator.hasFeature("device.capability.vilte").then(function (t) {
										e.isVTSupported = t;
									});
							},
						},
						{
							key: "handleOption",
							value: function () {
								var e = this;
								if (this.isVTSupported) {
									var t = document.activeElement,
										n = [
											{
												id: "video-call",
												callback: function () {
													t.focus(), e.props.dial({ number: e.getFocusedSuggestion().number, isVideo: !0 });
												},
											},
										];
									p.default.request("showOptionMenu", {
										options: n,
										onCancel: function () {
											return e.element.focus();
										},
									});
								}
							},
						},
						{
							key: "onKeyDown",
							value: function (e) {
								if (!p.default.query("Dialer.isCalling"))
									switch (e.key) {
										case "SoftRight":
											e.stopPropagation();
											break;
										case "Backspace":
											e.stopPropagation(), e.preventDefault(), this.props.exitSuggestions();
											break;
										case "Enter":
										case "Call":
											e.stopPropagation(), this.props.dial({ number: this.getFocusedSuggestion().number });
									}
							},
						},
						{
							key: "getFocusedSuggestion",
							value: function () {
								var e = this.suggestionNavigator,
									t = e._candidates.indexOf(e._currentFocus);
								return this.props.suggestions[t];
							},
						},
						{
							key: "initFocus",
							value: function () {
								var e = this;
								setTimeout(function () {
									var t = e.element.querySelector(".dialer-focusable");
									t.focus(), e.suggestionNavigator.setFocus(t);
								}, 0);
							},
						},
						{
							key: "formatMatchedNum",
							value: function (e) {
								var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.props.suggestions.keyword,
									n = e.indexOf(t);
								if (-1 !== n) {
									var i = e.slice(0, n),
										a = e.slice(n + t.length);
									return l.default.createElement("span", {
										dir: "ltr",
										className: "dialerSuggestion__telNum",
										dangerouslySetInnerHTML: { __html: i + "<mark>" + t + "</mark>" + a },
									});
								}
							},
						},
						{
							key: "suggestionsHtml",
							value: function e() {
								var t = this;
								return this.props.suggestions.map(function (e, n) {
									return l.default.createElement(
										"li",
										{ key: "suggestions-" + n, className: "dialer-focusable", tabIndex: "-1" },
										l.default.createElement(
											"div",
											{ className: "dialerSuggestion" },
											l.default.createElement("div", { className: "dialerSuggestion__header text-pri" }, e.name),
											l.default.createElement("div", { className: "dialerSuggestion__detail text-sec" }, e.type, " ", t.formatMatchedNum(e.number))
										)
									);
								});
							},
						},
						{
							key: "render",
							value: function () {
								var e = this;
								return l.default.createElement(
									"ul",
									{
										className: "dialerSuggestions",
										onKeyDown: this.onKeyDown,
										ref: function (t) {
											e.element = t;
										},
									},
									this.suggestionsHtml()
								);
							},
						},
					]),
					t
				);
			})(f.default);
		(w.defaultProps = { dial: null, exitSuggestions: null, suggestions: null }),
			(w.propTypes = { dial: l.default.PropTypes.func, exitSuggestions: l.default.PropTypes.func, suggestions: l.default.PropTypes.arrayOf(l.default.PropTypes.object) }),
			(t.default = w);
	},
	206: function (e, t) {
		"use strict";
		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var i = (function () {
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
			a = (t.EVENT_TYPES = { APP_POSITION: "app_position" }),
			o = "eventlogger_event",
			r = (function () {
				function e() {
					n(this, e), (this.dataStore = null);
				}
				return (
					i(e, [
						{
							key: "log",
							value: function (e) {
								if (e && e.type)
									switch (e.type) {
										case a.APP_POSITION:
											this.write({
												event_type: a.APP_POSITION,
												starting_position: e.starting_position,
												end_position: e.end_position,
												app_id: e.app_id,
												app_version: e.app_version,
											});
									}
							},
						},
						{
							key: "write",
							value: function (e) {
								return this.getStore().then(function (t) {
									return t.add(e);
								});
							},
						},
						{
							key: "getStore",
							value: function () {
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
							},
						},
					]),
					e
				);
			})();
		t.eventLogger = new r();
	},
	207: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		Object.defineProperty(t, "__esModule", { value: !0 });
		var u = n(30),
			l = a(u),
			c = n(13),
			f = i(c),
			d = (function (e) {
				function t(e) {
					o(this, t);
					var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.name = "GridHelper"), f.isLandscape ? (n.grid = { row: 2, col: 4 }) : (n.grid = { row: 3, col: 3 }), n.emit("change", n.grid), n;
				}
				return s(t, e), t;
			})(l.default);
		t.default = new d();
	},
	208: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		function u(e) {
			var t = [O, e.isActive ? "is-active" : null, e.isShortcut ? "is-shortcut" : null].filter(Boolean).join(" ");
			return f.default.createElement(
				"div",
				{ key: e.name, className: "instantSettings__tile" },
				f.default.createElement(
					"button",
					{ className: t, "aria-label": e.name, "data-icon": e.icon, "data-inactived-icon": e.iconInactived },
					f.default.createElement(
						"div",
						{ className: "instantSettings__info" },
						f.default.createElement("div", { className: "instantSettings__title", "data-l10n-id": e.title }),
						f.default.createElement("div", { className: "instantSettings__subtitle" }, S.toL10n(e.subtitle, e.subtitleArgs))
					)
				)
			);
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var l = (function () {
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
			c = n(3),
			f = a(c),
			d = n(6),
			p = a(d),
			h = n(26),
			m = a(h),
			v = n(16),
			g = a(v),
			y = n(5),
			b = a(y),
			w = n(209),
			k = a(w),
			_ = n(13),
			S = i(_);
		n(223);
		var O = "instantSettings__icon",
			E = (function (e) {
				function t(e) {
					o(this, t);
					var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (
						(n.name = "InstantSettings"),
						(n.initIndex = 0),
						(n.state = { settings: k.default.settings, focusIndex: n.initIndex }),
						(n.onKeyDown = n.onKeyDown.bind(n)),
						(n.onFocus = n.onFocus.bind(n)),
						(n.setRef = n.setRef.bind(n)),
						n
					);
				}
				return (
					s(t, e),
					l(t, [
						{
							key: "componentDidMount",
							value: function () {
								(this.icons = this.element.getElementsByClassName(O)), this.updateSettings(), k.default.on("change", this.updateSettings.bind(this));
							},
						},
						{
							key: "componentDidUpdate",
							value: function () {
								this.focusIfPossible(), this.updateSoftKey();
							},
						},
						{
							key: "updateSoftKey",
							value: function () {
								var e = this.state.focusIndex,
									t = this.state.settings[e];
								g.default.register({ left: "", center: t.isDisabled ? "" : "select", right: "" }, this.element);
							},
						},
						{
							key: "updateSettings",
							value: function () {
								this.setState(function (e) {
									return (
										(e.settings = k.default.settings.filter(function (e) {
											return !e.removed;
										})),
										e
									);
								});
							},
						},
						{
							key: "onKeyDown",
							value: function (e) {
								e.preventDefault(), e.stopPropagation();
								var t = e.key,
									n = this.state.focusIndex;
								if (k.default.volumeManagerTimer) return void k.default.click("volume", t);
								switch (t) {
									case "ArrowUp":
									case "ArrowDown":
									case "ArrowLeft":
									case "ArrowRight":
										this.handleNavGrid(n, t);
										break;
									case "Enter":
										this.onCSK(n);
										break;
									case "EndCall":
									case "Backspace":
										this.exit();
								}
							},
						},
						{
							key: "onFocus",
							value: function (e) {
								e.target === this.element &&
									((this.state.focusIndex = this.initIndex), this.focusIfPossible(), k.default.addSimCardObserver(), window.addEventListener("visibilitychange", this));
							},
						},
						{
							key: "_handle_visibilitychange",
							value: function () {
								this.exit();
							},
						},
						{
							key: "onCSK",
							value: function () {
								var e = this.state.settings[this.state.focusIndex];
								if (!e.isDisabled) {
									"launch" === k.default.click(e.name) && this.exit();
								}
							},
						},
						{
							key: "handleNavGrid",
							value: function (e, t) {
								var n = this.state.col,
									i = S.navGrid({ currentRowCol: S.indexToRowCol(e, n), dir: t, col: n, total: this.state.settings.length }),
									a = S.rowColToIndex(i, n);
								a !== e && this.setState({ focusIndex: a });
							},
						},
						{
							key: "navGrid",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
									t = e.currentIndex,
									n = void 0 === t ? this.initIndex : t,
									i = e.dir,
									a = e.col,
									o = void 0 === a ? this.props.col : a,
									r = e.total,
									s = this.props.col - 1,
									u = this.props.row - 1,
									l = [n % o, Math.floor(n / o)],
									c = l[0],
									f = l[1],
									d = S.isRtl(),
									p = d ? -1 : 1;
								switch (i) {
									case "ArrowRight":
										c = S.clamp(c + p, 0, s);
										break;
									case "ArrowLeft":
										c = S.clamp(c - p, 0, s);
										break;
									case "ArrowUp":
										f = S.clamp(f - 1, 0, u);
										break;
									case "ArrowDown":
										f += 1;
								}
								var h = f * o + c;
								return "ArrowDown" === i && h >= r ? -1 : S.clamp(h, 0, r - 1);
							},
						},
						{
							key: "exit",
							value: function () {
								k.default.removeSimCardObserver(), b.default.request("closeSheet", "instantSettings"), window.removeEventListener("visibilitychange", this);
							},
						},
						{
							key: "isHidden",
							value: function () {
								return !this.element.offsetParent;
							},
						},
						{
							key: "focusIfPossible",
							value: function () {
								if (this.element && !this.isHidden()) {
									var e = this.element;
									this.icons && (e = this.icons[this.state.focusIndex] || this.icons[this.initIndex]), e.focus();
								}
							},
						},
						{
							key: "setRef",
							value: function (e) {
								this.element = e;
							},
						},
						{
							key: "render",
							value: function () {
								return f.default.createElement(
									"section",
									{
										className: "instantSettings",
										tabIndex: "-1",
										role: "heading",
										"aria-labelledby": "instantSettings-title",
										onKeyDown: this.onKeyDown,
										onFocus: this.onFocus,
										ref: this.setRef,
									},
									f.default.createElement("div", { className: "readout-only", id: "instantSettings-title", "data-l10n-id": "instant-settings" }),
									f.default.createElement(
										"main",
										{ className: "instantSettings__wall" },
										this.state &&
											this.state.settings &&
											this.state.settings.map(function (e) {
												return u(e);
											})
									)
								);
							},
						},
					]),
					t
				);
			})(p.default);
		(E.defaultProps = { col: 3, row: 3 }),
			(E.propTypes = { col: f.default.PropTypes.number, row: f.default.PropTypes.number }),
			(t.default = (0, m.default)(E, "immediate", "immediate"));
	},
	209: function (e, t, n) {
		"use strict";
		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return (t.default = e), t;
		}
		function a(e) {
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
		Object.defineProperty(t, "__esModule", { value: !0 });
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
			l = n(14),
			c = a(l),
			f = n(19),
			d = a(f),
			p = n(104),
			h = a(p),
			m = n(109),
			v = a(m),
			g = n(42),
			y = a(g),
			b = n(13),
			w = i(b),
			k = (function (e) {
				function t() {
					o(this, t);
					var e = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return (
						(e.name = "InstantSettingsStore"),
						(e.oriSettings = [
							{
								name: "volume",
								icon: "sound-max",
								isShortcut: !0,
								title: "volume",
								order: { portrait: 1, landscape: 1 },
								click: function (t) {
									return e.volumeManagerTimer
										? void (("ArrowUp" !== t && "ArrowDown" !== t) || (e.enterVolumeManagerMode(), navigator.volumeManager["request" + t.slice(5)]()))
										: (e.enterVolumeManagerMode(), void navigator.volumeManager.requestShow());
								},
							},
							{
								name: "brightness",
								icon: "brightness",
								isShortcut: !0,
								title: "brightness",
								subtitle: "percentage-number",
								order: { portrait: 2, landscape: 2 },
								cskType: "toggle",
								click: e.toggleBrightness.bind(e),
							},
							{
								name: "flashlight",
								icon: "flashlight-on",
								iconInactived: "flashlight-off",
								title: "flashlight",
								removed: !0,
								order: { portrait: 4, landscape: 3 },
								cskType: "toggle",
								click: v.default.toggle.bind(v.default),
							},
							{
								name: "camera",
								icon: "camera",
								isShortcut: !0,
								title: "camera",
								order: { portrait: 7, landscape: 6 },
								cskType: "launch",
								click: function () {
									y.default.launch("manifestURL", "app://camera.gaiamobile.org/manifest.webapp");
								},
							},
							{
								name: "calculator",
								icon: "calculator",
								isShortcut: !0,
								title: "calculator",
								order: { portrait: 5, landscape: -1 },
								cskType: "launch",
								click: function () {
									y.default.launch("manifestURL", "app://calculator.gaiamobile.org/manifest.webapp");
								},
							},
							{
								name: "airplane-mode",
								icon: "airplane-mode",
								iconInactived: "airplane-mode-off",
								title: "airplane-mode",
								observerSetting: "airplaneMode.enabled",
								order: { portrait: 8, landscape: 7 },
								cskType: "toggle",
							},
							{
								name: "wifi",
								icon: "wifi-32px",
								iconInactived: "wifi-off-32px",
								title: "wifi",
								observerSetting: "wifi.enabled",
								removed: !0,
								order: { portrait: 0, landscape: 0 },
								cskType: "toggle",
							},
							{
								name: "network",
								icon: "network-activity",
								iconInactived: "network-activity-off",
								title: "cellular-data",
								observerSetting: "ril.data.enabled",
								order: { portrait: 3, landscape: 4 },
								cskType: "toggle",
							},
							{
								name: "bluetooth",
								icon: "bluetooth-32px",
								iconInactived: "bluetooth-off-32px",
								title: "bluetooth",
								removed: !0,
								observerSetting: "bluetooth.enabled",
								order: { portrait: 6, landscape: 5 },
								cskType: "toggle",
							},
						]),
						(e.brightnessMap = { 100: 0.1, 10: 0.4, 40: 0.7, 70: 1 }),
						(e.orderType = w.isLandscape ? "landscape" : "portrait"),
						e
					);
				}
				return (
					s(t, e),
					u(t, [
						{
							key: "start",
							value: function () {
								var e = this,
									t = this.orderType;
								(this.settings = this.oriSettings
									.filter(function (e) {
										return -1 !== e.order[t];
									})
									.sort(function (e, n) {
										return e.order[t] - n.order[t];
									})),
									this.settings.forEach(function (t) {
										t.observerSetting && !t.removed && e.initSettingObserver(t);
									}),
									this.initSettingObserverForBrightness(),
									d.default.addObserver("airplaneMode.status", this),
									navigator.hasFeature &&
										navigator.hasFeature("device.capability.torch").then(function (t) {
											if (t) {
												(e.getSetting("flashlight").removed = !1), v.default.on("ready", e.updateFlashlightState.bind(e)), v.default.on("change", e.updateFlashlightState.bind(e));
											}
										}),
									navigator.hasFeature &&
										navigator.hasFeature("device.capability.bt").then(function (t) {
											if (t) {
												navigator.mozBluetooth.defaultAdapter ||
													(navigator.mozBluetooth.onattributechanged = function (e) {
														e.attrs.includes("defaultAdapter") && (navigator.mozBluetooth.onattributechanged = null);
													});
												var n = e.getSetting("bluetooth");
												(n.removed = !1), e.initSettingObserver(n);
											}
										}),
									navigator.hasFeature &&
										navigator.hasFeature("device.capability.wifi").then(function (t) {
											if (t) {
												var n = e.getSetting("wifi");
												(n.removed = !1), e.initSettingObserver(n);
											}
										}),
									this.emit("change");
							},
						},
						{
							key: "initSettingObserver",
							value: function (e) {
								var t = this;
								d.default.addObserver(e.observerSetting, this),
									(this["_observe_" + e.observerSetting] = function (n) {
										var i = t.getSetting(e.name);
										(i.isActive = n), !0 === n ? (i.subtitle = "on") : !1 === n ? (i.subtitle = "off") : (i.subtitle = n.toString()), t.emit("change");
									});
							},
						},
						{
							key: "initSettingObserverForBrightness",
							value: function () {
								var e = this;
								d.default.addObserver("screen.brightness", this),
									(this["_observe_screen.brightness"] = function (t) {
										(e.getSetting("brightness").subtitleArgs = { number: 100 * t }), e.emit("change");
									});
							},
						},
						{
							key: "_observe_airplaneMode.status",
							value: function (e) {
								var t = "enabling" === e || "disabling" === e;
								(this.getSetting("airplane-mode").isDisabled = t), this.emit("change");
							},
						},
						{
							key: "updateFlashlightState",
							value: function () {
								dump("cck updateFlashlightState entry");
								var e = this.getSetting("flashlight"),
									t = v.default.flashlightManager.flashlightEnabled;
								dump("cck updateFlashlightState _flashlightEnabled=" + t), (e.isActive = t), (e.subtitle = t ? "on" : "off"), this.emit("change");
							},
						},
						{
							key: "checkSimCardState",
							value: function () {
								var e = h.default.noSIMCardOnDevice() || h.default.noSIMCardConnectedToNetwork(),
									t =
										-1 !==
										h.default
											.getSlots()
											.map(function (e) {
												return e.conn.voice.state;
											})
											.indexOf("searching"),
									n = this.getSetting("network"),
									i = this.getSetting("airplane-mode");
								(n.isDisabled = i.isActive || e), !t && e && n.isActive && this.toggleSetting(n), this.emit("change");
							},
						},
						{
							key: "addSimCardObserver",
							value: function () {
								var e = this;
								if (!this.isSimCardObserverAdded) {
									(this.isSimCardObserverAdded = !0), this.checkSimCardState();
									var t = window.navigator.mozMobileConnections;
									t &&
										Array.from(t).forEach(function (t) {
											t.addEventListener("voicechange", e);
										}, this);
								}
							},
						},
						{
							key: "removeSimCardObserver",
							value: function () {
								var e = this;
								this.isSimCardObserverAdded = !1;
								var t = window.navigator.mozMobileConnections;
								t &&
									Array.from(t).forEach(function (t) {
										t.removeEventListener("voicechange", e);
									}, this);
							},
						},
						{
							key: "_handle_voicechange",
							value: function () {
								this.checkSimCardState();
							},
						},
						{
							key: "getIndex",
							value: function (e) {
								var t = this.settings.findIndex(function (t) {
									return t.name === e;
								});
								return t;
							},
						},
						{
							key: "getSetting",
							value: function (e) {
								var t = this.settings.find(function (t) {
									return t.name === e;
								});
								return t;
							},
						},
						{
							key: "toggleSetting",
							value: function (e) {
								var t = this;
								(e.isDisabled = !0), this.emit("change");
								var n = function () {
									(e.isDisabled = !1), t.emit("change");
								};
								d.default.get(e.observerSetting).then(function (t) {
									var i = {};
									(i[e.observerSetting] = !t),
										d.default.set(i).then(function () {
											switch (e.name) {
												case "airplane-mode":
													break;
												case "bluetooth":
													w.toggleBletooth(t ? "disable" : "enable").then(
														function () {
															return n();
														},
														function (e) {
															n();
														}
													);
													break;
												default:
													n();
											}
										});
								});
							},
						},
						{
							key: "toggleBrightness",
							value: function () {
								var e = this.getSetting("brightness").subtitleArgs.number;
								d.default.set({ "screen.brightness": this.brightnessMap[e] || 0.1 });
							},
						},
						{
							key: "enterVolumeManagerMode",
							value: function () {
								var e = this;
								this.volumeManagerTimer && this.exitVolumeManagerMode(),
									(this.volumeManagerTimer = setTimeout(function () {
										e.exitVolumeManagerMode();
									}, 2e3));
							},
						},
						{
							key: "exitVolumeManagerMode",
							value: function () {
								window.clearTimeout(this.volumeManagerTimer), (this.volumeManagerTimer = null);
							},
						},
						{
							key: "click",
							value: function (e, t) {
								var n = this.getSetting(e);
								if (n && !n.isDisabled)
									if ("toggle" === n.cskType && n.observerSetting) this.toggleSetting(n);
									else if (n.click) return n.click(t), n.cskType;
							},
						},
					]),
					t
				);
			})(c.default),
			_ = new k();
		_.start(), (t.default = _);
	},
	210: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(3),
			l = i(u),
			c = n(6),
			f = i(c),
			d = n(16),
			p = i(d),
			h = n(201),
			m = i(h),
			v = n(214),
			g = i(v),
			y = n(5),
			b = i(y),
			w = n(63),
			k = i(w),
			_ = n(109),
			S = i(_),
			O = n(42),
			E = i(O),
			I = n(41),
			P = i(I);
		n(230);
		var T = (function (e) {
			function t(e) {
				a(this, t);
				var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (
					(n.name = "MainView"),
					(n.onKeyDown = function (e) {
						if (((n.mcc = P.default.getDataMcc()), (n.simmcc = P.default.getSimmcc()), !b.default.query("LaunchStore.isLaunching") && b.default.query("AppList.ready"))) {
							var t = e.key;
							if (!n._longPressTimer) {
								switch (t) {
									case "Call":
										return void E.default.launch("manifestURL", "app://communications.gaiamobile.org/manifest.webapp");
									case "SoftLeft":
										return void E.default.launch("iac", "notice");
									case "Enter":
										n.simmcc
											? ("460" !== n.simmcc && "250" !== n.simmcc) || b.default.request("openSheet", "appList")
											: ("460" !== n.mcc && "250" !== n.mcc) || b.default.request("openSheet", "appList");
										break;
									case "SoftRight":
										return void b.default.request("openSheet", "instantSettings");
								}
								n._longPressTimer = setTimeout(function () {
									switch ((n.clearLongPressTimer(), (n._longPressActionTriggered = !0), t)) {
										case "ArrowUp":
											S.default.toggle();
											break;
										case "Enter":
											n.simmcc
												? "460" !== n.simmcc &&
												  "250" !== n.simmcc &&
												  P.default.apps.some(function (e) {
														"Assistant" === e.manifest.name && e.launch();
												  })
												: "460" !== n.mcc &&
												  "250" !== n.mcc &&
												  P.default.apps.some(function (e) {
														"Assistant" === e.manifest.name && e.launch();
												  });
											break;
										default:
											n._longPressActionTriggered = !1;
									}
								}, n.longPressDuration);
							}
						}
					}),
					(n.onKeyUp = function (e) {
						var t = e.key;
						if (n._longPressTimer && !b.default.query("LaunchStore.isLaunching") && b.default.query("AppList.ready")) {
							if ((n.clearLongPressTimer(), n._longPressActionTriggered)) return void (n._longPressActionTriggered = !1);
							switch (t) {
								case "Backspace":
									E.default.isLaunching && (E.default.isLaunching = !1);
									break;
								case "Enter":
									b.default.request("openSheet", "appList");
							}
						}
					}),
					(n.longPressDuration = 1500),
					(n.onKeyDown = n.onKeyDown.bind(n)),
					(n.onKeyUp = n.onKeyUp.bind(n)),
					window.addEventListener("visibilitychange", function () {
						document.hidden && (n._longPressActionTriggered = !1);
					}),
					n
				);
			}
			return (
				r(t, e),
				s(t, [
					{
						key: "componentDidMount",
						value: function () {
							b.default.register("show", this),
								b.default.register("hide", this),
								p.default.register({ left: "notifications", center: "icon=all-apps", right: "shortcuts" }, this.element),
								k.default.register(this.element);
						},
					},
					{
						key: "clearLongPressTimer",
						value: function () {
							this._longPressTimer && (clearTimeout(this._longPressTimer), (this._longPressTimer = null));
						},
					},
					{
						key: "show",
						value: function () {
							this.element.classList.remove("hidden"), this.focus();
						},
					},
					{
						key: "hide",
						value: function () {
							this.element.classList.add("hidden");
						},
					},
					{
						key: "focus",
						value: function () {
							this.element.focus();
						},
					},
					{
						key: "render",
						value: function () {
							var e = this;
							return l.default.createElement(
								"div",
								{
									id: "main-view",
									tabIndex: "-1",
									onKeyDown: this.onKeyDown,
									onKeyUp: this.onKeyUp,
									ref: function (t) {
										e.element = t;
									},
								},
								l.default.createElement(g.default, null),
								l.default.createElement(m.default, null)
							);
						},
					},
				]),
				t
			);
		})(f.default);
		(T.defaultProps = { open: null, close: null }), (T.propTypes = { open: l.default.PropTypes.func, close: l.default.PropTypes.func }), (t.default = T);
	},
	211: function (e, t) {
		"use strict";
		function n(e) {
			var t = this,
				n = t[e],
				o = navigator.mozL10n.language.code || "",
				r = t.default_locale || "";
			return (
				o in navigator.mozL10n.qps && ("name" === e || "description" === e || "short_name" === e)
					? (n = navigator.mozL10n.qps[navigator.language].translate(n))
					: t.locales &&
					  [o, o.substr(0, o.indexOf("-")), r, r.substr(0, o.indexOf("-"))].some(function (t) {
							return !(!this[t] || !this[t][e]) && ((n = this[t][e]), !0);
					  }, t.locales),
				"object" !== ("undefined" == typeof n ? "undefined" : a(n)) || n instanceof Array || (n = new i(n)),
				n
			);
		}
		function i(e) {
			for (var t in e) Object.defineProperty(this, t, { get: n.bind(e, t), enumerable: !0 });
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var a =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (e) {
						return typeof e;
				  }
				: function (e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				  };
		Object.defineProperty(i.prototype, "displayName", {
			get: function () {
				return this.short_name || this.name;
			},
		}),
			(t.default = i);
	},
	212: function (e, t) {
		"use strict";
		function n(e) {
			return "A";
		}
		function i(e) {
			return e >= 0 && e < 32 ? e + 64 : e >= 32 && e < 96 ? e - 32 : e;
		}
		function a(e, t) {
			var n = [
					212222, 222122, 222221, 121223, 121322, 131222, 122213, 122312, 132212, 221213, 221312, 231212, 112232, 122132, 122231, 113222, 123122, 123221, 223211, 221132, 221231,
					213212, 223112, 312131, 311222, 321122, 321221, 312212, 322112, 322211, 212123, 212321, 232121, 111323, 131123, 131321, 112313, 132113, 132311, 211313, 231113, 231311,
					112133, 112331, 132131, 113123, 113321, 133121, 313121, 211331, 231131, 213113, 213311, 213131, 311123, 311321, 331121, 312113, 312311, 332111, 314111, 221411, 431111,
					111224, 111422, 121124, 121421, 141122, 141221, 112214, 112412, 122114, 122411, 142112, 142211, 241211, 221114, 413111, 241112, 134111, 111242, 121142, 121241, 114212,
					124112, 124211, 411212, 421112, 421211, 212141, 214121, 412121, 111143, 111341, 131141, 114113, 114311, 411113, 411311, 113141, 114131, 311141, 411131, 211412, 211214,
					211232, 23311120,
				],
				a = 106,
				o = [];
			(o.add = function (e) {
				var t = n[e];
				0 === this.length ? (this.check = e) : (this.check = this.check + e * this.length), this.push(t || "UNDEFINED:" + e + "->" + t);
			}),
				o.add(38 + t.charCodeAt(0));
			for (var r = 0; r < e.length; r++) {
				var s = e.charCodeAt(r),
					u = i(s);
				if (isNaN(u) || u < 0 || u > 106) throw new Error("Unrecognized character (" + s + ") at position " + r + " in code '" + e + "'.");
				o.add(u);
			}
			return o.push(n[o.check % 103], n[a]), o;
		}
		function o(e) {
			for (var t = [], n = 0; n < e.length; n += 2) t.push('<div class="bar' + e.charAt(n) + " space" + e.charAt(n + 1) + '"></div>');
			return t.join("");
		}
		function r(e, t) {
			return arguments.length < 2 && (t = n(e)), o(a(e, t).join(""));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = { code128: r };
		t.default = s;
	},
	213: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e) {
			if (Array.isArray(e)) {
				for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
				return n;
			}
			return Array.from(e);
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
		Object.defineProperty(t, "__esModule", { value: !0 });
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
			l = n(3),
			c = i(l),
			f = n(6),
			d = i(f),
			p = n(26),
			h = i(p),
			m = n(16),
			v = i(m),
			g = n(5),
			y = i(g),
			b = n(212),
			w = i(b);
		n(232);
		var k = (function (e) {
			function t(e) {
				o(this, t);
				var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				(n.name = "QRFace"),
					(n.initFocus = [0, 0]),
					(n.state = { focus: n.initFocus }),
					y.default.register("show", n),
					y.default.register("hide", n),
					y.default.register("isShown", n),
					(n.onFocus = n.onFocus.bind(n)),
					(n.onKeyDown = n.onKeyDown.bind(n));
				var i = [].concat(a(navigator.mozMobileConnections)).map(function (e, t) {
					return e.getDeviceIdentities().then(function (e) {
						if (e.imei) return e.imei;
						var n = "Could not retrieve the " + "imei".toUpperCase() + " code for SIM " + t;
						return Promise.reject(new Error(n));
					});
				});
				return (
					Promise.all(i).then(function (e) {
						2 == e.length
							? ((document.getElementById("qrtitleone").innerHTML = "imei".toUpperCase() + " number"),
							  (document.getElementById("qrnumberone").innerHTML = e[0]),
							  (document.getElementById("qrimageone").innerHTML = w.default.code128(e[0], "A")),
							  document.getElementById("qrtitleone").classList.add("titleqrone"),
							  (document.getElementById("qrtitletwo").innerHTML = "imei".toUpperCase() + " number"),
							  (document.getElementById("qrnumbertwo").innerHTML = e[1]),
							  (document.getElementById("qrimagetwo").innerHTML = w.default.code128(e[1], "A")),
							  document.getElementById("qrtitletwo").classList.add("titleqrtwo"))
							: (document.getElementById("qrtitleone").classList.add("hidden"),
							  document.getElementById("qrnumberone").classList.add("hidden"),
							  document.getElementById("qrimageone").classList.add("hidden"),
							  (document.getElementById("qrtitletwo").innerHTML = "imei".toUpperCase() + " number"),
							  (document.getElementById("qrnumbertwo").innerHTML = e[0]),
							  (document.getElementById("qrimagetwo").innerHTML = w.default.code128(e[0], "A")),
							  document.getElementById("qrtitletwo").classList.add("titleqr"));
					}),
					n
				);
			}
			return (
				s(t, e),
				u(t, [
					{
						key: "componentDidMount",
						value: function () {
							y.default.register("show", this),
								y.default.register("hide", this),
								y.default.register("isShown", this),
								this.updateSoftKeys(),
								(this.onFocus = this.onFocus.bind(this)),
								(this.onKeyDown = this.onKeyDown.bind(this));
						},
					},
					{
						key: "onFocus",
						value: function () {
							return this.element === document.activeElement ? void this.updateSoftKeys() : (this.element.focus(), void this.updateSoftKeys());
						},
					},
					{
						key: "focusIfPossible",
						value: function () {
							!this.element.contains(document.activeElement);
						},
					},
					{
						key: "updateSoftKeys",
						value: function () {
							var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { left: "", center: "ok", right: "" };
							v.default.register(e, this.element);
						},
					},
					{
						key: "onKeyDown",
						value: function (e) {
							switch (e.key) {
								case "EndCall":
								case "BrowserBack":
								case "Backspace":
								case "Enter":
									e.stopPropagation(), e.preventDefault(), this.hide();
									break;
								case "1":
								case "2":
								case "3":
								case "4":
								case "5":
								case "6":
								case "7":
								case "8":
								case "9":
								case "0":
								case "*":
								case "#":
									e.stopPropagation(), e.preventDefault();
							}
						},
					},
					{
						key: "changeMyState",
						value: function () {
							this.setState({ focus: [0, 2] });
						},
					},
					{
						key: "show",
						value: function () {
							return y.default.query("QRFace.isShown", this)
								? void this.focus()
								: void (this.isHidden() && (y.default.request("openSheet", "qrface"), (this.isShown = !0), this.element.focus()));
						},
					},
					{
						key: "isHidden",
						value: function () {
							for (var e = this.element; e !== document.body && !e.classList.contains("hidden") && "closed" !== e.dataset.transitionState; ) e = e.parentElement;
							return e.classList.contains("hidden") || "closed" === e.dataset.transitionState;
						},
					},
					{
						key: "hide",
						value: function () {
							y.default.request("closeSheet", "qrface"), (this.isShown = !1);
						},
					},
					{
						key: "focus",
						value: function () {
							this.element.focus();
						},
					},
					{
						key: "render",
						value: function () {
							var e = this;
							return c.default.createElement(
								"div",
								{
									tabIndex: "-1",
									className: "qrcode-input",
									onFocus: this.onFocus,
									onKeyDown: this.onKeyDown,
									ref: function (t) {
										e.element = t;
									},
								},
								c.default.createElement("div", { id: "qrtitleone" }),
								c.default.createElement("div", { className: "numberqr", id: "qrnumberone" }),
								c.default.createElement("div", { className: "container" }, c.default.createElement("div", { className: "barcode", id: "qrimageone" })),
								c.default.createElement("div", { id: "qrtitletwo" }),
								c.default.createElement("div", { className: "numberqr", id: "qrnumbertwo" }),
								c.default.createElement("div", { className: "container" }, c.default.createElement("div", { className: "barcode", id: "qrimagetwo" }))
							);
						},
					},
				]),
				t
			);
		})(d.default);
		t.default = (0, h.default)(k, "immediate", "immediate");
	},
	214: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(3),
			l = i(u),
			c = n(11),
			f = (i(c), n(6)),
			d = i(f),
			p = n(19),
			h = i(p);
		n(233);
		var m = (function (e) {
			function t(e) {
				a(this, t);
				var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (n.name = "SimcardInfo"), (n.DEBUG = !1), (n.state = { isAirplaneMode: !1, cardInfos: [] }), n;
			}
			return (
				r(t, e),
				s(t, [
					{
						key: "componentDidMount",
						value: function () {
							this._initCardInfos(), h.default.addObserver("airplaneMode.enabled", this), h.default.addObserver("custom.lockscreen.ui", this);
						},
					},
					{
						key: "_observe_airplaneMode.enabled",
						value: function (e) {
							this.setState({ isAirplaneMode: e });
						},
					},
					{
						key: "_observe_custom.lockscreen.ui",
						value: function (e) {
							(this._cuzVal = e), dump("launcher simcard_info.js observe setting value = " + e), this._updateCardInfos();
						},
					},
					{
						key: "_initCardInfos",
						value: function () {
							var e = this,
								t = navigator.mozMobileConnections;
							if (t) {
								Array.from(t).forEach(function (t, n) {
									t.addEventListener("datachange", e), t.addEventListener("voicechange", e), t.addEventListener("signalstrengthchange", e);
								}),
									h.default.get("custom.lockscreen.ui").then(function (t) {
										dump("launcher simcard_info.js get setting value = " + t), (e._cuzVal = t), e._updateCardInfos();
									});
								var n = this;
								navigator.customization.getValue("lockscreen.simcard.searching").then(function (e) {
									dump("launcher simcard_info getcustomvalue = " + e), (n._showSearching = e), n._updateCardInfos();
								});
							}
						},
					},
					{
						key: "_auEmergencyState",
						value: function (e) {
							var t = navigator.mozMobileConnections[e].iccId,
								n = navigator.mozIccManager.getIccById(t);
							if (
								(dump("simcard_info.js icc.cardState: " + (n && n.cardState)),
								(null == n || "permanentBlocked" === n.cardState || "pinRequired" === n.cardState || "pukRequired" === n.cardState) &&
									navigator.mozMobileConnections[e].voice.network.mcc)
							) {
								if ("505" == navigator.mozMobileConnections[e].voice.network.mcc) return null == n ? "noSim" : n.cardState;
							}
							return "";
						},
					},
					{
						key: "_customOperatorNameAccordingLanguage",
						value: function (e, t) {
							var n, i, a;
							return (
								e &&
									e.voice &&
									e.voice.network &&
									e.voice.connected &&
									((n = e.voice.network.mcc),
									(i = e.voice.network.mnc),
									"460" != n || ("00" != i && "04" != i && "07" != i && "08" != i)
										? "460" != n || ("01" != i && "09" != i)
											? "460" != n || ("03" != i && "11" != i)
												? "466" == n && "97" == i
													? ((a = "zh-CN" == t ? "台湾大哥大" : "zh-TW" == t || "zh-HK" == t ? "臺灣大哥大" : e.voice.network.longName), (a = this._apt_in_twm(a, t, e.iccId)))
													: (a =
															"466" == n && "01" == i
																? "zh-CN" == t
																	? "远传电信"
																	: "zh-TW" == t || "zh-HK" == t
																	? "遠傳電信"
																	: e.voice.network.longName
																: "466" == n && "92" == i
																? "zh-CN" == t
																	? "中华电信"
																	: "zh-TW" == t || "zh-HK" == t
																	? "中華電信"
																	: e.voice.network.longName
																: "466" == n && "89" == i
																? "zh-CN" == t
																	? "台湾之星"
																	: "zh-TW" == t || "zh-HK" == t
																	? "臺灣之星"
																	: e.voice.network.longName
																: "466" == n && "05" == i
																? "zh-CN" == t
																	? "亚太电信"
																	: "zh-TW" == t || "zh-HK" == t
																	? "亞太電信"
																	: e.voice.network.longName
																: e.voice.network.longName)
												: (a = "zh-CN" == t || "zh-TW" == t || "zh-HK" == t ? "中国电信" : e.voice.network.longName)
											: (a = "zh-CN" == t || "zh-TW" == t || "zh-HK" == t ? "中国联通" : e.voice.network.longName)
										: (a = "zh-CN" == t || "zh-TW" == t || "zh-HK" == t ? "中国移动" : e.voice.network.longName)),
								a
							);
						},
					},
					{
						key: "_updateCardInfosImpl",
						value: function (e) {
							var t = this,
								n = navigator.mozMobileConnections;
							if (n) {
								var i = [];
								Array.from(n).forEach(function (n, a) {
									var o = !n.iccId,
										r = 0,
										s = !1;
									o || (r = n.signalStrength ? n.signalStrength.level + 1 || 0 : Math.ceil(n.voice.relSignalStrength / 20) || 0), 0 == r && (s = !0);
									var u = void 0,
										l = void 0;
									dump("launcher simcard_info.js _cuzVal = " + t._cuzVal + ", index = " + a);
									var c = !(!navigator.mozTelephony || !navigator.mozTelephony.active),
										f = n.voice && n.voice.connected,
										d = n.data && n.data.connected,
										p = t._auEmergencyState(a);
									1 === t._cuzVal
										? o
											? null === n.voice.state
												? ((u = "noSimCard"), dump("launcher simcard_info.js noSimCard"))
												: ((u = "eccOnly"), dump("launcher simcard_info.js noSimCard but eccOnly"))
											: null === n.voice.state || s
											? ((u = "noService"), dump("launcher simcard_info.js SIM in but noService"))
											: f || d || (c && navigator.mozTelephony.active.serviceId === a)
											? n.voice.network && n.voice.network.longName
												? (l = n.voice.network.longName)
												: ((u = "emergencyCallsOnly"), dump("launcher simcard_info.js SIM in but emergencyCallsOnly"))
											: ((r = 0),
											  "searching" === n.voice.state
													? ((u = "searching"), dump("launcher simcard_info.js SIM in but searching"))
													: n.voice.emergencyCallsOnly
													? ((u = "emergencyCallsOnly"), dump("launcher simcard_info.js SIM in emergencyCallsOnly"))
													: ((u = "noService"), dump("launcher simcard_info.js SIM in but not searching, noService")))
										: 2 === t._cuzVal || p
										? o
											? ((u = "nocard-eccOnly"), dump("AU launcher simcard_info.js noSimCard but eccOnly"))
											: null === n.voice.state || s
											? ((u = "noService"), dump("AU launcher simcard_info.js SIM in but noService"))
											: f || d || (c && navigator.mozTelephony.active.serviceId === a)
											? n.voice.network && n.voice.network.longName
												? (l = n.voice.network.longName)
												: ((u = "unusablecard-eccOnly"), dump("AU launcher simcard_info.js SIM in but emergencyCallsOnly"))
											: ((r = 0),
											  "searching" === n.voice.state
													? ((u = "unusablecard-eccOnly"), dump("AU launcher simcard_info.js SIM in but searching"))
													: n.voice.emergencyCallsOnly
													? ((u = "unusablecard-eccOnly"), dump("AU launcher simcard_info.js SIM in emergencyCallsOnly"))
													: ((u = "noService"), dump("AU launcher simcard_info.js SIM in but not searching, noService")))
										: o && "registered" !== n.voice.state
										? (u = "noSimCard")
										: "searching" === n.voice.state
										? t._showSearching && (u = "searching")
										: n.voice.emergencyCallsOnly
										? (u = "noService")
										: n.voice.connected && n.voice.network
										? (l = n.voice.network.longName)
										: (u = "noService"),
										(l = t._customOperatorNameAccordingLanguage(n, e));
									var h = navigator.mozMobileConnections[a].iccId,
										m = navigator.mozIccManager.getIccById(h);
									p || !m || ("pinRequired" !== m.cardState && "pukRequired" !== m.cardState) || (u = "lockedSim"),
										dump("launcher simcard_info.js index = " + a + ", signalLevel = " + r + ", carrierName = " + l + ", stateL10nId = " + u),
										i.push({ signalLevel: r, carrierName: l, stateL10nId: u });
								}),
									this.setState({ cardInfos: i });
							}
						},
					},
					{
						key: "_apt_in_twm",
						value: function (e, t, n) {
							var i = navigator.mozIccManager.getIccById(n),
								a = i.iccInfo.mcc,
								o = i.iccInfo.mnc;
							return (
								dump("launcher _apt_in_twn simmcc=" + a + ",simmnc=" + o),
								"466" == a && "05" == o && (e = "zh-CN" == t ? "亚太电信" : "zh-TW" == t || "zh-HK" == t ? "亞太電信" : "APT"),
								e
							);
						},
					},
					{
						key: "_updateCardInfos",
						value: function () {
							var e = this,
								t = navigator.mozSettings.createLock().get("language.current");
							t.onsuccess = function () {
								var n = t.result["language.current"];
								e._updateCardInfosImpl(n);
							};
						},
					},
					{
						key: "_getCustomizationVal",
						value: function (e) {
							dump("launcher simcard_info.js type = " + e + ", _cuzVal = " + this._cuzVal), this._updateCardInfos();
						},
					},
					{
						key: "_handle_voicechange",
						value: function (e) {
							this._getCustomizationVal("voice");
						},
					},
					{
						key: "_handle_datachange",
						value: function (e) {
							this._getCustomizationVal("data");
						},
					},
					{
						key: "_handle_signalstrengthchange",
						value: function (e) {
							this._getCustomizationVal("signal");
						},
					},
					{
						key: "render",
						value: function () {
							var e = SIMSlotManager.isMultiSIM(),
								t = this.state.cardInfos.map(function (t, n) {
									var i = e
											? l.default.createElement(
													"div",
													{ className: "icon-wrapper" },
													l.default.createElement(
														"div",
														{ className: "icon inactive", "data-icon": "sim-" + (n + 1) },
														l.default.createElement("div", { className: "icon", "data-icon": "signal-0" })
													)
											  )
											: l.default.createElement("div", { className: "icon-wrapper" }, l.default.createElement("div", { className: "icon inactive", "data-icon": "no-sim" })),
										a = l.default.createElement(
											"div",
											{ className: "icon-wrapper", "data-is-searching": "searching" === t.stateL10nId },
											l.default.createElement("div", { className: "icon level", "data-icon": "signal-" + t.signalLevel }),
											l.default.createElement("div", { className: "icon bg", "data-icon": "signal-5" })
										),
										o = navigator.mozL10n.get(t.stateL10nId).length > 25,
										r = SIMSlotManager.isSIMCardAbsent(n) ? "text inactive" : "text";
									return (
										o ? (r += " needscroll") : "",
										l.default.createElement(
											"div",
											{ className: "info-row", key: n },
											["noSimCard", "lockedSim", "eccOnly", "nocard-eccOnly"].includes(t.stateL10nId) ? i : a,
											l.default.createElement(
												"div",
												{ className: "carrier-name secondary" },
												l.default.createElement("span", { className: r, "data-l10n-id": t.stateL10nId }, t.carrierName)
											)
										)
									);
								}),
								n = l.default.createElement("div", { className: "airplane-mode-info", "data-l10n-id": "airplane-mode" });
							return l.default.createElement("div", { id: "simcard-info", "data-is-airplane-mode": this.state.isAirplaneMode }, t, n);
						},
					},
				]),
				t
			);
		})(d.default);
		t.default = m;
	},
	215: function (e, t, n) {
		"use strict";
		function i(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
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
			u = n(6),
			l = i(u),
			c = n(105),
			f = i(c),
			d = n(19),
			p = i(d),
			h = (function (e) {
				function t() {
					var e, n, i, r;
					a(this, t);
					for (var s = arguments.length, u = Array(s), l = 0; l < s; l++) u[l] = arguments[l];
					return (
						(n = i = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(u)))),
						(i.SIZE = 9),
						(i.contacts = []),
						(i.voicemailNumber = null),
						(r = n),
						o(i, r)
					);
				}
				return (
					r(t, e),
					s(t, [
						{
							key: "start",
							value: function () {
								this.fetch(),
									this.getCustomSpeedDials(),
									p.default.addObserver("ril.iccInfo.mbdn", this),
									navigator.mozContacts.addEventListener("speeddialchange", this.fetch.bind(this)),
									navigator.mozContacts.addEventListener("contactchange", this.fetch.bind(this));
							},
						},
						{
							key: "_observe_ril.iccInfo.mbdn",
							value: function (e) {
								(this["ril.iccInfo.mbdn"] = e),
									(e = (Array.isArray(e) ? e[0] : e) || (navigator.mozVoicemail && navigator.mozVoicemail.getNumber(0))),
									(this.voicemailNumber = e),
									(this.contacts[0].tel = e),
									this.emit("changed");
							},
						},
						{
							key: "getCustomSpeedDials",
							value: function () {
								var e = this;
								p.default.get("custom.speeddials").then(function (t) {
									t && ((e.customSpeedDials = t), e.fillCustomSpeedDials(t), e.emit("changed"));
								});
							},
						},
						{
							key: "fillCustomSpeedDials",
							value: function () {
								var e = this;
								(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function (t) {
									var n = parseInt(t.key, 10);
									e.contacts[n - 1] = { dial: n, editable: !1, tel: t.tel, name: t.name, id: "customsd" };
								});
							},
						},
						{
							key: "fetch",
							value: function () {
								var e = this;
								this.initData(),
									this.fillCustomSpeedDials(this.customSpeedDials),
									navigator.mozContacts.getSpeedDials().then(function (t) {
										e.parse(t);
									});
							},
						},
						{
							key: "set",
							value: function (e, t, n) {
								navigator.mozContacts.setSpeedDial(e, t, n).onerror = function (e) {};
							},
						},
						{
							key: "remove",
							value: function (e) {
								navigator.mozContacts.removeSpeedDial(e).onerror = function (e) {};
							},
						},
						{
							key: "initData",
							value: function () {
								(this.contacts = Array(this.SIZE)
									.fill(null)
									.map(function (e, t) {
										return { dial: t + 1, editable: !0 };
									})),
									Object.assign(this.contacts[0], { tel: this.voicemailNumber, editable: !1, voicemail: !0, name: "voicemail", id: "voicemail" });
							},
						},
						{
							key: "parse",
							value: function (e) {
								var t = this,
									n = e.map(function (e) {
										return new Promise(function (n) {
											f.default.findById(e.contactId, function (i) {
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
							},
						},
					]),
					t
				);
			})(l.default),
			m = new h();
		m.start(), (t.default = m);
	},
	216: function (e, t) {
		"use strict";
		function n(e) {
			return e.replace(i, function (e, t) {
				return "x" === t.charAt(0).toLowerCase() ? String.fromCharCode(parseInt(t.substring(1), 16)) : String.fromCharCode(parseInt(t.substring(0), 10));
			});
		}
		Object.defineProperty(t, "__esModule", { value: !0 }), (t.unescapeNumericHTMLEntities = n);
		var i = (t.numericEntityRegExp = /&#([a-z0-9]+);/gi);
	},
	218: 111,
	219: 111,
	223: 111,
	224: 111,
	225: 111,
	226: 111,
	227: 111,
	228: 111,
	230: 111,
	231: 111,
	232: 111,
	233: 111,
	237: function (e, t) {
		e.exports = function () {
			throw new Error("define cannot be used indirect");
		};
	},
};

const vendorJS = [
	function (e, t, n) {
		n(3), (e.exports = n(11));
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r, i, a, s, u) {
			if ((o(t), !e)) {
				var l;
				if (void 0 === t) l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
				else {
					var c = [n, r, i, a, s, u],
						p = 0;
					(l = new Error(
						t.replace(/%s/g, function () {
							return c[p++];
						})
					)),
						(l.name = "Invariant Violation");
				}
				throw ((l.framesToPop = 1), l);
			}
		}
		var o = function (e) {};
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		var r = n(10),
			o = r;
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		e.exports = n(142);
	},
	function (e, t) {
		"use strict";
		function n(e) {
			if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
			return Object(e);
		}
		function r() {
			try {
				if (!Object.assign) return !1;
				var e = new String("abc");
				if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0])) return !1;
				for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
				if (
					"0123456789" !==
					Object.getOwnPropertyNames(t)
						.map(function (e) {
							return t[e];
						})
						.join("")
				)
					return !1;
				var r = {};
				return (
					"abcdefghijklmnopqrst".split("").forEach(function (e) {
						r[e] = e;
					}),
					"abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
				);
			} catch (o) {
				return !1;
			}
		}
		var o = Object.getOwnPropertySymbols,
			i = Object.prototype.hasOwnProperty,
			a = Object.prototype.propertyIsEnumerable;
		e.exports = r()
			? Object.assign
			: function (e, t) {
					for (var r, s, u = n(e), l = 1; l < arguments.length; l++) {
						r = Object(arguments[l]);
						for (var c in r) i.call(r, c) && (u[c] = r[c]);
						if (o) {
							s = o(r);
							for (var p = 0; p < s.length; p++) a.call(r, s[p]) && (u[s[p]] = r[s[p]]);
						}
					}
					return u;
			  };
	},
	function (e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", { value: !0 });
		var r = {
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
						r.debug("storing the requests..."),
							r._requestsByService.has(e) || r._requestsByService.set(e, []),
							r._requestsByService.get(e).push({ service: e, resolve: t, args: n });
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
		t.default = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		function s(e) {
			if (!e || "string" != typeof e) throw new Error("Event name should be a valid non-empty string!");
		}
		function u(e) {
			if ("function" != typeof e) throw new Error("Handler should be a function!");
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var l = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			c = n(3),
			p = r(c),
			d = n(11),
			f = r(d),
			h = n(5),
			v = r(h);
		n(217);
		var m = (function (e) {
			function t() {
				return o(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
			}
			return (
				a(t, e),
				l(t, [
					{
						key: "setHierarchy",
						value: function (e) {
							e && f.default.findDOMNode(this).focus();
						},
					},
					{
						key: "handleEvent",
						value: function (e) {
							if ("function" == typeof this._pre_handleEvent) {
								if (this._pre_handleEvent(e) === !1) return;
							} else this.debug("no handle event pre found. skip");
							"function" == typeof this["_handle_" + e.type] && (this.debug("handling " + e.type), this["_handle_" + e.type](e)),
								"function" == typeof this._post_handleEvent && this._post_handleEvent(e);
						},
					},
					{ key: "open", value: function (e) {} },
					{ key: "close", value: function (e) {} },
					{
						key: "show",
						value: function () {
							f.default.findDOMNode(this).classList.remove("hidden"), this.focus(), this.emit("opened");
						},
					},
					{
						key: "hide",
						value: function () {
							f.default.findDOMNode(this).classList.add("hidden"), this.emit("closed");
						},
					},
					{
						key: "focus",
						value: function () {
							f.default.findDOMNode(this).focus();
						},
					},
					{
						key: "respondToHierarchyEvent",
						value: function (e) {
							return !this.isActive();
						},
					},
					{
						key: "_changeState",
						value: function (e, t) {
							f.default.findDOMNode(this).setAttribute(e + "-state", t.toString());
						},
					},
					{
						key: "isHidden",
						value: function () {
							return f.default.findDOMNode(this).classList.contains("hidden");
						},
					},
					{
						key: "isActive",
						value: function () {
							return !f.default.findDOMNode(this).classList.contains("hidden");
						},
					},
					{
						key: "publish",
						value: function (e, t, n) {
							this.broadcast(e, t);
							var r = new CustomEvent(n ? e : this.EVENT_PREFIX + e, { bubbles: !0, detail: t || this });
							this.debug("publishing external event: " + e + (t ? JSON.stringify(t) : "")), f.default.findDOMNode(this).dispatchEvent(r);
						},
					},
					{
						key: "broadcast",
						value: function (e, t) {
							if (f.default.findDOMNode(this)) {
								var n = new CustomEvent("_" + e, { bubbles: !1, detail: t || this });
								f.default.findDOMNode(this).dispatchEvent(n);
							}
						},
					},
					{
						key: "debug",
						value: function () {
							this.DEBUG ? this.TRACE : window.DUMP && DUMP("[" + this.name + "][" + v.default.currentTime() + "] " + Array.prototype.slice.call(arguments).concat());
						},
					},
					{
						key: "on",
						value: function (e, t) {
							s(e), u(t), this.listeners || (this.listeners = new Map());
							var n = this.listeners.get(e);
							n || ((n = new Set()), this.listeners.set(e, n)), n.add(t);
						},
					},
					{
						key: "off",
						value: function (e, t) {
							s(e), u(t);
							var n = this.listeners.get(e);
							n && (n.delete(t), n.size || this.listeners.delete(e));
						},
					},
					{
						key: "offAll",
						value: function (e) {
							if ("undefined" == typeof e) return void this.listeners.clear();
							s(e);
							var t = this.listeners.get(e);
							t && (t.clear(), this.listeners.delete(e));
						},
					},
					{
						key: "observe",
						value: function (e, t) {
							this._settings || (this._settings = {}), (this._settings[e] = t), "function" == typeof this["_observe_" + e] && this["_observe_" + e](t);
						},
					},
					{
						key: "emit",
						value: function (e) {
							for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
							s(e), this.listeners || (this.listeners = new Map());
							var o = this.listeners.get(e);
							o &&
								o.forEach(function (e) {
									try {
										e.apply(null, n);
									} catch (t) {}
								});
						},
					},
				]),
				t
			);
		})(p.default.Component);
		t.default = m;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			for (var t; (t = e._renderedComponent); ) e = t;
			return e;
		}
		function o(e, t) {
			var n = r(e);
			(n._nativeNode = t), (t[v] = n);
		}
		function i(e) {
			var t = e._nativeNode;
			t && (delete t[v], (e._nativeNode = null));
		}
		function a(e, t) {
			if (!(e._flags & h.hasCachedChildNodes)) {
				var n = e._renderedChildren,
					i = t.firstChild;
				e: for (var a in n)
					if (n.hasOwnProperty(a)) {
						var s = n[a],
							u = r(s)._domID;
						if (null != u) {
							for (; null !== i; i = i.nextSibling)
								if (
									(1 === i.nodeType && i.getAttribute(f) === String(u)) ||
									(8 === i.nodeType && i.nodeValue === " react-text: " + u + " ") ||
									(8 === i.nodeType && i.nodeValue === " react-empty: " + u + " ")
								) {
									o(s, i);
									continue e;
								}
							d(!1);
						}
					}
				e._flags |= h.hasCachedChildNodes;
			}
		}
		function s(e) {
			if (e[v]) return e[v];
			for (var t = []; !e[v]; ) {
				if ((t.push(e), !e.parentNode)) return null;
				e = e.parentNode;
			}
			for (var n, r; e && (r = e[v]); e = t.pop()) (n = r), t.length && a(r, e);
			return n;
		}
		function u(e) {
			var t = s(e);
			return null != t && t._nativeNode === e ? t : null;
		}
		function l(e) {
			if ((void 0 === e._nativeNode ? d(!1) : void 0, e._nativeNode)) return e._nativeNode;
			for (var t = []; !e._nativeNode; ) t.push(e), e._nativeParent ? void 0 : d(!1), (e = e._nativeParent);
			for (; t.length; e = t.pop()) a(e, e._nativeNode);
			return e._nativeNode;
		}
		var c = n(23),
			p = n(81),
			d = n(1),
			f = c.ID_ATTRIBUTE_NAME,
			h = p,
			v = "__reactInternalInstance$" + Math.random().toString(36).slice(2),
			m = { getClosestInstanceFromNode: s, getInstanceFromNode: u, getNodeFromInstance: l, precacheChildNodes: a, precacheNode: o, uncacheNode: i };
		e.exports = m;
	},
	function (e, t) {
		"use strict";
		var n = !("undefined" == typeof window || !window.document || !window.document.createElement),
			r = {
				canUseDOM: n,
				canUseWorkers: "undefined" != typeof Worker,
				canUseEventListeners: n && !(!window.addEventListener && !window.attachEvent),
				canUseViewport: n && !!window.screen,
				isInWorker: !n,
			};
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		var r = n(162);
		e.exports = { debugTool: r };
	},
	function (e, t) {
		"use strict";
		function n(e) {
			return function () {
				return e;
			};
		}
		var r = function () {};
		(r.thatReturns = n),
			(r.thatReturnsFalse = n(!1)),
			(r.thatReturnsTrue = n(!0)),
			(r.thatReturnsNull = n(null)),
			(r.thatReturnsThis = function () {
				return this;
			}),
			(r.thatReturnsArgument = function (e) {
				return e;
			}),
			(e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		e.exports = n(145);
	},
	function (e, t, n) {
		"use strict";
		var r =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			o = n(4),
			i = n(22),
			a = (n(2), n(51), ("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) || 60103),
			s = { key: !0, ref: !0, __self: !0, __source: !0 },
			u = function (e, t, n, r, o, i, s) {
				var u = { $$typeof: a, type: e, key: t, ref: n, props: s, _owner: i };
				return u;
			};
		(u.createElement = function (e, t, n) {
			var r,
				o = {},
				a = null,
				l = null,
				c = null,
				p = null;
			if (null != t) {
				(l = void 0 === t.ref ? null : t.ref),
					(a = void 0 === t.key ? null : "" + t.key),
					(c = void 0 === t.__self ? null : t.__self),
					(p = void 0 === t.__source ? null : t.__source);
				for (r in t) t.hasOwnProperty(r) && !s.hasOwnProperty(r) && (o[r] = t[r]);
			}
			var d = arguments.length - 2;
			if (1 === d) o.children = n;
			else if (d > 1) {
				for (var f = Array(d), h = 0; h < d; h++) f[h] = arguments[h + 2];
				o.children = f;
			}
			if (e && e.defaultProps) {
				var v = e.defaultProps;
				for (r in v) void 0 === o[r] && (o[r] = v[r]);
			}
			return u(e, a, l, c, p, i.current, o);
		}),
			(u.createFactory = function (e) {
				var t = u.createElement.bind(null, e);
				return (t.type = e), t;
			}),
			(u.cloneAndReplaceKey = function (e, t) {
				return u(e.type, t, e.ref, e._self, e._source, e._owner, e.props);
			}),
			(u.cloneElement = function (e, t, n) {
				var r,
					a = o({}, e.props),
					l = e.key,
					c = e.ref,
					p = e._self,
					d = e._source,
					f = e._owner;
				if (null != t) {
					void 0 !== t.ref && ((c = t.ref), (f = i.current)), void 0 !== t.key && (l = "" + t.key);
					var h;
					e.type && e.type.defaultProps && (h = e.type.defaultProps);
					for (r in t) t.hasOwnProperty(r) && !s.hasOwnProperty(r) && (void 0 === t[r] && void 0 !== h ? (a[r] = h[r]) : (a[r] = t[r]));
				}
				var v = arguments.length - 2;
				if (1 === v) a.children = n;
				else if (v > 1) {
					for (var m = Array(v), g = 0; g < v; g++) m[g] = arguments[g + 2];
					a.children = m;
				}
				return u(e.type, l, c, p, d, f, a);
			}),
			(u.isValidElement = function (e) {
				return "object" === ("undefined" == typeof e ? "undefined" : r(e)) && null !== e && e.$$typeof === a;
			}),
			(e.exports = u);
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
				t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
			return "complete" === navigator.mozL10n.readyState && e ? ((e += ""), navigator.mozL10n.get(e, t) || e) : e;
		}
		function i() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.name,
				n = void 0 === t ? "new" : t,
				r = e.telNum,
				o = void 0 === r ? "" : r;
			new MozActivity({ name: n, data: { type: "webcontacts/contact", params: { tel: o } } });
		}
		function a(e, t) {
			var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
			return t.split(n).reduce(function (e, t) {
				return e && e[t];
			}, e);
		}
		function s(e) {
			var t = new MozActivity({ name: "pick", data: { type: "webcontacts/tel", params: { typeOfContact: "device" } } });
			(t.onsuccess = e), (t.onerror = function () {});
		}
		function u(e) {
			return JSON.parse(JSON.stringify(e));
		}
		function l(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
				n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
			return e <= t ? t : e >= n ? n : e;
		}
		function c() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [0, 0],
				t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
			return e[0] * t + e[1];
		}
		function p(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
			return [Math.floor(e / t), e % t];
		}
		function d() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.currentRowCol,
				n = void 0 === t ? [0, 0] : t,
				r = e.dir,
				o = e.col,
				i = void 0 === o ? 3 : o,
				a = e.total,
				s = c(n, i),
				u = Math.ceil(a / i),
				d = u * i,
				f = a - 1;
			switch ((!y() || ("ArrowLeft" !== r && "ArrowRight" !== r) || (r = "ArrowLeft" === r ? "ArrowRight" : "ArrowLeft"), r)) {
				case "ArrowRight":
					s = (a + (s + 1)) % a;
					break;
				case "ArrowLeft":
					s = (a + (s - 1)) % a;
					break;
				case "ArrowUp":
					s = l((d + (s - i)) % d, 0, f);
					break;
				case "ArrowDown":
					s = l((d + (s + i)) % d, 0, f);
			}
			return p(s, i);
		}
		function f() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.telNum;
			return new Promise(function (e, n) {
				var r = navigator.mozContacts.find({ filterBy: ["tel"], filterOp: "contains", filterLimit: 10, filterValue: t });
				(r.onsuccess = function (t) {
					e(t.target.result);
				}),
					(r.onerror = n);
			});
		}
		function h(e, t, n) {
			function r(t) {
				var r = void 0,
					i = void 0,
					a = void 0,
					s = void 0,
					u = void 0,
					l = void 0;
				for (r = t.name[0], l = t.org && t.org[0], s = t.tel ? t.tel.length : 0, u = e.length > 7 ? e.substr(-8) : e, a = 0; a < s && t.tel[a].value.indexOf(u) === -1; a++);
				if (((o.isContact = !0), n.photoURL)) {
					var c = g.default.getThumbnail(t);
					c && (o.photoURL = window.URL.createObjectURL(c));
				}
				(o.name = r), (o.phone = i), (o.org = o.org || l);
			}
			var o = {};
			if (((n = n || {}), !t || (Array.isArray(t) && 0 === t.length))) o.title = "";
			else if (Array.isArray(t)) {
				for (var i = 0, a = t.length; i < a && (r(t[i]), !o.name); i++);
				o.title = o.name || o.org;
			} else r(t), (o.title = o.name || o.org);
			return o;
		}
		function v(e) {
			if (!navigator.mozBluetooth || !navigator.mozBluetooth.defaultAdapter || !navigator.mozBluetooth.defaultAdapter.state) return Promise.reject("no bluetooth exist");
			var t = navigator.mozBluetooth.defaultAdapter.state,
				n = "enabled" === t;
			return (e = e || (n ? "disable" : "enable")), t.endsWith("ing") ? Promise.reject("bluetooth state is busy: " + t) : navigator.mozBluetooth.defaultAdapter[e]();
		}
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.asyncLocalStorage = t.isRtl = t.isLandscape = void 0),
			(t.toL10n = o),
			(t.sendNumberToContact = i),
			(t.getDeepProp = a),
			(t.pickContact = s),
			(t.simpleClone = u),
			(t.clamp = l),
			(t.rowColToIndex = c),
			(t.indexToRowCol = p),
			(t.navGrid = d),
			(t.contactNumFilter = f),
			(t.getContactDetails = h),
			(t.toggleBletooth = v);
		var m = n(202),
			g = r(m),
			y =
				((t.isLandscape = screen.orientation.type.startsWith("landscape")),
				function () {
					return "rtl" === document.dir;
				});
		t.isRtl = y;
		t.asyncLocalStorage = {
			setItem: function (e, t) {
				return Promise.resolve().then(function () {
					localStorage.setItem(e, t);
				});
			},
			getItem: function (e) {
				return Promise.resolve().then(function () {
					return localStorage.getItem(e);
				});
			},
		};
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = n(30),
			l = r(u),
			c = n(5),
			p = r(c),
			d = n(19),
			f = r(d),
			h = !1,
			v = (function (e) {
				function t() {
					o(this, t);
					var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return (
						(e.EVENT_PREFIX = ""),
						(e.service = window.Service || p.default),
						e.EVENTS &&
							e.EVENTS.forEach(function (e) {
								window.addEventListener(e, this);
							}, e),
						e.SERVICES &&
							e.SERVICES.forEach(function (e) {
								this.service.register(e, this);
							}, e),
						e.STATES &&
							e.STATES.forEach(function (e) {
								this.service.registerState(e, this);
							}, e),
						e.SETTINGS &&
							((e._settings = {}),
							e.SETTINGS.forEach(function (e) {
								f.default.addObserver(e, this);
							}, e)),
						e
					);
				}
				return (
					a(t, e),
					s(t, [
						{
							key: "publish",
							value: function (e, t, n) {
								var r = n ? "" : this.EVENT_PREFIX,
									o = new CustomEvent(r + e, { bubbles: !0, detail: t || this });
								this.debug("publishing: " + r + e), window.dispatchEvent(o);
							},
						},
						{
							key: "handleEvent",
							value: function (e) {
								if ("function" == typeof this._pre_handleEvent) {
									if (this._pre_handleEvent(e) === !1) return;
								} else this.debug("no handle event pre found. skip");
								"function" == typeof this["_handle_" + e.type] && (this.debug("handling " + e.type), this["_handle_" + e.type](e)),
									"function" == typeof this._post_handleEvent && this._post_handleEvent(e);
							},
						},
						{
							key: "observe",
							value: function (e, t) {
								this.debug("observing " + e + " : " + t),
									this._settings || (this._settings = {}),
									(this._settings[e] = t),
									"function" == typeof this["_observe_" + e] && (this.debug("observer for " + e + " found, invoking."), this["_observe_" + e](t));
							},
						},
						{
							key: "debug",
							value: function () {
								this.DEBUG || h ? this.TRACE : window.DUMP && DUMP("[" + this.name + "]" + Array.slice(arguments).concat());
							},
						},
					]),
					t
				);
			})(l.default);
		t.default = v;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			T.ReactReconcileTransaction && C ? void 0 : m(!1);
		}
		function o() {
			this.reinitializeTransaction(),
				(this.dirtyComponentsLength = null),
				(this.callbackQueue = p.getPooled()),
				(this.reconcileTransaction = T.ReactReconcileTransaction.getPooled(!0));
		}
		function i(e, t, n, o, i, a) {
			r(), C.batchedUpdates(e, t, n, o, i, a);
		}
		function a(e, t) {
			return e._mountOrder - t._mountOrder;
		}
		function s(e) {
			var t = e.dirtyComponentsLength;
			t !== g.length ? m(!1) : void 0, g.sort(a), y++;
			for (var n = 0; n < t; n++) {
				var r = g[n],
					o = r._pendingCallbacks;
				r._pendingCallbacks = null;
				var i;
				if (f.logTopLevelRenders) {
					var s = r;
					r._currentElement.props === r._renderedComponent._currentElement && (s = r._renderedComponent), (i = "React update: " + s.getName());
				}
				if ((h.performUpdateIfNecessary(r, e.reconcileTransaction, y), o)) for (var u = 0; u < o.length; u++) e.callbackQueue.enqueue(o[u], r.getPublicInstance());
			}
		}
		function u(e) {
			return r(), C.isBatchingUpdates ? (g.push(e), void (null == e._updateBatchNumber && (e._updateBatchNumber = y + 1))) : void C.batchedUpdates(u, e);
		}
		function l(e, t) {
			C.isBatchingUpdates ? void 0 : m(!1), b.enqueue(e, t), (_ = !0);
		}
		var c = n(4),
			p = n(75),
			d = n(21),
			f = n(85),
			h = (n(9), n(25)),
			v = n(39),
			m = n(1),
			g = [],
			y = 0,
			b = p.getPooled(),
			_ = !1,
			C = null,
			E = {
				initialize: function () {
					this.dirtyComponentsLength = g.length;
				},
				close: function () {
					this.dirtyComponentsLength !== g.length ? (g.splice(0, this.dirtyComponentsLength), w()) : (g.length = 0);
				},
			},
			k = {
				initialize: function () {
					this.callbackQueue.reset();
				},
				close: function () {
					this.callbackQueue.notifyAll();
				},
			},
			S = [E, k];
		c(o.prototype, v.Mixin, {
			getTransactionWrappers: function () {
				return S;
			},
			destructor: function () {
				(this.dirtyComponentsLength = null),
					p.release(this.callbackQueue),
					(this.callbackQueue = null),
					T.ReactReconcileTransaction.release(this.reconcileTransaction),
					(this.reconcileTransaction = null);
			},
			perform: function (e, t, n) {
				return v.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, e, t, n);
			},
		}),
			d.addPoolingTo(o);
		var w = function () {
				for (; g.length || _; ) {
					if (g.length) {
						var e = o.getPooled();
						e.perform(s, null, e), o.release(e);
					}
					if (_) {
						_ = !1;
						var t = b;
						(b = p.getPooled()), t.notifyAll(), p.release(t);
					}
				}
			},
			P = {
				injectReconcileTransaction: function (e) {
					e ? void 0 : m(!1), (T.ReactReconcileTransaction = e);
				},
				injectBatchingStrategy: function (e) {
					e ? void 0 : m(!1), "function" != typeof e.batchedUpdates ? m(!1) : void 0, "boolean" != typeof e.isBatchingUpdates ? m(!1) : void 0, (C = e);
				},
			},
			T = { ReactReconcileTransaction: null, batchedUpdates: i, enqueueUpdate: u, flushBatchedUpdates: w, injection: P, asap: l };
		e.exports = T;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = n(30),
			l = r(u),
			c = (function (e) {
				function t() {
					var e, n, r, a;
					o(this, t);
					for (var s = arguments.length, u = Array(s), l = 0; l < s; l++) u[l] = arguments[l];
					return (n = r = i(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(u)))), (r.name = "SoftKeyStore"), (a = n), i(r, a);
				}
				return (
					a(t, e),
					s(t, [
						{
							key: "start",
							value: function () {
								(this.currentKeys = {}), (this.registeredDOMMap = new Map());
							},
						},
						{
							key: "register",
							value: function (e, t) {
								var n = this.registeredDOMMap.get(t),
									r = this;
								n
									? n.updateKeys(e)
									: ((n = {
											start: function () {
												t.addEventListener("focus", this, !0), this.updateKeys(e);
											},
											stop: function () {
												t.removeEventListener("focus", this, !0);
											},
											handleEvent: function () {
												this.check();
											},
											check: function () {
												if (document.activeElement === t || t.contains(document.activeElement)) {
													var e = r.recount();
													r.store(e);
												}
											},
											updateKeys: function (e) {
												(this.keys = e), this.check();
											},
									  }),
									  this.registeredDOMMap.set(t, n),
									  n.start());
							},
						},
						{
							key: "generateKeysInfo",
							value: function (e) {
								var t = [];
								for (var n in e) {
									var r = {};
									switch (n) {
										case "left":
											r.code = "SoftLeft";
											break;
										case "center":
											r.code = "Enter";
											break;
										case "right":
											r.code = "SoftRight";
									}
									(r.options = { name: e[n] }), t.push(r);
								}
								return t;
							},
						},
						{
							key: "registerSoftkeys",
							value: function (e) {
								var t = this.generateKeysInfo(e);
								t.length && navigator.softkeyManager && navigator.softkeyManager.registerKeys(t);
							},
						},
						{
							key: "store",
							value: function (e) {
								(this.currentKeys = e), this.registerSoftkeys(e), this.emit("change");
							},
						},
						{
							key: "recount",
							value: function () {
								for (var e = {}, t = document.activeElement; t !== document.body; ) {
									var n = this.registeredDOMMap.get(t);
									if (n) {
										var r = n.keys;
										for (var o in r) o in e || (e[o] = r[o]);
									}
									t = t.parentNode;
								}
								return e;
							},
						},
						{
							key: "unregister",
							value: function (e) {
								var t = this.registeredDOMMap.get(e);
								t && (t.stop(), this.registeredDOMMap.delete(e), this.store(this.recount()));
							},
						},
					]),
					t
				);
			})(l.default),
			p = new c();
		p.start(), (t.default = p);
	},
	function (e, t, n) {
		"use strict";
		var r = n(32),
			o = r({ bubbled: null, captured: null }),
			i = r({
				topAbort: null,
				topAnimationEnd: null,
				topAnimationIteration: null,
				topAnimationStart: null,
				topBlur: null,
				topCanPlay: null,
				topCanPlayThrough: null,
				topChange: null,
				topClick: null,
				topCompositionEnd: null,
				topCompositionStart: null,
				topCompositionUpdate: null,
				topContextMenu: null,
				topCopy: null,
				topCut: null,
				topDoubleClick: null,
				topDrag: null,
				topDragEnd: null,
				topDragEnter: null,
				topDragExit: null,
				topDragLeave: null,
				topDragOver: null,
				topDragStart: null,
				topDrop: null,
				topDurationChange: null,
				topEmptied: null,
				topEncrypted: null,
				topEnded: null,
				topError: null,
				topFocus: null,
				topInput: null,
				topInvalid: null,
				topKeyDown: null,
				topKeyPress: null,
				topKeyUp: null,
				topLoad: null,
				topLoadedData: null,
				topLoadedMetadata: null,
				topLoadStart: null,
				topMouseDown: null,
				topMouseMove: null,
				topMouseOut: null,
				topMouseOver: null,
				topMouseUp: null,
				topPaste: null,
				topPause: null,
				topPlay: null,
				topPlaying: null,
				topProgress: null,
				topRateChange: null,
				topReset: null,
				topScroll: null,
				topSeeked: null,
				topSeeking: null,
				topSelectionChange: null,
				topStalled: null,
				topSubmit: null,
				topSuspend: null,
				topTextInput: null,
				topTimeUpdate: null,
				topTouchCancel: null,
				topTouchEnd: null,
				topTouchMove: null,
				topTouchStart: null,
				topTransitionEnd: null,
				topVolumeChange: null,
				topWaiting: null,
				topWheel: null,
			}),
			a = { topLevelTypes: i, PropagationPhases: o };
		e.exports = a;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			(this.dispatchConfig = e), (this._targetInst = t), (this.nativeEvent = n);
			var o = this.constructor.Interface;
			for (var i in o)
				if (o.hasOwnProperty(i)) {
					var s = o[i];
					s ? (this[i] = s(n)) : "target" === i ? (this.target = r) : (this[i] = n[i]);
				}
			return (
				(null != n.defaultPrevented ? n.defaultPrevented : n.returnValue === !1) ? (this.isDefaultPrevented = a.thatReturnsTrue) : (this.isDefaultPrevented = a.thatReturnsFalse),
				(this.isPropagationStopped = a.thatReturnsFalse),
				this
			);
		}
		var o = n(4),
			i = n(21),
			a = n(10),
			s =
				(n(2),
				"function" == typeof Proxy,
				["dispatchConfig", "_targetInst", "nativeEvent", "isDefaultPrevented", "isPropagationStopped", "_dispatchListeners", "_dispatchInstances"]),
			u = {
				type: null,
				target: null,
				currentTarget: a.thatReturnsNull,
				eventPhase: null,
				bubbles: null,
				cancelable: null,
				timeStamp: function (e) {
					return e.timeStamp || Date.now();
				},
				defaultPrevented: null,
				isTrusted: null,
			};
		o(r.prototype, {
			preventDefault: function () {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), (this.isDefaultPrevented = a.thatReturnsTrue));
			},
			stopPropagation: function () {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0), (this.isPropagationStopped = a.thatReturnsTrue));
			},
			persist: function () {
				this.isPersistent = a.thatReturnsTrue;
			},
			isPersistent: a.thatReturnsFalse,
			destructor: function () {
				var e = this.constructor.Interface;
				for (var t in e) this[t] = null;
				for (var n = 0; n < s.length; n++) this[s[n]] = null;
			},
		}),
			(r.Interface = u),
			(r.augmentClass = function (e, t) {
				var n = this,
					r = function () {};
				r.prototype = n.prototype;
				var a = new r();
				o(a, e.prototype),
					(e.prototype = a),
					(e.prototype.constructor = e),
					(e.Interface = o({}, n.Interface, t)),
					(e.augmentClass = n.augmentClass),
					i.addPoolingTo(e, i.fourArgumentPooler);
			}),
			i.addPoolingTo(r, i.fourArgumentPooler),
			(e.exports = r);
	},
	function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", { value: !0 });
		var n = {
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
		n.start(), (t.default = n);
	},
	function (e, t) {
		"use strict";
		var n = function (e) {
			var t;
			for (t in e) if (e.hasOwnProperty(t)) return t;
			return null;
		};
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		var r = n(1),
			o = function (e) {
				var t = this;
				if (t.instancePool.length) {
					var n = t.instancePool.pop();
					return t.call(n, e), n;
				}
				return new t(e);
			},
			i = function (e, t) {
				var n = this;
				if (n.instancePool.length) {
					var r = n.instancePool.pop();
					return n.call(r, e, t), r;
				}
				return new n(e, t);
			},
			a = function (e, t, n) {
				var r = this;
				if (r.instancePool.length) {
					var o = r.instancePool.pop();
					return r.call(o, e, t, n), o;
				}
				return new r(e, t, n);
			},
			s = function (e, t, n, r) {
				var o = this;
				if (o.instancePool.length) {
					var i = o.instancePool.pop();
					return o.call(i, e, t, n, r), i;
				}
				return new o(e, t, n, r);
			},
			u = function (e, t, n, r, o) {
				var i = this;
				if (i.instancePool.length) {
					var a = i.instancePool.pop();
					return i.call(a, e, t, n, r, o), a;
				}
				return new i(e, t, n, r, o);
			},
			l = function (e) {
				var t = this;
				e instanceof t ? void 0 : r(!1), e.destructor(), t.instancePool.length < t.poolSize && t.instancePool.push(e);
			},
			c = 10,
			p = o,
			d = function (e, t) {
				var n = e;
				return (n.instancePool = []), (n.getPooled = t || p), n.poolSize || (n.poolSize = c), (n.release = l), n;
			},
			f = { addPoolingTo: d, oneArgumentPooler: o, twoArgumentPooler: i, threeArgumentPooler: a, fourArgumentPooler: s, fiveArgumentPooler: u };
		e.exports = f;
	},
	function (e, t) {
		"use strict";
		var n = { current: null };
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			return (e & t) === t;
		}
		var o = n(1),
			i = {
				MUST_USE_PROPERTY: 1,
				HAS_SIDE_EFFECTS: 2,
				HAS_BOOLEAN_VALUE: 4,
				HAS_NUMERIC_VALUE: 8,
				HAS_POSITIVE_NUMERIC_VALUE: 24,
				HAS_OVERLOADED_BOOLEAN_VALUE: 32,
				injectDOMPropertyConfig: function (e) {
					var t = i,
						n = e.Properties || {},
						a = e.DOMAttributeNamespaces || {},
						u = e.DOMAttributeNames || {},
						l = e.DOMPropertyNames || {},
						c = e.DOMMutationMethods || {};
					e.isCustomAttribute && s._isCustomAttributeFunctions.push(e.isCustomAttribute);
					for (var p in n) {
						s.properties.hasOwnProperty(p) ? o(!1) : void 0;
						var d = p.toLowerCase(),
							f = n[p],
							h = {
								attributeName: d,
								attributeNamespace: null,
								propertyName: p,
								mutationMethod: null,
								mustUseProperty: r(f, t.MUST_USE_PROPERTY),
								hasSideEffects: r(f, t.HAS_SIDE_EFFECTS),
								hasBooleanValue: r(f, t.HAS_BOOLEAN_VALUE),
								hasNumericValue: r(f, t.HAS_NUMERIC_VALUE),
								hasPositiveNumericValue: r(f, t.HAS_POSITIVE_NUMERIC_VALUE),
								hasOverloadedBooleanValue: r(f, t.HAS_OVERLOADED_BOOLEAN_VALUE),
							};
						if (
							(!h.mustUseProperty && h.hasSideEffects ? o(!1) : void 0,
							h.hasBooleanValue + h.hasNumericValue + h.hasOverloadedBooleanValue <= 1 ? void 0 : o(!1),
							u.hasOwnProperty(p))
						) {
							var v = u[p];
							h.attributeName = v;
						}
						a.hasOwnProperty(p) && (h.attributeNamespace = a[p]),
							l.hasOwnProperty(p) && (h.propertyName = l[p]),
							c.hasOwnProperty(p) && (h.mutationMethod = c[p]),
							(s.properties[p] = h);
					}
				},
			},
			a =
				":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
			s = {
				ID_ATTRIBUTE_NAME: "data-reactid",
				ROOT_ATTRIBUTE_NAME: "data-reactroot",
				ATTRIBUTE_NAME_START_CHAR: a,
				ATTRIBUTE_NAME_CHAR: a + "\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040",
				properties: {},
				getPossibleStandardName: null,
				_isCustomAttributeFunctions: [],
				isCustomAttribute: function (e) {
					for (var t = 0; t < s._isCustomAttributeFunctions.length; t++) {
						if ((0, s._isCustomAttributeFunctions[t])(e)) return !0;
					}
					return !1;
				},
				injection: i,
			};
		e.exports = s;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			if (v) {
				var t = e.node,
					n = e.children;
				if (n.length) for (var r = 0; r < n.length; r++) m(t, n[r], null);
				else null != e.html ? (t.innerHTML = e.html) : null != e.text && d(t, e.text);
			}
		}
		function o(e, t) {
			e.parentNode.replaceChild(t.node, e), r(t);
		}
		function i(e, t) {
			v ? e.children.push(t) : e.node.appendChild(t.node);
		}
		function a(e, t) {
			v ? (e.html = t) : (e.node.innerHTML = t);
		}
		function s(e, t) {
			v ? (e.text = t) : d(e.node, t);
		}
		function u() {
			return this.node.nodeName;
		}
		function l(e) {
			return { node: e, children: [], html: null, text: null, toString: u };
		}
		var c = n(76),
			p = n(52),
			d = n(102),
			f = 1,
			h = 11,
			v =
				("undefined" != typeof document && "number" == typeof document.documentMode) ||
				("undefined" != typeof navigator && "string" == typeof navigator.userAgent && /\bEdge\/\d/.test(navigator.userAgent)),
			m = p(function (e, t, n) {
				t.node.nodeType === h || (t.node.nodeType === f && "object" === t.node.nodeName.toLowerCase() && (null == t.node.namespaceURI || t.node.namespaceURI === c.html))
					? (r(t), e.insertBefore(t.node, n))
					: (e.insertBefore(t.node, n), r(t));
			});
		(l.insertTreeBefore = m), (l.replaceChildWithTree = o), (l.queueChild = i), (l.queueHTML = a), (l.queueText = s), (e.exports = l);
	},
	function (e, t, n) {
		"use strict";
		function r() {
			o.attachRefs(this, this._currentElement);
		}
		var o = n(172),
			i = (n(9), n(1)),
			a = {
				mountComponent: function (e, t, n, o, i) {
					var a = e.mountComponent(t, n, o, i);
					return e._currentElement && null != e._currentElement.ref && t.getReactMountReady().enqueue(r, e), a;
				},
				getNativeNode: function (e) {
					return e.getNativeNode();
				},
				unmountComponent: function (e, t) {
					o.detachRefs(e, e._currentElement), e.unmountComponent(t);
				},
				receiveComponent: function (e, t, n, i) {
					var a = e._currentElement;
					if (t !== a || i !== e._context) {
						var s = o.shouldUpdateRefs(a, t);
						s && o.detachRefs(e, a), e.receiveComponent(t, n, i), s && e._currentElement && null != e._currentElement.ref && n.getReactMountReady().enqueue(r, e);
					}
				},
				performUpdateIfNecessary: function (e, t, n) {
					return e._updateBatchNumber !== n ? void (null != e._updateBatchNumber && e._updateBatchNumber !== n + 1 ? i(!1) : void 0) : void e.performUpdateIfNecessary(t);
				},
			};
		e.exports = a;
	},
	,
	function (e, t, n) {
		"use strict";
		var r =
				("function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
				n(34)),
			o = n(45),
			i = n(49),
			a = n(96),
			s = n(97),
			u = n(1),
			l = {},
			c = null,
			p = function (e, t) {
				e && (o.executeDispatchesInOrder(e, t), e.isPersistent() || e.constructor.release(e));
			},
			d = function (e) {
				return p(e, !0);
			},
			f = function (e) {
				return p(e, !1);
			},
			h = {
				injection: { injectEventPluginOrder: r.injectEventPluginOrder, injectEventPluginsByName: r.injectEventPluginsByName },
				putListener: function (e, t, n) {
					"function" != typeof n ? u(!1) : void 0, ((l[t] || (l[t] = {}))[e._rootNodeID] = n);
					var o = r.registrationNameModules[t];
					o && o.didPutListener && o.didPutListener(e, t, n);
				},
				getListener: function (e, t) {
					var n = l[t];
					return n && n[e._rootNodeID];
				},
				deleteListener: function (e, t) {
					var n = r.registrationNameModules[t];
					n && n.willDeleteListener && n.willDeleteListener(e, t);
					var o = l[t];
					o && delete o[e._rootNodeID];
				},
				deleteAllListeners: function (e) {
					for (var t in l)
						if (l[t][e._rootNodeID]) {
							var n = r.registrationNameModules[t];
							n && n.willDeleteListener && n.willDeleteListener(e, t), delete l[t][e._rootNodeID];
						}
				},
				extractEvents: function (e, t, n, o) {
					for (var i, s = r.plugins, u = 0; u < s.length; u++) {
						var l = s[u];
						if (l) {
							var c = l.extractEvents(e, t, n, o);
							c && (i = a(i, c));
						}
					}
					return i;
				},
				enqueueEvents: function (e) {
					e && (c = a(c, e));
				},
				processEventQueue: function (e) {
					var t = c;
					(c = null), e ? s(t, d) : s(t, f), c ? u(!1) : void 0, i.rethrowCaughtError();
				},
				__purge: function () {
					l = {};
				},
				__getListenerBank: function () {
					return l;
				},
			};
		e.exports = h;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n) {
			return b(e, t.dispatchConfig.phasedRegistrationNames[n]);
		}
		function o(e, t, n) {
			var o = t ? y.bubbled : y.captured,
				i = r(e, n, o);
			i && ((n._dispatchListeners = m(n._dispatchListeners, i)), (n._dispatchInstances = m(n._dispatchInstances, e)));
		}
		function i(e) {
			e && e.dispatchConfig.phasedRegistrationNames && v.traverseTwoPhase(e._targetInst, o, e);
		}
		function a(e) {
			if (e && e.dispatchConfig.phasedRegistrationNames) {
				var t = e._targetInst,
					n = t ? v.getParentInstance(t) : null;
				v.traverseTwoPhase(n, o, e);
			}
		}
		function s(e, t, n) {
			if (n && n.dispatchConfig.registrationName) {
				var r = n.dispatchConfig.registrationName,
					o = b(e, r);
				o && ((n._dispatchListeners = m(n._dispatchListeners, o)), (n._dispatchInstances = m(n._dispatchInstances, e)));
			}
		}
		function u(e) {
			e && e.dispatchConfig.registrationName && s(e._targetInst, null, e);
		}
		function l(e) {
			g(e, i);
		}
		function c(e) {
			g(e, a);
		}
		function p(e, t, n, r) {
			v.traverseEnterLeave(n, r, s, e, t);
		}
		function d(e) {
			g(e, u);
		}
		var f = n(17),
			h = n(27),
			v = n(45),
			m = n(96),
			g = n(97),
			y = (n(2), f.PropagationPhases),
			b = h.getListener,
			_ = { accumulateTwoPhaseDispatches: l, accumulateTwoPhaseDispatchesSkipTarget: c, accumulateDirectDispatches: d, accumulateEnterLeaveDispatches: p };
		e.exports = _;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(18),
			i = n(55),
			a = {
				view: function (e) {
					if (e.view) return e.view;
					var t = i(e);
					if (null != t && t.window === t) return t;
					var n = t.ownerDocument;
					return n ? n.defaultView || n.parentWindow : window;
				},
				detail: function (e) {
					return e.detail || 0;
				},
			};
		o.augmentClass(r, a), (e.exports = r);
	},
	function (e, t) {
		"use strict";
		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function r(e) {
			if (!e || "string" != typeof e) throw new Error("Event name should be a valid non-empty string!");
		}
		function o(e) {
			if ("function" != typeof e) throw new Error("Handler should be a function!");
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var i = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			a = (function () {
				function e() {
					n(this, e);
				}
				return (
					i(e, [
						{
							key: "on",
							value: function (e, t) {
								r(e), o(t), this.listeners || (this.listeners = new Map());
								var n = this.listeners.get(e);
								n || ((n = new Set()), this.listeners.set(e, n)), n.add(t);
							},
						},
						{
							key: "off",
							value: function (e, t) {
								r(e), o(t);
								var n = this.listeners.get(e);
								n && (n.delete(t), n.size || this.listeners.delete(e));
							},
						},
						{
							key: "offAll",
							value: function (e) {
								if ("undefined" == typeof e) return void this.listeners.clear();
								r(e);
								var t = this.listeners.get(e);
								t && (t.clear(), this.listeners.delete(e));
							},
						},
						{
							key: "emit",
							value: function (e) {
								for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
								r(e), this.listeners || (this.listeners = new Map());
								var i = this.listeners.get(e);
								i &&
									i.forEach(function (e) {
										try {
											e.apply(null, n);
										} catch (t) {}
									});
							},
						},
					]),
					e
				);
			})();
		t.default = a;
	},
	function (e, t, n) {
		"use strict";
		var r = {};
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		var r = n(1),
			o = function (e) {
				var t,
					n = {};
				e instanceof Object && !Array.isArray(e) ? void 0 : r(!1);
				for (t in e) e.hasOwnProperty(t) && (n[t] = t);
				return n;
			};
		e.exports = o;
	},
	function (e, t) {
		"use strict";
		var n = {
				onClick: !0,
				onDoubleClick: !0,
				onMouseDown: !0,
				onMouseMove: !0,
				onMouseUp: !0,
				onClickCapture: !0,
				onDoubleClickCapture: !0,
				onMouseDownCapture: !0,
				onMouseMoveCapture: !0,
				onMouseUpCapture: !0,
			},
			r = {
				getNativeProps: function (e, t) {
					if (!t.disabled) return t;
					var r = {};
					for (var o in t) !n[o] && t.hasOwnProperty(o) && (r[o] = t[o]);
					return r;
				},
			};
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			if (s)
				for (var e in u) {
					var t = u[e],
						n = s.indexOf(e);
					if ((n > -1 ? void 0 : a(!1), !l.plugins[n])) {
						t.extractEvents ? void 0 : a(!1), (l.plugins[n] = t);
						var r = t.eventTypes;
						for (var i in r) o(r[i], t, i) ? void 0 : a(!1);
					}
				}
		}
		function o(e, t, n) {
			l.eventNameDispatchConfigs.hasOwnProperty(n) ? a(!1) : void 0, (l.eventNameDispatchConfigs[n] = e);
			var r = e.phasedRegistrationNames;
			if (r) {
				for (var o in r)
					if (r.hasOwnProperty(o)) {
						var s = r[o];
						i(s, t, n);
					}
				return !0;
			}
			return !!e.registrationName && (i(e.registrationName, t, n), !0);
		}
		function i(e, t, n) {
			l.registrationNameModules[e] ? a(!1) : void 0, (l.registrationNameModules[e] = t), (l.registrationNameDependencies[e] = t.eventTypes[n].dependencies);
		}
		var a = n(1),
			s = null,
			u = {},
			l = {
				plugins: [],
				eventNameDispatchConfigs: {},
				registrationNameModules: {},
				registrationNameDependencies: {},
				possibleRegistrationNames: null,
				injectEventPluginOrder: function (e) {
					s ? a(!1) : void 0, (s = Array.prototype.slice.call(e)), r();
				},
				injectEventPluginsByName: function (e) {
					var t = !1;
					for (var n in e)
						if (e.hasOwnProperty(n)) {
							var o = e[n];
							(u.hasOwnProperty(n) && u[n] === o) || (u[n] ? a(!1) : void 0, (u[n] = o), (t = !0));
						}
					t && r();
				},
				getPluginModuleForEvent: function (e) {
					var t = e.dispatchConfig;
					if (t.registrationName) return l.registrationNameModules[t.registrationName] || null;
					for (var n in t.phasedRegistrationNames)
						if (t.phasedRegistrationNames.hasOwnProperty(n)) {
							var r = l.registrationNameModules[t.phasedRegistrationNames[n]];
							if (r) return r;
						}
					return null;
				},
				_resetEventPlugins: function () {
					s = null;
					for (var e in u) u.hasOwnProperty(e) && delete u[e];
					l.plugins.length = 0;
					var t = l.eventNameDispatchConfigs;
					for (var n in t) t.hasOwnProperty(n) && delete t[n];
					var r = l.registrationNameModules;
					for (var o in r) r.hasOwnProperty(o) && delete r[o];
				},
			};
		e.exports = l;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return Object.prototype.hasOwnProperty.call(e, m) || ((e[m] = h++), (d[e[m]] = {})), d[e[m]];
		}
		var o,
			i = n(4),
			a = n(17),
			s = n(34),
			u = n(165),
			l = n(95),
			c = n(193),
			p = n(57),
			d = {},
			f = !1,
			h = 0,
			v = {
				topAbort: "abort",
				topAnimationEnd: c("animationend") || "animationend",
				topAnimationIteration: c("animationiteration") || "animationiteration",
				topAnimationStart: c("animationstart") || "animationstart",
				topBlur: "blur",
				topCanPlay: "canplay",
				topCanPlayThrough: "canplaythrough",
				topChange: "change",
				topClick: "click",
				topCompositionEnd: "compositionend",
				topCompositionStart: "compositionstart",
				topCompositionUpdate: "compositionupdate",
				topContextMenu: "contextmenu",
				topCopy: "copy",
				topCut: "cut",
				topDoubleClick: "dblclick",
				topDrag: "drag",
				topDragEnd: "dragend",
				topDragEnter: "dragenter",
				topDragExit: "dragexit",
				topDragLeave: "dragleave",
				topDragOver: "dragover",
				topDragStart: "dragstart",
				topDrop: "drop",
				topDurationChange: "durationchange",
				topEmptied: "emptied",
				topEncrypted: "encrypted",
				topEnded: "ended",
				topError: "error",
				topFocus: "focus",
				topInput: "input",
				topKeyDown: "keydown",
				topKeyPress: "keypress",
				topKeyUp: "keyup",
				topLoadedData: "loadeddata",
				topLoadedMetadata: "loadedmetadata",
				topLoadStart: "loadstart",
				topMouseDown: "mousedown",
				topMouseMove: "mousemove",
				topMouseOut: "mouseout",
				topMouseOver: "mouseover",
				topMouseUp: "mouseup",
				topPaste: "paste",
				topPause: "pause",
				topPlay: "play",
				topPlaying: "playing",
				topProgress: "progress",
				topRateChange: "ratechange",
				topScroll: "scroll",
				topSeeked: "seeked",
				topSeeking: "seeking",
				topSelectionChange: "selectionchange",
				topStalled: "stalled",
				topSuspend: "suspend",
				topTextInput: "textInput",
				topTimeUpdate: "timeupdate",
				topTouchCancel: "touchcancel",
				topTouchEnd: "touchend",
				topTouchMove: "touchmove",
				topTouchStart: "touchstart",
				topTransitionEnd: c("transitionend") || "transitionend",
				topVolumeChange: "volumechange",
				topWaiting: "waiting",
				topWheel: "wheel",
			},
			m = "_reactListenersID" + String(Math.random()).slice(2),
			g = i({}, u, {
				ReactEventListener: null,
				injection: {
					injectReactEventListener: function (e) {
						e.setHandleTopLevel(g.handleTopLevel), (g.ReactEventListener = e);
					},
				},
				setEnabled: function (e) {
					g.ReactEventListener && g.ReactEventListener.setEnabled(e);
				},
				isEnabled: function () {
					return !(!g.ReactEventListener || !g.ReactEventListener.isEnabled());
				},
				listenTo: function (e, t) {
					for (var n = t, o = r(n), i = s.registrationNameDependencies[e], u = a.topLevelTypes, l = 0; l < i.length; l++) {
						var c = i[l];
						(o.hasOwnProperty(c) && o[c]) ||
							(c === u.topWheel
								? p("wheel")
									? g.ReactEventListener.trapBubbledEvent(u.topWheel, "wheel", n)
									: p("mousewheel")
									? g.ReactEventListener.trapBubbledEvent(u.topWheel, "mousewheel", n)
									: g.ReactEventListener.trapBubbledEvent(u.topWheel, "DOMMouseScroll", n)
								: c === u.topScroll
								? p("scroll", !0)
									? g.ReactEventListener.trapCapturedEvent(u.topScroll, "scroll", n)
									: g.ReactEventListener.trapBubbledEvent(u.topScroll, "scroll", g.ReactEventListener.WINDOW_HANDLE)
								: c === u.topFocus || c === u.topBlur
								? (p("focus", !0)
										? (g.ReactEventListener.trapCapturedEvent(u.topFocus, "focus", n), g.ReactEventListener.trapCapturedEvent(u.topBlur, "blur", n))
										: p("focusin") && (g.ReactEventListener.trapBubbledEvent(u.topFocus, "focusin", n), g.ReactEventListener.trapBubbledEvent(u.topBlur, "focusout", n)),
								  (o[u.topBlur] = !0),
								  (o[u.topFocus] = !0))
								: v.hasOwnProperty(c) && g.ReactEventListener.trapBubbledEvent(c, v[c], n),
							(o[c] = !0));
					}
				},
				trapBubbledEvent: function (e, t, n) {
					return g.ReactEventListener.trapBubbledEvent(e, t, n);
				},
				trapCapturedEvent: function (e, t, n) {
					return g.ReactEventListener.trapCapturedEvent(e, t, n);
				},
				ensureScrollValueMonitoring: function () {
					if ((void 0 === o && (o = document.createEvent && "pageX" in document.createEvent("MouseEvent")), !o && !f)) {
						var e = l.refreshScrollValues;
						g.ReactEventListener.monitorScrollValue(e), (f = !0);
					}
				},
			});
		e.exports = g;
	},
	function (e, t, n) {
		"use strict";
		var r = {};
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		var r = n(32),
			o = r({ prop: null, context: null, childContext: null });
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(29),
			i = n(95),
			a = n(54),
			s = {
				screenX: null,
				screenY: null,
				clientX: null,
				clientY: null,
				ctrlKey: null,
				shiftKey: null,
				altKey: null,
				metaKey: null,
				getModifierState: a,
				button: function e(t) {
					var e = t.button;
					return "which" in t ? e : 2 === e ? 2 : 4 === e ? 1 : 0;
				},
				buttons: null,
				relatedTarget: function (e) {
					return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement);
				},
				pageX: function (e) {
					return "pageX" in e ? e.pageX : e.clientX + i.currentScrollLeft;
				},
				pageY: function (e) {
					return "pageY" in e ? e.pageY : e.clientY + i.currentScrollTop;
				},
			};
		o.augmentClass(r, s), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		var r = n(1),
			o = {
				reinitializeTransaction: function () {
					(this.transactionWrappers = this.getTransactionWrappers()),
						this.wrapperInitData ? (this.wrapperInitData.length = 0) : (this.wrapperInitData = []),
						(this._isInTransaction = !1);
				},
				_isInTransaction: !1,
				getTransactionWrappers: null,
				isInTransaction: function () {
					return !!this._isInTransaction;
				},
				perform: function (e, t, n, o, i, a, s, u) {
					this.isInTransaction() ? r(!1) : void 0;
					var l, c;
					try {
						(this._isInTransaction = !0), (l = !0), this.initializeAll(0), (c = e.call(t, n, o, i, a, s, u)), (l = !1);
					} finally {
						try {
							if (l)
								try {
									this.closeAll(0);
								} catch (p) {}
							else this.closeAll(0);
						} finally {
							this._isInTransaction = !1;
						}
					}
					return c;
				},
				initializeAll: function (e) {
					for (var t = this.transactionWrappers, n = e; n < t.length; n++) {
						var r = t[n];
						try {
							(this.wrapperInitData[n] = i.OBSERVED_ERROR), (this.wrapperInitData[n] = r.initialize ? r.initialize.call(this) : null);
						} finally {
							if (this.wrapperInitData[n] === i.OBSERVED_ERROR)
								try {
									this.initializeAll(n + 1);
								} catch (o) {}
						}
					}
				},
				closeAll: function (e) {
					this.isInTransaction() ? void 0 : r(!1);
					for (var t = this.transactionWrappers, n = e; n < t.length; n++) {
						var o,
							a = t[n],
							s = this.wrapperInitData[n];
						try {
							(o = !0), s !== i.OBSERVED_ERROR && a.close && a.close.call(this, s), (o = !1);
						} finally {
							if (o)
								try {
									this.closeAll(n + 1);
								} catch (u) {}
						}
					}
					this.wrapperInitData.length = 0;
				},
			},
			i = { Mixin: o, OBSERVED_ERROR: {} };
		e.exports = i;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			return o[e];
		}
		function r(e) {
			return ("" + e).replace(i, n);
		}
		var o = { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" },
			i = /[&><"']/g;
		e.exports = r;
	},
	,
	,
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			return Array.isArray(t) && (t = t[1]), t ? t.nextSibling : e.firstChild;
		}
		function o(e, t, n) {
			c.insertTreeBefore(e, t, n);
		}
		function i(e, t, n) {
			Array.isArray(t) ? s(e, t[0], t[1], n) : m(e, t, n);
		}
		function a(e, t) {
			if (Array.isArray(t)) {
				var n = t[1];
				(t = t[0]), u(e, t, n), e.removeChild(n);
			}
			e.removeChild(t);
		}
		function s(e, t, n, r) {
			for (var o = t; ; ) {
				var i = o.nextSibling;
				if ((m(e, o, r), o === n)) break;
				o = i;
			}
		}
		function u(e, t, n) {
			for (;;) {
				var r = t.nextSibling;
				if (r === n) break;
				e.removeChild(r);
			}
		}
		function l(e, t, n) {
			var r = e.parentNode,
				o = e.nextSibling;
			o === t ? n && m(r, document.createTextNode(n), o) : n ? (v(o, n), u(r, o, t)) : u(r, e, t);
		}
		var c = n(24),
			p = n(137),
			d = n(88),
			f = (n(7), n(9), n(52)),
			h = n(58),
			v = n(102),
			m = f(function (e, t, n) {
				e.insertBefore(t, n);
			}),
			g = p.dangerouslyReplaceNodeWithMarkup,
			y = {
				dangerouslyReplaceNodeWithMarkup: g,
				replaceDelimitedText: l,
				processUpdates: function (e, t) {
					for (var n = 0; n < t.length; n++) {
						var s = t[n];
						switch (s.type) {
							case d.INSERT_MARKUP:
								o(e, s.content, r(e, s.afterNode));
								break;
							case d.MOVE_EXISTING:
								i(e, s.fromNode, r(e, s.afterNode));
								break;
							case d.SET_MARKUP:
								h(e, s.content);
								break;
							case d.TEXT_CONTENT:
								v(e, s.content);
								break;
							case d.REMOVE_NODE:
								a(e, s.fromNode);
						}
					}
				},
			};
		e.exports = y;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return !!l.hasOwnProperty(e) || (!u.hasOwnProperty(e) && (s.test(e) ? ((l[e] = !0), !0) : ((u[e] = !0), !1)));
		}
		function o(e, t) {
			return null == t || (e.hasBooleanValue && !t) || (e.hasNumericValue && isNaN(t)) || (e.hasPositiveNumericValue && t < 1) || (e.hasOverloadedBooleanValue && t === !1);
		}
		var i = n(23),
			a = (n(7), n(155), n(9), n(195)),
			s = (n(2), new RegExp("^[" + i.ATTRIBUTE_NAME_START_CHAR + "][" + i.ATTRIBUTE_NAME_CHAR + "]*$")),
			u = {},
			l = {},
			c = {
				createMarkupForID: function (e) {
					return i.ID_ATTRIBUTE_NAME + "=" + a(e);
				},
				setAttributeForID: function (e, t) {
					e.setAttribute(i.ID_ATTRIBUTE_NAME, t);
				},
				createMarkupForRoot: function () {
					return i.ROOT_ATTRIBUTE_NAME + '=""';
				},
				setAttributeForRoot: function (e) {
					e.setAttribute(i.ROOT_ATTRIBUTE_NAME, "");
				},
				createMarkupForProperty: function (e, t) {
					var n = i.properties.hasOwnProperty(e) ? i.properties[e] : null;
					if (n) {
						if (o(n, t)) return "";
						var r = n.attributeName;
						return n.hasBooleanValue || (n.hasOverloadedBooleanValue && t === !0) ? r + '=""' : r + "=" + a(t);
					}
					return i.isCustomAttribute(e) ? (null == t ? "" : e + "=" + a(t)) : null;
				},
				createMarkupForCustomAttribute: function (e, t) {
					return r(e) && null != t ? e + "=" + a(t) : "";
				},
				setValueForProperty: function (e, t, n) {
					var r = i.properties.hasOwnProperty(t) ? i.properties[t] : null;
					if (r) {
						var a = r.mutationMethod;
						if (a) a(e, n);
						else {
							if (o(r, n)) return void this.deleteValueForProperty(e, t);
							if (r.mustUseProperty) {
								var s = r.propertyName;
								(r.hasSideEffects && "" + e[s] == "" + n) || (e[s] = n);
							} else {
								var u = r.attributeName,
									l = r.attributeNamespace;
								l ? e.setAttributeNS(l, u, "" + n) : r.hasBooleanValue || (r.hasOverloadedBooleanValue && n === !0) ? e.setAttribute(u, "") : e.setAttribute(u, "" + n);
							}
						}
					} else if (i.isCustomAttribute(t)) return void c.setValueForAttribute(e, t, n);
				},
				setValueForAttribute: function (e, t, n) {
					if (r(t)) {
						null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n);
					}
				},
				deleteValueForProperty: function (e, t) {
					var n = i.properties.hasOwnProperty(t) ? i.properties[t] : null;
					if (n) {
						var r = n.mutationMethod;
						if (r) r(e, void 0);
						else if (n.mustUseProperty) {
							var o = n.propertyName;
							n.hasBooleanValue ? (e[o] = !1) : (n.hasSideEffects && "" + e[o] == "") || (e[o] = "");
						} else e.removeAttribute(n.attributeName);
					} else i.isCustomAttribute(t) && e.removeAttribute(t);
				},
			};
		e.exports = c;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e === y.topMouseUp || e === y.topTouchEnd || e === y.topTouchCancel;
		}
		function o(e) {
			return e === y.topMouseMove || e === y.topTouchMove;
		}
		function i(e) {
			return e === y.topMouseDown || e === y.topTouchStart;
		}
		function a(e, t, n, r) {
			var o = e.type || "unknown-event";
			(e.currentTarget = b.getNodeFromInstance(r)), t ? v.invokeGuardedCallbackWithCatch(o, n, e) : v.invokeGuardedCallback(o, n, e), (e.currentTarget = null);
		}
		function s(e, t) {
			var n = e._dispatchListeners,
				r = e._dispatchInstances;
			if (Array.isArray(n)) for (var o = 0; o < n.length && !e.isPropagationStopped(); o++) a(e, t, n[o], r[o]);
			else n && a(e, t, n, r);
			(e._dispatchListeners = null), (e._dispatchInstances = null);
		}
		function u(e) {
			var t = e._dispatchListeners,
				n = e._dispatchInstances;
			if (Array.isArray(t)) {
				for (var r = 0; r < t.length && !e.isPropagationStopped(); r++) if (t[r](e, n[r])) return n[r];
			} else if (t && t(e, n)) return n;
			return null;
		}
		function l(e) {
			var t = u(e);
			return (e._dispatchInstances = null), (e._dispatchListeners = null), t;
		}
		function c(e) {
			var t = e._dispatchListeners,
				n = e._dispatchInstances;
			Array.isArray(t) ? m(!1) : void 0, (e.currentTarget = t ? b.getNodeFromInstance(n) : null);
			var r = t ? t(e) : null;
			return (e.currentTarget = null), (e._dispatchListeners = null), (e._dispatchInstances = null), r;
		}
		function p(e) {
			return !!e._dispatchListeners;
		}
		var d,
			f,
			h = n(17),
			v = n(49),
			m = n(1),
			g =
				(n(2),
				{
					injectComponentTree: function (e) {
						d = e;
					},
					injectTreeTraversal: function (e) {
						f = e;
					},
				}),
			y = h.topLevelTypes,
			b = {
				isEndish: r,
				isMoveish: o,
				isStartish: i,
				executeDirectDispatch: c,
				executeDispatchesInOrder: s,
				executeDispatchesInOrderStopAtTrue: l,
				hasDispatches: p,
				getInstanceFromNode: function (e) {
					return d.getInstanceFromNode(e);
				},
				getNodeFromInstance: function (e) {
					return d.getNodeFromInstance(e);
				},
				isAncestor: function (e, t) {
					return f.isAncestor(e, t);
				},
				getLowestCommonAncestor: function (e, t) {
					return f.getLowestCommonAncestor(e, t);
				},
				getParentInstance: function (e) {
					return f.getParentInstance(e);
				},
				traverseTwoPhase: function (e, t, n) {
					return f.traverseTwoPhase(e, t, n);
				},
				traverseEnterLeave: function (e, t, n, r, o) {
					return f.traverseEnterLeave(e, t, n, r, o);
				},
				injection: g,
			};
		e.exports = b;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t = /[=:]/g,
				n = { "=": "=0", ":": "=2" };
			return (
				"$" +
				("" + e).replace(t, function (e) {
					return n[e];
				})
			);
		}
		function r(e) {
			var t = /(=0|=2)/g,
				n = { "=0": "=", "=2": ":" };
			return ("" + ("." === e[0] && "$" === e[1] ? e.substring(2) : e.substring(1))).replace(t, function (e) {
				return n[e];
			});
		}
		var o = { escape: n, unescape: r };
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			null != e.checkedLink && null != e.valueLink ? l(!1) : void 0;
		}
		function o(e) {
			r(e), null != e.value || null != e.onChange ? l(!1) : void 0;
		}
		function i(e) {
			r(e), null != e.checked || null != e.onChange ? l(!1) : void 0;
		}
		function a(e) {
			if (e) {
				var t = e.getName();
				if (t) return " Check the render method of `" + t + "`.";
			}
			return "";
		}
		var s = n(92),
			u = n(37),
			l = n(1),
			c = (n(2), { button: !0, checkbox: !0, image: !0, hidden: !0, radio: !0, reset: !0, submit: !0 }),
			p = {
				value: function (e, t, n) {
					return !e[t] || c[e.type] || e.onChange || e.readOnly || e.disabled
						? null
						: new Error(
								"You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
						  );
				},
				checked: function (e, t, n) {
					return !e[t] || e.onChange || e.readOnly || e.disabled
						? null
						: new Error(
								"You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
						  );
				},
				onChange: s.func,
			},
			d = {},
			f = {
				checkPropTypes: function (e, t, n) {
					for (var r in p) {
						if (p.hasOwnProperty(r)) var o = p[r](t, r, e, u.prop);
						if (o instanceof Error && !(o.message in d)) {
							d[o.message] = !0;
							a(n);
						}
					}
				},
				getValue: function (e) {
					return e.valueLink ? (o(e), e.valueLink.value) : e.value;
				},
				getChecked: function (e) {
					return e.checkedLink ? (i(e), e.checkedLink.value) : e.checked;
				},
				executeOnChange: function (e, t) {
					return e.valueLink
						? (o(e), e.valueLink.requestChange(t.target.value))
						: e.checkedLink
						? (i(e), e.checkedLink.requestChange(t.target.checked))
						: e.onChange
						? e.onChange.call(void 0, t)
						: void 0;
				},
			};
		e.exports = f;
	},
	function (e, t, n) {
		"use strict";
		var r = n(1),
			o = !1,
			i = {
				unmountIDFromEnvironment: null,
				replaceNodeWithMarkup: null,
				processChildrenUpdates: null,
				injection: {
					injectEnvironment: function (e) {
						o ? r(!1) : void 0,
							(i.unmountIDFromEnvironment = e.unmountIDFromEnvironment),
							(i.replaceNodeWithMarkup = e.replaceNodeWithMarkup),
							(i.processChildrenUpdates = e.processChildrenUpdates),
							(o = !0);
					},
				},
			};
		e.exports = i;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			try {
				return t(n, r);
			} catch (i) {
				return void (null === o && (o = i));
			}
		}
		var o = null,
			i = {
				invokeGuardedCallback: r,
				invokeGuardedCallbackWithCatch: r,
				rethrowCaughtError: function () {
					if (o) {
						var e = o;
						throw ((o = null), e);
					}
				},
			};
		e.exports = i;
	},
	function (e, t) {
		"use strict";
		var n = {
			remove: function (e) {
				e._reactInternalInstance = void 0;
			},
			get: function (e) {
				return e._reactInternalInstance;
			},
			has: function (e) {
				return void 0 !== e._reactInternalInstance;
			},
			set: function (e, t) {
				e._reactInternalInstance = t;
			},
		};
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		var r = !1;
		e.exports = r;
	},
	function (e, t) {
		"use strict";
		var n = function (e) {
			return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
				? function (t, n, r, o) {
						MSApp.execUnsafeLocalFunction(function () {
							return e(t, n, r, o);
						});
				  }
				: e;
		};
		e.exports = n;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t,
				n = e.keyCode;
			return "charCode" in e ? ((t = e.charCode), 0 === t && 13 === n && (t = 13)) : (t = n), t >= 32 || 13 === t ? t : 0;
		}
		e.exports = n;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t = this,
				n = t.nativeEvent;
			if (n.getModifierState) return n.getModifierState(e);
			var r = o[e];
			return !!r && !!n[r];
		}
		function r(e) {
			return n;
		}
		var o = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		e.exports = r;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t = e.target || e.srcElement || window;
			return t.correspondingUseElement && (t = t.correspondingUseElement), 3 === t.nodeType ? t.parentNode : t;
		}
		e.exports = n;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t = e && ((r && e[r]) || e[o]);
			if ("function" == typeof t) return t;
		}
		var r = "function" == typeof Symbol && Symbol.iterator,
			o = "@@iterator";
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			if (!i.canUseDOM || (t && !("addEventListener" in document))) return !1;
			var n = "on" + e,
				r = n in document;
			if (!r) {
				var a = document.createElement("div");
				a.setAttribute(n, "return;"), (r = "function" == typeof a[n]);
			}
			return !r && o && "wheel" === e && (r = document.implementation.hasFeature("Events.wheel", "3.0")), r;
		}
		var o,
			i = n(8);
		i.canUseDOM && (o = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		var r = n(8),
			o = /^[ \r\n\t\f]/,
			i = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,
			a = n(52),
			s = a(function (e, t) {
				e.innerHTML = t;
			});
		if (r.canUseDOM) {
			var u = document.createElement("div");
			(u.innerHTML = " "),
				"" === u.innerHTML &&
					(s = function (e, t) {
						if ((e.parentNode && e.parentNode.replaceChild(e, e), o.test(t) || ("<" === t[0] && i.test(t)))) {
							e.innerHTML = String.fromCharCode(65279) + t;
							var n = e.firstChild;
							1 === n.data.length ? e.removeChild(n) : n.deleteData(0, 1);
						} else e.innerHTML = t;
					}),
				(u = null);
		}
		e.exports = s;
	},
	function (e, t) {
		"use strict";
		function n(e, t) {
			var n = null === e || e === !1,
				o = null === t || t === !1;
			if (n || o) return n === o;
			var i = "undefined" == typeof e ? "undefined" : r(e),
				a = "undefined" == typeof t ? "undefined" : r(t);
			return "string" === i || "number" === i ? "string" === a || "number" === a : "object" === a && e.type === t.type && e.key === t.key;
		}
		var r =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (e) {
						return typeof e;
				  }
				: function (e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				  };
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			return e && "object" === ("undefined" == typeof e ? "undefined" : a(e)) && null != e.key ? c.escape(e.key) : t.toString(36);
		}
		function o(e, t, n, i) {
			var f = "undefined" == typeof e ? "undefined" : a(e);
			if ((("undefined" !== f && "boolean" !== f) || (e = null), null === e || "string" === f || "number" === f || s.isValidElement(e)))
				return n(i, e, "" === t ? p + r(e, 0) : t), 1;
			var h,
				v,
				m = 0,
				g = "" === t ? p : t + d;
			if (Array.isArray(e)) for (var y = 0; y < e.length; y++) (h = e[y]), (v = g + r(h, y)), (m += o(h, v, n, i));
			else {
				var b = u(e);
				if (b) {
					var _,
						C = b.call(e);
					if (b !== e.entries) for (var E = 0; !(_ = C.next()).done; ) (h = _.value), (v = g + r(h, E++)), (m += o(h, v, n, i));
					else
						for (; !(_ = C.next()).done; ) {
							var k = _.value;
							k && ((h = k[1]), (v = g + c.escape(k[0]) + d + r(h, 0)), (m += o(h, v, n, i)));
						}
				} else if ("object" === f) {
					String(e);
					l(!1);
				}
			}
			return m;
		}
		function i(e, t, n) {
			return null == e ? 0 : o(e, "", t, n);
		}
		var a =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			s = (n(22), n(12)),
			u = n(56),
			l = n(1),
			c = n(46),
			p = (n(2), "."),
			d = ":";
		e.exports = i;
	},
	function (e, t, n) {
		"use strict";
		var r = (n(4), n(10)),
			o = (n(2), r);
		e.exports = o;
	},
	function (e, t) {
		"use strict";
		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var r = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			o = (function () {
				function e(t, r, o, i) {
					n(this, e),
						(this.loopable = !0),
						(this.selector = t),
						(this.element = r),
						(this.scrollSelector = o),
						(this.initialFocusIndex = i || 0),
						this.element.addEventListener("keydown", this),
						(this._mutationObserver = new MutationObserver(this.refresh.bind(this))),
						this._mutationObserver.observe(this.element, { childList: !0, subtree: !0, attributes: !0 }),
						this.element.addEventListener("focus", this),
						this.refresh([]);
				}
				return (
					r(e, [
						{
							key: "setFocus",
							value: function (e, t) {
								(this._currentFocus = e), (this.element.activeElement = e), t || (this.scrollIntoView(e), this.element.contains(document.activeElement) && e.focus());
							},
						},
						{
							key: "destroy",
							value: function () {
								this.element.removeEventListener("keydown", this),
									this.element.removeEventListener("focus", this),
									(this._candidates = []),
									this._mutationObserver.disconnect(),
									(this._currentFocus = null),
									(this.element.activeElement = null),
									(this.element = null);
							},
						},
						{
							key: "updateCandidates",
							value: function () {
								this._candidates = Array.from(this.element.querySelectorAll(this.selector));
							},
						},
						{
							key: "isAriaHiddenByAncestor",
							value: function () {
								for (var e = !1, t = this.element; t !== document.body; ) {
									if ("true" === t.getAttribute("aria-hidden")) {
										e = !0;
										break;
									}
									t = t.parentNode;
								}
								return e;
							},
						},
						{
							key: "refresh",
							value: function (e) {
								var t = this,
									n = !1;
								if (
									(e.forEach(function (e) {
										[].slice.call(e.removedNodes).forEach(function (e) {
											e.contains(t._currentFocus) && (n = !0);
										});
									}),
									this.updateCandidates(),
									n || ((!this._currentFocus || this._currentFocus === this.element) && this._candidates.length) || this.element === document.activeElement)
								) {
									var r = this.findNext(this._currentFocus);
									r ? ((this._currentFocus = r), (this.element.activeElement = r)) : ((this._currentFocus = this.element), (this.element.activeElement = null));
								}
								this.element.contains(document.activeElement) &&
									this._currentFocus !== document.activeElement &&
									(this.scrollIntoView(this._currentFocus), this._currentFocus.focus());
							},
						},
						{
							key: "handleEvent",
							value: function (e) {
								if ("keydown" === e.type) this.onKeyDown(e);
								else if ("focus" === e.type) {
									if (this._currentFocus && this._currentFocus !== this.element) return this.scrollIntoView(this._currentFocus), void this._currentFocus.focus();
									var t = this.findNext();
									t
										? (this.scrollIntoView(t), t.focus(), (this._currentFocus = t), (this.element.activeElement = t))
										: ((this._currentFocus = this.element), (this.element.activeElement = null));
								}
							},
						},
						{
							key: "onKeyDown",
							value: function (e) {
								var t = null,
									n = !1;
								switch (e.key) {
									case "ArrowDown":
										(n = !0), (t = this.findNext());
										break;
									case "ArrowUp":
										(n = !0), (t = this.findPrev());
								}
								t && (this.scrollIntoView(t), t.focus(), (this._currentFocus = t), (this.element.activeElement = t)), n && (e.stopPropagation(), e.preventDefault());
							},
						},
						{
							key: "scrollIntoView",
							value: function (e) {
								if (this.scrollSelector) {
									for (var t = e, n = !1; t !== document.body; ) {
										if (t.matches(this.scrollSelector)) {
											(n = !0), t.scrollIntoView(!1);
											break;
										}
										t = t.parentNode;
									}
									n || e.scrollIntoView(!1);
								} else e.scrollIntoView(!1);
							},
						},
						{
							key: "getInitialFocus",
							value: function () {
								var e = this._candidates;
								return e.length ? e[this.initialFocusIndex] : null;
							},
						},
						{
							key: "findNext",
							value: function (e) {
								e = e || document.activeElement;
								var t = this._candidates;
								if (!t.length) return null;
								var n = 0;
								return (
									t.some(function (r, o) {
										return r === e && ((n = (o + 1) % t.length), !0);
									}),
									t[n] || this.loopable ? t[n] || t[this.initialFocusIndex] : null
								);
							},
						},
						{
							key: "findPrev",
							value: function (e) {
								var t = this;
								e = e || document.activeElement;
								var n = this._candidates;
								if (!n.length) return null;
								var r = null;
								return (
									n.some(function (o, i) {
										return o === e && ((r = (n.length + i - 1) % n.length), t.loopable || 0 !== i || (r = null), !0);
									}),
									n[r] || this.loopable ? n[r] || n[this.initialFocusIndex] : null
								);
							},
						},
					]),
					e
				);
			})();
		t.default = o;
	},
	,
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e) {
			if (Array.isArray(e)) {
				for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
				return n;
			}
			return Array.from(e);
		}
		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function a(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function s(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
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
			l = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			c = n(30),
			p = r(c),
			d = n(5),
			f = r(d),
			h = n(13),
			v = n(19),
			m = r(v),
			g = n(104),
			y = r(g),
			b = n(65),
			_ = r(b),
			C = "*#33#",
			E = "*#43#",
			k = (function (e) {
				function t(e) {
					i(this, t);
					var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (
						(n.subsidyUnlockPattern = /^\*#865625\*(\d{8}(?:\d{7,12})?)\*([1-5])#$/),
						(n.onUssdReceived = function (e) {
							var t = n.handleUssd;
							document.hasFocus()
								? t(e)
								: document.addEventListener("focus", function n() {
										t(e), document.removeEventListener("focus", n);
								  });
						}),
						(n.handleUssd = function (e) {
							if (e.session) {
								n._session = e.session;
								var t = function () {
									f.default.request("hideDialog"), (n.mmiloading = !1), n._session.cancel(), (n._session = null);
								};
								f.default.request("showDialog", {
									type: "prompt",
									header: (0, h.toL10n)("confirmation"),
									content: e.message.replace(/\\r\\n|\\r|\\n/g, "\n"),
									translated: !0,
									noClose: !1,
									onOk: function (e) {
										e ? ((n.mmiloading = !0), n.emit("mmiloading"), n._session.send(e)) : t();
									},
									onCancel: t,
									onBack: t,
								});
							} else n.emit("ussd-received", e), (n.mmiloading = !1);
						}),
						(n.errorCases = {
							BadNumber: { header: "invalidNumberToDialTitle", content: "invalidNumberToDialMessage" },
							NoNetwork: { header: "emergencyDialogTitle", content: "emergencyDialogBodyBadNumber" },
							EmergencyCallOnly: { header: "emergency-call-only", content: "emergency-call-error", containNumber: !0 },
							RadioNotAvailable: { header: "callAirplaneModeTitle", content: "callAirplaneModeMessage" },
							DeviceNotAcceptedError: { header: "emergencyDialogTitle", content: "emergencyDialogBodyDeviceNotAccepted" },
							BusyError: { header: "numberIsBusyTitle", content: "numberIsBusyMessage" },
							FDNBlockedError: { header: "fdnIsActiveTitle", content: "fdnIsActiveMessage", containNumber: !0 },
							FdnCheckFailure: { header: "fdnIsActiveTitle", content: "fdnIsActiveMessage", containNumber: !0 },
							OtherConnectionInUse: { header: "otherConnectionInUseTitle", content: "otherConnectionInUseMessage" },
						}),
						(n.validExp = /^(?!,)([0-9#+*,]){1,50}$/),
						(n.extraCharExp = /(\s|-|\.|\(|\))/g),
						(n.versionType = navigator.engmodeExtension.getPropertyValue("ro.build.type")),
						dump("dial_helper--versionType is " + n.versionType),
						(n.instantDialNumbers = ["*#*#372733#*#*", "*#06#", "*#0000#", "*#*#33284#*#*", "*#*#372733#*#*"]),
						n.versionType &&
							"user" !== n.versionType &&
							(n.instantDialNumbers = n.instantDialNumbers.concat([
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
							])),
						navigator.mozSetMessageHandler("ussd-received", n.onUssdReceived.bind(n)),
						m.default.get("debugger.remote-mode").then(function (e) {
							n.versionType &&
								"user" !== n.versionType &&
								"disabled" !== e &&
								((n.debuggerRemoteMode = !0), (n.instantDialNumbers = n.instantDialNumbers.concat(["*#0606#", "*#8378269#", "*#*#2637643#*#*"])));
						}),
						n
					);
				}
				return (
					s(t, e),
					l(t, [
						{
							key: "listImeiAndSvn",
							value: function (e) {
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
										f.default.request("showDialog", { type: "alert", header: t, content: "IMEI:" + e.join("\n") + "SVN:" + n, translated: !0, noClose: !1 });
									},
									function (e) {
										f.default.request("showDialog", { type: "alert", header: t, content: "IMEI: \nSVN:" + n, translated: !0, noClose: !1 });
									}
								);
							},
						},
						{
							key: "listDeviceInfos",
							value: function (e) {
								var t = [].concat(o(navigator.mozMobileConnections)).map(function (t, n) {
									return t.getDeviceIdentities().then(function (t) {
										if (t[e]) return t[e];
										var r = "Could not retrieve the " + e.toUpperCase() + " code for SIM " + n;
										return Promise.reject(new Error(r));
									});
								});
								Promise.all(t).then(
									function (t) {
										f.default.request("showDialog", { type: "alert", header: e.toUpperCase(), content: t.join("\n"), translated: !0, noClose: !1 });
									},
									function (t) {
										f.default.request("showDialog", { type: "alert", header: e.toUpperCase(), content: t.message, translated: !0, noClose: !1 });
									}
								);
							},
						},
						{
							key: "listIMEI",
							value: function (e) {
								var t = [].concat(o(navigator.mozMobileConnections)).map(function (t, n) {
									return t.getDeviceIdentities().then(function (t) {
										if (t[e]) return t[e];
										var r = "Could not retrieve the " + e.toUpperCase() + " code for SIM " + n;
										return Promise.reject(new Error(r));
									});
								});
								Promise.all(t).then(
									function (e) {
										f.default.request("openSheet", "qrface");
									},
									function (t) {
										f.default.request("showDialog", { type: "alert", header: e.toUpperCase(), content: t.message, translated: !0, noClose: !1 });
									}
								);
							},
						},
						{
							key: "setDebuggerMode",
							value: function (e) {
								e ? m.default.set({ "debugger.remote-mode": "adb-devtools" }) : m.default.set({ "debugger.remote-mode": "disabled" });
							},
						},
						{
							key: "showSarValue",
							value: function () {
								m.default.get("deviceinfo.sar_value").then(function (e) {
									f.default.request("showDialog", { type: "alert", header: "SAR Information", content: (e || "0") + " W/kg", translated: !0, noClose: !1 });
								});
							},
						},
						{
							key: "showInternalVersion",
							value: function () {
								var e = navigator.engmodeExtension,
									t = "",
									n = "",
									r = navigator.mozL10n.get("internalVersion");
								e &&
									((t = e.getPropertyValue("ro.tver.boot")), (n = e.getPropertyValue("ro.tver.sys")), dump("showInternalVersion: ro.tver.boot is: " + t + "ro.tver.sys is: " + n));
								var o = "boot: " + t + "\nsystem: " + n;
								Promise.resolve().then(function () {
									f.default.request("showDialog", { type: "alert", header: r, content: o, translated: !0, noClose: !1 });
								});
							},
						},
						{
							key: "showFIHVersion",
							value: function () {
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
										f.default.request("showDialog", { type: "alert", content: i, translated: !0, noClose: !1 });
									});
							},
						},
						{
							key: "getVariantInfo",
							value: function () {
								var e = "",
									t = navigator.engmodeExtension.getPropertyValue("ro.fih.fota_code"),
									n = "",
									r = navigator.engmodeExtension.getPrefValue("fota.commercial.ref", "na");
								dump("dial_helper:getVariantInfo variantInfo is " + r);
								var o = r.length;
								return (n = "ROW" === r.substr(o - 4, 3) ? r.substr(o - 8, 2) : r.substr(o - 2, 2)), (e = t + "/" + n);
							},
						},
						{
							key: "switchUsertoRoot",
							value: function () {
								var e = navigator.engmodeExtension.getPropertyValue("sys.usb.config");
								dump("switchUsertoRoot--sys.usb.config--before:" + e),
									"mtp" === e
										? (navigator.engmodeExtension.setPropertyValue("persist.sys.usb.config", "mtp,adb"), Toaster.showToast({ message: "adb enabled", latency: 3e3 }))
										: "mtp,adb" === e &&
										  (navigator.engmodeExtension.setPropertyValue("persist.sys.usb.config", "mtp"), Toaster.showToast({ message: "adb disabled", latency: 3e3 }));
							},
						},
						{
							key: "changeDiagMode",
							value: function () {
								var e,
									t = navigator.engmodeExtension.getPropertyValue("sys.usb.config");
								"diag,serial_smd,rmnet_qti_bam,adb" === t
									? (navigator.engmodeExtension.setPropertyValue("persist.sys.usb.config", "mtp,adb"),
									  Promise.resolve().then(function () {
											f.default.request("showDialog", { type: "alert", header: "close diag", content: " ", translated: !0, noClose: !1 });
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
											f.default.request("showDialog", { type: "alert", header: "open diag", content: " ", translated: !0, noClose: !1 });
									  }));
							},
						},
						{
							key: "changeAutoSmsMode",
							value: function () {
								var e = navigator.mozSettings.createLock().get("auto.send.crash.sms");
								e.onsuccess = function () {
									e.result["auto.send.crash.sms"]
										? (dump("sb_sms launcher get auto.send.crash.sms true"), (this._autoSmsEnable = !0))
										: (dump("sb_sms launcher get auto.send.crash.sms false"), (this._autoSmsEnable = !1)),
										this._autoSmsEnable
											? (navigator.mozSettings.createLock().set({ "auto.send.crash.sms": !1 }),
											  Promise.resolve().then(function () {
													f.default.request("showDialog", { type: "alert", header: "autosms off", content: " ", translated: !0, noClose: !1 });
											  }))
											: (navigator.mozSettings.createLock().set({ "auto.send.crash.sms": !0 }),
											  Promise.resolve().then(function () {
													f.default.request("showDialog", { type: "alert", header: "autosms on", content: " ", translated: !0, noClose: !1 });
											  }));
								}.bind(this);
							},
						},
						{
							key: "instantDialIfNecessary",
							value: function (e) {
								return this.noSIMCardOnDevice()
									? (dump("instantDialIfNecessary:No SIM card on device"),
									  this.isValidSimLockPassword(e) ? (dump("instantDialIfNecessary:ValidSimLockPassword"), !0) : this.instantDialNumbers.includes(e))
									: this.instantDialNumbers.includes(e);
							},
						},
						{
							key: "noSIMCardOnDevice",
							value: function () {
								var e = navigator.mozIccManager;
								return !e || !e.iccIds || 0 === e.iccIds.length;
							},
						},
						{
							key: "isValidSimLockPassword",
							value: function (e) {
								return (this.validExpForSimLock = /(^#79\+)[0-9]{8,16}(\+[1-5]#$)/), this.validExpForSimLock.test(e);
							},
						},
						{
							key: "unlockSimLock",
							value: function (e) {
								var t = e.length,
									n = t - 7,
									r = e.substr(4, n),
									o = e.charAt(t - 2),
									i = this.getSimLockType(o);
								if ((dump("unlockSimLock:password is: " + r), dump("unlockSimLock:simLockType is: " + i), null != i)) {
									({ lockType: i }).pin = r;
								}
							},
						},
						{
							key: "getSimLockType",
							value: function (e) {
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
							},
						},
						{
							key: "mmiHandler",
							value: function (e, t) {
								var n = this;
								(this.mmiloading = !0),
									this.emit("mmiloading"),
									e.then(function (e) {
										if (!e) return void n.emit("mmiloaded", "!", "GenericFailure");
										var r = (0, h.toL10n)(e.serviceCode),
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
													i && "smServiceEnabledFor" === o && Array.isArray(i) && (a = i.map(h.toL10n)), a.unshift((0, h.toL10n)(s[o]) || o), (o = a.join("\n"));
												}
										}
										(n.mmiloading = !1), n.emit("mmiloaded", r, o);
									});
							},
						},
						{
							key: "processCf",
							value: function (e) {
								for (var t = (0, h.toL10n)("call-forwarding-inactive"), n = t, r = t, o = t, i = t, a = t, s = t, u = t, l = t, c = 0; c < e.length; c++)
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
														return (0, h.toL10n)("call-forwarding-error");
												}
								return [
									(0, h.toL10n)("call-forwarding-status"),
									(0, h.toL10n)("call-forwarding-voice", { voice: n }),
									(0, h.toL10n)("call-forwarding-data", { data: r }),
									(0, h.toL10n)("call-forwarding-fax", { fax: o }),
									(0, h.toL10n)("call-forwarding-sms", { sms: i }),
									(0, h.toL10n)("call-forwarding-sync", { sync: a }),
									(0, h.toL10n)("call-forwarding-async", { async: s }),
									(0, h.toL10n)("call-forwarding-packet", { packet: u }),
									(0, h.toL10n)("call-forwarding-pad", { pad: l }),
								].join("\n");
							},
						},
						{
							key: "dialForcely",
							value: function (e, t) {
								navigator.mozTelephony.dial(e, t);
							},
						},
						{
							key: "dial",
							value: function (e, t, n) {
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
													f.default.request("Dialer:toggleStayEffect", !0);
													var p = a.imsHandler && a.imsHandler.capability,
														d = !p && a.voice.emergencyCallsOnly;
													d ? (u = c.dialEmergency(e, n)) : t ? dump("dialVT, should not hanppen") : (u = c.dial(e, n)),
														u
															.then(function (t) {
																if ((o(), t instanceof TelephonyCall)) {
																	c.addEventListener("callschanged", function e() {
																		c.removeEventListener("callschanged", e), f.default.request("Dialer:toggleStayEffect");
																	});
																	var i = r.getNumberAsDtmfToneGroups(l);
																	i.length > 1 &&
																		t.addEventListener("connected", function e() {
																			t.removeEventListener("connected", e), s.playDtmfToneGroups(i, n);
																		});
																} else f.default.request("Dialer:toggleStayEffect"), r.mmiHandler(t.result, e);
															})
															.catch(function (t) {
																f.default.request("Dialer:toggleStayEffect"), i(), s.errorHandler({ errorName: t, number: e, isEmergencyOnly: d });
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
																	return !y.default.isSIMCardAbsent(0) && !y.default.isSIMCardAbsent(1);
																};
																return e && t() && _.default.isAlwaysAsk() ? 0 : f.default.request("chooseSim", "call");
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
															y.default.isMultiSIM()
																? y.default.getSlots().forEach(function (e, t) {
																		if (e) {
																			(!e.isAbsent() && !e.isLocked()) || (n = !0);
																		}
																  })
																: (n = !0),
															!n && t.includes(e)
																? void a(0)
																: void f.default
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
							},
						},
						{
							key: "checkSpecialNumber",
							value: function (e) {
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
										m.default.get("debugger.remote-mode").then(function (e) {
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
							},
						},
						{
							key: "unlockSubsidySIM",
							value: function (e, t) {
								navigator.subsidyLockManager &&
									navigator.subsidyLockManager[0].getSubsidyLockStatus().then(function (n) {
										if (!n || !n.includes(t)) return void alert((0, h.toL10n)("deviceIsUnlocked"));
										var r = navigator.subsidyLockManager[0].unlockSubsidyLock({ lockType: t, password: e });
										(r.onsuccess = alert((0, h.toL10n)("simUnlockCodeAccepted"))), (r.onerror = alert((0, h.toL10n)("simUnlockCodeFailed")));
									});
							},
						},
						{
							key: "playDtmfToneGroups",
							value: function (e, t) {
								var n = this;
								e = e.slice(1);
								for (var r = e.length, o = r - 1; "" === e[o]; ) o--;
								(e = e.slice(0, ++o)), (r = e.length);
								for (var i = Promise.resolve(), a = 0, s = void 0; a < r; ) {
									for (s = 1; "" === e[a]; ) s++, a++;
									i = i.then(n.playDtmfToneGroup.bind(null, e[a++], s, t));
								}
								return i;
							},
						},
						{
							key: "playDtmfToneGroup",
							value: function (e, t, n) {
								var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3e3;
								return navigator.mozTelephony.sendTones(e, r * t, null, n);
							},
						},
						{
							key: "errorHandler",
							value: function () {
								var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
									t = e.errorName,
									n = e.number,
									r = e.isEmergencyOnly;
								"BadNumberError" === t && (t = r ? "NoNetwork" : "RegularCall");
								var o = this.errorCases[t];
								o || (o = { content: "CallFailed" });
								var i = Object.assign({ type: "alert", translated: !1, noClose: !1 }, o);
								i.containNumber && ((i.header = (0, h.toL10n)(i.header, { number: n })), (i.content = (0, h.toL10n)(i.content, { number: n })), (i.translated = !0)),
									f.default.request("showDialog", i);
							},
						},
						{
							key: "isValid",
							value: function (e) {
								return this.validExp.test(e);
							},
						},
						{
							key: "getNumberAsDtmfToneGroups",
							value: function (e) {
								return e.split(",");
							},
						},
					]),
					t
				);
			})(p.default),
			S = new k();
		t.default = S;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = n(14),
			l = r(u),
			c = n(103),
			p = r(c),
			d = (function (e) {
				function t(e) {
					o(this, t);
					var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (
						(n.name = "SimCardHelper"),
						p.default.observe("outgoingCall", n._handle_outgoingCallChange.bind(n)),
						p.default.getCardIndexFrom("outgoingCall", function (e) {
							(n.cardIndex = e), n.emit("ready", e);
						}),
						n
					);
				}
				return (
					a(t, e),
					s(t, [
						{
							key: "isAlwaysAsk",
							value: function () {
								return p.default.ALWAYS_ASK_OPTION_VALUE === this.cardIndex;
							},
						},
						{
							key: "_handle_outgoingCallChange",
							value: function (e) {
								(this.cardIndex = e), this.emit("change", e);
							},
						},
					]),
					t
				);
			})(l.default);
		t.default = new d();
	},
	function (e, t, n) {
		"use strict";
		var r = n(10),
			o = {
				listen: function (e, t, n) {
					return e.addEventListener
						? (e.addEventListener(t, n, !1),
						  {
								remove: function () {
									e.removeEventListener(t, n, !1);
								},
						  })
						: e.attachEvent
						? (e.attachEvent("on" + t, n),
						  {
								remove: function () {
									e.detachEvent("on" + t, n);
								},
						  })
						: void 0;
				},
				capture: function (e, t, n) {
					return e.addEventListener
						? (e.addEventListener(t, n, !0),
						  {
								remove: function () {
									e.removeEventListener(t, n, !0);
								},
						  })
						: { remove: r };
				},
				registerDefault: function () {},
			};
		e.exports = o;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			try {
				e.focus();
			} catch (t) {}
		}
		e.exports = n;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			if (((e = e || ("undefined" != typeof document ? document : void 0)), "undefined" == typeof e)) return null;
			try {
				return e.activeElement || e.body;
			} catch (t) {
				return e.body;
			}
		}
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return (
				a ? void 0 : i(!1),
				d.hasOwnProperty(e) || (e = "*"),
				s.hasOwnProperty(e) || ("*" === e ? (a.innerHTML = "<link />") : (a.innerHTML = "<" + e + "></" + e + ">"), (s[e] = !a.firstChild)),
				s[e] ? d[e] : null
			);
		}
		var o = n(8),
			i = n(1),
			a = o.canUseDOM ? document.createElement("div") : null,
			s = {},
			u = [1, '<select multiple="true">', "</select>"],
			l = [1, "<table>", "</table>"],
			c = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			p = [1, '<svg xmlns="http://www.w3.org/2000/svg">', "</svg>"],
			d = {
				"*": [1, "?<div>", "</div>"],
				area: [1, "<map>", "</map>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				param: [1, "<object>", "</object>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				optgroup: u,
				option: u,
				caption: l,
				colgroup: l,
				tbody: l,
				tfoot: l,
				thead: l,
				td: c,
				th: c,
			};
		[
			"circle",
			"clipPath",
			"defs",
			"ellipse",
			"g",
			"image",
			"line",
			"linearGradient",
			"mask",
			"path",
			"pattern",
			"polygon",
			"polyline",
			"radialGradient",
			"rect",
			"stop",
			"text",
			"tspan",
		].forEach(function (e) {
			(d[e] = p), (s[e] = !0);
		}),
			(e.exports = r);
	},
	function (e, t) {
		"use strict";
		function n(e, t) {
			return e === t ? 0 !== e || 0 !== t || 1 / e === 1 / t : e !== e && t !== t;
		}
		function r(e, t) {
			if (n(e, t)) return !0;
			if ("object" !== ("undefined" == typeof e ? "undefined" : o(e)) || null === e || "object" !== ("undefined" == typeof t ? "undefined" : o(t)) || null === t) return !1;
			var r = Object.keys(e),
				a = Object.keys(t);
			if (r.length !== a.length) return !1;
			for (var s = 0; s < r.length; s++) if (!i.call(t, r[s]) || !n(e[r[s]], t[r[s]])) return !1;
			return !0;
		}
		var o =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			i = Object.prototype.hasOwnProperty;
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = function e(t, n, r) {
				null === t && (t = Function.prototype);
				var o = Object.getOwnPropertyDescriptor(t, n);
				if (void 0 === o) {
					var i = Object.getPrototypeOf(t);
					return null === i ? void 0 : e(i, n, r);
				}
				if ("value" in o) return o.value;
				var a = o.get;
				if (void 0 !== a) return a.call(r);
			},
			l = n(3),
			c = r(l),
			p = n(11),
			d = r(p),
			f = n(6),
			h = r(f),
			v = n(16),
			m = r(v),
			g = n(62),
			y = r(g);
		n(221);
		var b = (function (e) {
			function t(e) {
				o(this, t);
				var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (n.name = "OptionMenu"), (n.FOCUS_SELECTOR = ".menu-item"), (n.state = { header: "", options: [], onCancel: function () {} }), n;
			}
			return (
				a(t, e),
				s(t, [
					{
						key: "componentDidMount",
						value: function () {
							(this.element = d.default.findDOMNode(this)), (this.navigator = new y.default(this.FOCUS_SELECTOR, this.element)), this.updateSoftKeys();
						},
					},
					{
						key: "componentWillUnmount",
						value: function () {
							this.navigator.destroy(), this.unregisterSoftKeys(), (this.element = null);
						},
					},
					{
						key: "componentDidUpdate",
						value: function () {
							this.isActive() && document.activeElement === document.body && this.focus();
						},
					},
					{
						key: "componentWillUpdate",
						value: function () {
							var e = this.element.querySelector('[data-index="0"]');
							e && this.navigator.setFocus(e);
						},
					},
					{
						key: "unregisterSoftKeys",
						value: function () {
							m.default.unregister(this.element);
						},
					},
					{
						key: "updateSoftKeys",
						value: function () {
							m.default.register({ left: this.state.hasCancel ? "cancel" : "", center: "select", right: "" }, this.element);
						},
					},
					{
						key: "clear",
						value: function () {
							this.setState({ header: "", options: [], onCancel: function () {} });
						},
					},
					{
						key: "show",
						value: function (e) {
							var n = this;
							this.clear(),
								this.setState(e, function () {
									n.updateSoftKeys();
								}),
								u(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "show", this).call(this);
						},
					},
					{
						key: "onKeyDown",
						value: function (e) {
							var t = (e.target, e.key),
								n = null;
							switch (t) {
								case "Enter":
									e.stopPropagation(), e.preventDefault();
									var r = this.state.options[+e.target.dataset.index];
									r && r.callback && r.callback(), this.hide();
									break;
								case "ArrowUp":
									e.stopPropagation(), e.preventDefault(), (n = this.findPrev());
									break;
								case "ArrowDown":
									e.stopPropagation(), e.preventDefault(), (n = this.findNext());
									break;
								case "SoftLeft":
									if (!this.state.hasCancel) break;
								case "BrowserBack":
								case "Backspace":
									e.stopPropagation(), e.preventDefault(), this.state.onCancel && this.state.onCancel(), this.hide();
							}
							n && (n.scrollIntoView(!1), n.focus());
						},
					},
					{
						key: "render",
						value: function () {
							var e = this,
								t = [];
							return (
								this.state.options.forEach(function (e, n) {
									var r = "";
									e.icon && (r = c.default.createElement("img", { src: e.icon, className: "icon" }));
									var o = "content" + (e.checked ? " checked" : "");
									t.push(
										c.default.createElement(
											"div",
											{ key: "option-" + n, tabIndex: "-1", "data-index": n, className: "menu-item p-pri" },
											r,
											c.default.createElement(
												"div",
												{ className: o, "data-l10n-id": e.id || "", "data-l10n-args": e.l10nArgs || null, "data-icon": e.dataicon || "" },
												e.label || ""
											)
										)
									);
								}),
								c.default.createElement(
									"div",
									{
										className: "option-menu-container",
										tabIndex: "-1",
										onKeyDown: function (t) {
											return e.onKeyDown(t);
										},
									},
									c.default.createElement(
										"div",
										{ className: "option-menu" },
										c.default.createElement("div", { className: "header h1", key: "translated-header", "data-l10n-id": this.state.header || "options" }),
										c.default.createElement("div", { className: "content p-ul" }, this.props.children || t)
									)
								)
							);
						},
					},
				]),
				t
			);
		})(h.default);
		t.default = b;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = n(3),
			l = r(u),
			c = n(6),
			p = r(c),
			d = n(71),
			f = r(d),
			h = n(5),
			v = r(h),
			m = n(103),
			g = r(m),
			y = n(129),
			b = r(y);
		n(234), n(235), n(236);
		var _ = (function (e) {
			function t(e) {
				o(this, t);
				var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (n.state = { shown: !1 }), v.default.register("chooseSim", n), n;
			}
			return (
				a(t, e),
				s(t, [
					{
						key: "componentDidUpdate",
						value: function () {
							this.refs.menu
								? (this.refs.menu.show(this.getSimOptions()),
								  this.refs.menu.on("closed", function () {
										v.default.request("focus");
								  }))
								: v.default.request("focus");
						},
					},
					{
						key: "capitalize",
						value: function (e) {
							return e.charAt(0).toUpperCase() + e.slice(1);
						},
					},
					{
						key: "chooseSim",
						value: function () {
							var e = this,
								t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "call";
							return (
								(this.lastActive = document.activeElement),
								new Promise(function (n, r) {
									(e.resolve = n),
										(e.reject = r),
										g.default.getCardIndexFrom("outgoing" + e.capitalize(t), function (t) {
											if (e.hasOnlyOneSIMCardDetected()) {
												var n = e.isSIMCardAbsent(0) ? 1 : 0;
												e.resolve(n);
											} else e.noSIMCardOnDevice() ? e.resolve(0) : t === g.default.ALWAYS_ASK_OPTION_VALUE ? e.setState({ shown: !0 }) : e.resolve(t);
										});
								})
							);
						},
					},
					{
						key: "getSimCardByIndex",
						value: function (e) {
							var t = this,
								n = navigator.mozMobileConnections[e];
							if (n) {
								var r = b.default.userFacingInfo(n).operator,
									o = e + 1;
								return {
									id: r ? "sim-with-index-and-carrier" : "sim-without-carrier",
									l10nArgs: JSON.stringify({ carrier: r ? r : null, index: o }),
									label: "SIM " + o,
									callback: function () {
										t.resolve(e), t.onCancel(), (t.resolve = null), (t.reject = null);
									},
								};
							}
						},
					},
					{
						key: "getSimOptions",
						value: function () {
							var e = this;
							return {
								header: "select",
								options: [this.getSimCardByIndex(0), this.getSimCardByIndex(1)],
								onCancel: function () {
									e.reject(), e.onCancel(), (e.resolve = null), (e.reject = null);
								},
							};
						},
					},
					{
						key: "onCancel",
						value: function () {
							this.focusLast();
						},
					},
					{
						key: "focusLast",
						value: function () {
							this.lastActive && (this.lastActive.focus(), (this.lastActive = null));
						},
					},
					{
						key: "isSIMCardAbsent",
						value: function (e) {
							var t = navigator.mozIccManager,
								n = navigator.mozMobileConnections[e];
							if (!t || !n) return !0;
							var r = t.getIccById(n.iccId);
							return !r || (r && r.iccInfo && null === r.iccInfo.iccid);
						},
					},
					{
						key: "hasOnlyOneSIMCardDetected",
						value: function () {
							return this.isSIMCardAbsent(0) ^ this.isSIMCardAbsent(1);
						},
					},
					{
						key: "noSIMCardOnDevice",
						value: function () {
							var e = navigator.mozIccManager;
							return !e || !e.iccIds || 0 === e.iccIds.length;
						},
					},
					{
						key: "render",
						value: function () {
							return l.default.createElement("div", null, this.state.shown ? l.default.createElement(f.default, { ref: "menu" }) : null);
						},
					},
				]),
				t
			);
		})(p.default);
		t.default = _;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		function s(e) {
			var t = e.content ? { "data-icon": e.content.icon, "data-l10n-id": e.content.text } : null;
			return p.default.createElement("button", l({ id: "software-keys-" + e.pos, className: "sk-button", "data-position": e.pos }, t), e.content.text);
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var u = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			l =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
					}
					return e;
				},
			c = n(3),
			p = r(c),
			d = n(6),
			f = r(d),
			h = n(16),
			v = r(h);
		n(222);
		var m = (function (e) {
			function t(e) {
				o(this, t);
				var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (n.state = { left: e.left || "", center: e.center || "", right: e.right || "" }), (n.setRef = n.setRef.bind(n)), (n.softkeys = ["left", "right", "center"]), n;
			}
			return (
				a(t, e),
				u(t, [
					{
						key: "componentDidMount",
						value: function () {
							var e = this;
							v.default.on("change", function () {
								var t = v.default.currentKeys;
								e.softkeys.forEach(function (n) {
									t[n] = e.uniformContent(t[n] || "");
								}),
									e.setState(t);
							});
						},
					},
					{
						key: "componentWillUpdate",
						value: function (e, t) {
							Array.from(this.element.getElementsByTagName("button")).forEach(function (e) {
								t[e.dataset.position].text || (e.textContent = "");
							});
						},
					},
					{
						key: "uniformContent",
						value: function (e) {
							return "string" == typeof e && (e = e.startsWith("icon=") ? { icon: e.replace("icon=", "") } : { text: e }), e;
						},
					},
					{
						key: "setRef",
						value: function (e) {
							this.element = e;
						},
					},
					{
						key: "render",
						value: function () {
							return p.default.createElement(
								"form",
								{ className: "skbar none-paddings visible focused", id: "softkeyPanel", "data-type": "action", ref: this.setRef },
								p.default.createElement(s, { pos: "left", content: this.state.left }),
								p.default.createElement(s, { pos: "center", content: this.state.center }),
								p.default.createElement(s, { pos: "right", content: this.state.right })
							);
						},
					},
				]),
				t
			);
		})(f.default);
		t.default = m;
	},
	function (e, t) {
		"use strict";
		function n(e, t) {
			return e + t.charAt(0).toUpperCase() + t.substring(1);
		}
		var r = {
				animationIterationCount: !0,
				borderImageOutset: !0,
				borderImageSlice: !0,
				borderImageWidth: !0,
				boxFlex: !0,
				boxFlexGroup: !0,
				boxOrdinalGroup: !0,
				columnCount: !0,
				flex: !0,
				flexGrow: !0,
				flexPositive: !0,
				flexShrink: !0,
				flexNegative: !0,
				flexOrder: !0,
				gridRow: !0,
				gridColumn: !0,
				fontWeight: !0,
				lineClamp: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				tabSize: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0,
				fillOpacity: !0,
				floodOpacity: !0,
				stopOpacity: !0,
				strokeDasharray: !0,
				strokeDashoffset: !0,
				strokeMiterlimit: !0,
				strokeOpacity: !0,
				strokeWidth: !0,
			},
			o = ["Webkit", "ms", "Moz", "O"];
		Object.keys(r).forEach(function (e) {
			o.forEach(function (t) {
				r[n(t, e)] = r[e];
			});
		});
		var i = {
				background: { backgroundAttachment: !0, backgroundColor: !0, backgroundImage: !0, backgroundPositionX: !0, backgroundPositionY: !0, backgroundRepeat: !0 },
				backgroundPosition: { backgroundPositionX: !0, backgroundPositionY: !0 },
				border: { borderWidth: !0, borderStyle: !0, borderColor: !0 },
				borderBottom: { borderBottomWidth: !0, borderBottomStyle: !0, borderBottomColor: !0 },
				borderLeft: { borderLeftWidth: !0, borderLeftStyle: !0, borderLeftColor: !0 },
				borderRight: { borderRightWidth: !0, borderRightStyle: !0, borderRightColor: !0 },
				borderTop: { borderTopWidth: !0, borderTopStyle: !0, borderTopColor: !0 },
				font: { fontStyle: !0, fontVariant: !0, fontWeight: !0, fontSize: !0, lineHeight: !0, fontFamily: !0 },
				outline: { outlineWidth: !0, outlineStyle: !0, outlineColor: !0 },
			},
			a = { isUnitlessNumber: r, shorthandPropertyExpansions: i };
		e.exports = a;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			(this._callbacks = null), (this._contexts = null);
		}
		var o = n(4),
			i = n(21),
			a = n(1);
		o(r.prototype, {
			enqueue: function (e, t) {
				(this._callbacks = this._callbacks || []), (this._contexts = this._contexts || []), this._callbacks.push(e), this._contexts.push(t);
			},
			notifyAll: function () {
				var e = this._callbacks,
					t = this._contexts;
				if (e) {
					e.length !== t.length ? a(!1) : void 0, (this._callbacks = null), (this._contexts = null);
					for (var n = 0; n < e.length; n++) e[n].call(t[n]);
					(e.length = 0), (t.length = 0);
				}
			},
			checkpoint: function () {
				return this._callbacks ? this._callbacks.length : 0;
			},
			rollback: function (e) {
				this._callbacks && ((this._callbacks.length = e), (this._contexts.length = e));
			},
			reset: function () {
				(this._callbacks = null), (this._contexts = null);
			},
			destructor: function () {
				this.reset();
			},
		}),
			i.addPoolingTo(r),
			(e.exports = r);
	},
	function (e, t) {
		"use strict";
		var n = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return ("" + e).replace(_, "$&/");
		}
		function o(e, t) {
			(this.func = e), (this.context = t), (this.count = 0);
		}
		function i(e, t, n) {
			var r = e.func,
				o = e.context;
			r.call(o, t, e.count++);
		}
		function a(e, t, n) {
			if (null == e) return e;
			var r = o.getPooled(t, n);
			g(e, i, r), o.release(r);
		}
		function s(e, t, n, r) {
			(this.result = e), (this.keyPrefix = t), (this.func = n), (this.context = r), (this.count = 0);
		}
		function u(e, t, n) {
			var o = e.result,
				i = e.keyPrefix,
				a = e.func,
				s = e.context,
				u = a.call(s, t, e.count++);
			Array.isArray(u)
				? l(u, o, n, m.thatReturnsArgument)
				: null != u && (v.isValidElement(u) && (u = v.cloneAndReplaceKey(u, i + (!u.key || (t && t.key === u.key) ? "" : r(u.key) + "/") + n)), o.push(u));
		}
		function l(e, t, n, o, i) {
			var a = "";
			null != n && (a = r(n) + "/");
			var l = s.getPooled(t, a, o, i);
			g(e, u, l), s.release(l);
		}
		function c(e, t, n) {
			if (null == e) return e;
			var r = [];
			return l(e, r, null, t, n), r;
		}
		function p(e, t, n) {
			return null;
		}
		function d(e, t) {
			return g(e, p, null);
		}
		function f(e) {
			var t = [];
			return l(e, t, null, m.thatReturnsArgument), t;
		}
		var h = n(21),
			v = n(12),
			m = n(10),
			g = n(60),
			y = h.twoArgumentPooler,
			b = h.fourArgumentPooler,
			_ = /\/+/g;
		(o.prototype.destructor = function () {
			(this.func = null), (this.context = null), (this.count = 0);
		}),
			h.addPoolingTo(o, y),
			(s.prototype.destructor = function () {
				(this.result = null), (this.keyPrefix = null), (this.func = null), (this.context = null), (this.count = 0);
			}),
			h.addPoolingTo(s, b);
		var C = { forEach: a, map: c, mapIntoWithKeyPrefixInternal: l, count: d, toArray: f };
		e.exports = C;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			var n = k.hasOwnProperty(t) ? k[t] : null;
			w.hasOwnProperty(t) && (n !== C.OVERRIDE_BASE ? g(!1) : void 0), e && (n !== C.DEFINE_MANY && n !== C.DEFINE_MANY_MERGED ? g(!1) : void 0);
		}
		function o(e, t) {
			if (t) {
				"function" == typeof t ? g(!1) : void 0, h.isValidElement(t) ? g(!1) : void 0;
				var n = e.prototype,
					o = n.__reactAutoBindPairs;
				t.hasOwnProperty(_) && S.mixins(e, t.mixins);
				for (var i in t)
					if (t.hasOwnProperty(i) && i !== _) {
						var a = t[i],
							l = n.hasOwnProperty(i);
						if ((r(l, i), S.hasOwnProperty(i))) S[i](e, a);
						else {
							var c = k.hasOwnProperty(i),
								p = "function" == typeof a,
								d = p && !c && !l && t.autobind !== !1;
							if (d) o.push(i, a), (n[i] = a);
							else if (l) {
								var f = k[i];
								!c || (f !== C.DEFINE_MANY_MERGED && f !== C.DEFINE_MANY) ? g(!1) : void 0,
									f === C.DEFINE_MANY_MERGED ? (n[i] = s(n[i], a)) : f === C.DEFINE_MANY && (n[i] = u(n[i], a));
							} else n[i] = a;
						}
					}
			}
		}
		function i(e, t) {
			if (t)
				for (var n in t) {
					var r = t[n];
					if (t.hasOwnProperty(n)) {
						var o = n in S;
						o ? g(!1) : void 0;
						var i = n in e;
						i ? g(!1) : void 0, (e[n] = r);
					}
				}
		}
		function a(e, t) {
			e && t && "object" === ("undefined" == typeof e ? "undefined" : p(e)) && "object" === ("undefined" == typeof t ? "undefined" : p(t)) ? void 0 : g(!1);
			for (var n in t) t.hasOwnProperty(n) && (void 0 !== e[n] ? g(!1) : void 0, (e[n] = t[n]));
			return e;
		}
		function s(e, t) {
			return function () {
				var n = e.apply(this, arguments),
					r = t.apply(this, arguments);
				if (null == n) return r;
				if (null == r) return n;
				var o = {};
				return a(o, n), a(o, r), o;
			};
		}
		function u(e, t) {
			return function () {
				e.apply(this, arguments), t.apply(this, arguments);
			};
		}
		function l(e, t) {
			var n = t.bind(e);
			return n;
		}
		function c(e) {
			for (var t = e.__reactAutoBindPairs, n = 0; n < t.length; n += 2) {
				var r = t[n],
					o = t[n + 1];
				e[r] = l(e, o);
			}
		}
		var p =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			d = n(4),
			f = n(79),
			h = n(12),
			v = (n(37), n(36), n(91)),
			m = n(31),
			g = n(1),
			y = n(32),
			b = n(20),
			_ = (n(2), b({ mixins: null })),
			C = y({ DEFINE_ONCE: null, DEFINE_MANY: null, OVERRIDE_BASE: null, DEFINE_MANY_MERGED: null }),
			E = [],
			k = {
				mixins: C.DEFINE_MANY,
				statics: C.DEFINE_MANY,
				propTypes: C.DEFINE_MANY,
				contextTypes: C.DEFINE_MANY,
				childContextTypes: C.DEFINE_MANY,
				getDefaultProps: C.DEFINE_MANY_MERGED,
				getInitialState: C.DEFINE_MANY_MERGED,
				getChildContext: C.DEFINE_MANY_MERGED,
				render: C.DEFINE_ONCE,
				componentWillMount: C.DEFINE_MANY,
				componentDidMount: C.DEFINE_MANY,
				componentWillReceiveProps: C.DEFINE_MANY,
				shouldComponentUpdate: C.DEFINE_ONCE,
				componentWillUpdate: C.DEFINE_MANY,
				componentDidUpdate: C.DEFINE_MANY,
				componentWillUnmount: C.DEFINE_MANY,
				updateComponent: C.OVERRIDE_BASE,
			},
			S = {
				displayName: function (e, t) {
					e.displayName = t;
				},
				mixins: function (e, t) {
					if (t) for (var n = 0; n < t.length; n++) o(e, t[n]);
				},
				childContextTypes: function (e, t) {
					e.childContextTypes = d({}, e.childContextTypes, t);
				},
				contextTypes: function (e, t) {
					e.contextTypes = d({}, e.contextTypes, t);
				},
				getDefaultProps: function (e, t) {
					e.getDefaultProps ? (e.getDefaultProps = s(e.getDefaultProps, t)) : (e.getDefaultProps = t);
				},
				propTypes: function (e, t) {
					e.propTypes = d({}, e.propTypes, t);
				},
				statics: function (e, t) {
					i(e, t);
				},
				autobind: function () {},
			},
			w = {
				replaceState: function (e, t) {
					this.updater.enqueueReplaceState(this, e), t && this.updater.enqueueCallback(this, t, "replaceState");
				},
				isMounted: function () {
					return this.updater.isMounted(this);
				},
			},
			P = function () {};
		d(P.prototype, f.prototype, w);
		var T = {
			createClass: function (e) {
				var t = function e(t, n, r) {
					this.__reactAutoBindPairs.length && c(this), (this.props = t), (this.context = n), (this.refs = m), (this.updater = r || v), (this.state = null);
					var o = this.getInitialState ? this.getInitialState() : null;
					"object" !== ("undefined" == typeof o ? "undefined" : p(o)) || Array.isArray(o) ? g(!1) : void 0, (this.state = o);
				};
				(t.prototype = new P()),
					(t.prototype.constructor = t),
					(t.prototype.__reactAutoBindPairs = []),
					E.forEach(o.bind(null, t)),
					o(t, e),
					t.getDefaultProps && (t.defaultProps = t.getDefaultProps()),
					t.prototype.render ? void 0 : g(!1);
				for (var n in k) t.prototype[n] || (t.prototype[n] = null);
				return t;
			},
			injection: {
				injectMixin: function (e) {
					E.push(e);
				},
			},
		};
		e.exports = T;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n) {
			(this.props = e), (this.context = t), (this.refs = a), (this.updater = n || i);
		}
		var o =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			i = n(91),
			a = (n(9), n(51), n(31)),
			s = n(1);
		n(2);
		(r.prototype.isReactComponent = {}),
			(r.prototype.setState = function (e, t) {
				"object" !== ("undefined" == typeof e ? "undefined" : o(e)) && "function" != typeof e && null != e ? s(!1) : void 0,
					this.updater.enqueueSetState(this, e),
					t && this.updater.enqueueCallback(this, t, "setState");
			}),
			(r.prototype.forceUpdate = function (e) {
				this.updater.enqueueForceUpdate(this), e && this.updater.enqueueCallback(this, e, "forceUpdate");
			});
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		var r = n(43),
			o = n(153),
			i = { processChildrenUpdates: o.dangerouslyProcessChildrenUpdates, replaceNodeWithMarkup: r.dangerouslyReplaceNodeWithMarkup, unmountIDFromEnvironment: function (e) {} };
		e.exports = i;
	},
	function (e, t) {
		"use strict";
		var n = { hasCachedChildNodes: 1 };
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			if (this._rootNodeID && this._wrapperState.pendingUpdate) {
				this._wrapperState.pendingUpdate = !1;
				var e = this._currentElement.props,
					t = u.getValue(e);
				null != t && o(this, Boolean(e.multiple), t);
			}
		}
		function o(e, t, n) {
			var r,
				o,
				i = l.getNodeFromInstance(e).options;
			if (t) {
				for (r = {}, o = 0; o < n.length; o++) r["" + n[o]] = !0;
				for (o = 0; o < i.length; o++) {
					var a = r.hasOwnProperty(i[o].value);
					i[o].selected !== a && (i[o].selected = a);
				}
			} else {
				for (r = "" + n, o = 0; o < i.length; o++) if (i[o].value === r) return void (i[o].selected = !0);
				i.length && (i[0].selected = !0);
			}
		}
		function i(e) {
			var t = this._currentElement.props,
				n = u.executeOnChange(t, e);
			return this._rootNodeID && (this._wrapperState.pendingUpdate = !0), c.asap(r, this), n;
		}
		var a = n(4),
			s = n(33),
			u = n(47),
			l = n(7),
			c = n(15),
			p = (n(2), !1),
			d = {
				getNativeProps: function (e, t) {
					return a({}, s.getNativeProps(e, t), { onChange: e._wrapperState.onChange, value: void 0 });
				},
				mountWrapper: function (e, t) {
					var n = u.getValue(t);
					(e._wrapperState = { pendingUpdate: !1, initialValue: null != n ? n : t.defaultValue, listeners: null, onChange: i.bind(e), wasMultiple: Boolean(t.multiple) }),
						void 0 === t.value || void 0 === t.defaultValue || p || (p = !0);
				},
				getSelectValueContext: function (e) {
					return e._wrapperState.initialValue;
				},
				postUpdateWrapper: function (e) {
					var t = e._currentElement.props;
					e._wrapperState.initialValue = void 0;
					var n = e._wrapperState.wasMultiple;
					e._wrapperState.wasMultiple = Boolean(t.multiple);
					var r = u.getValue(t);
					null != r
						? ((e._wrapperState.pendingUpdate = !1), o(e, Boolean(t.multiple), r))
						: n !== Boolean(t.multiple) && (null != t.defaultValue ? o(e, Boolean(t.multiple), t.defaultValue) : o(e, Boolean(t.multiple), t.multiple ? [] : ""));
				},
			};
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			if (d.current) {
				var e = d.current.getName();
				if (e) return " Check the render method of `" + e + "`.";
			}
			return "";
		}
		function o(e, t) {
			if (e._store && !e._store.validated && null == e.key) {
				e._store.validated = !0;
				i("uniqueKey", e, t);
			}
		}
		function i(e, t, n) {
			var o = r();
			if (!o) {
				var i = "string" == typeof n ? n : n.displayName || n.name;
				i && (o = " Check the top-level render call using <" + i + ">.");
			}
			var a = v[e] || (v[e] = {});
			if (a[o]) return null;
			a[o] = !0;
			var s = { parentOrOwner: o, url: " See https://fb.me/react-warning-keys for more information.", childOwner: null };
			return t && t._owner && t._owner !== d.current && (s.childOwner = " It was passed a child from " + t._owner.getName() + "."), s;
		}
		function a(e, t) {
			if ("object" === ("undefined" == typeof e ? "undefined" : l(e)))
				if (Array.isArray(e))
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						c.isValidElement(r) && o(r, t);
					}
				else if (c.isValidElement(e)) e._store && (e._store.validated = !0);
				else if (e) {
					var i = f(e);
					if (i && i !== e.entries) for (var a, s = i.call(e); !(a = s.next()).done; ) c.isValidElement(a.value) && o(a.value, t);
				}
		}
		function s(e, t, n, o) {
			for (var i in t)
				if (t.hasOwnProperty(i)) {
					var a;
					try {
						"function" != typeof t[i] ? h(!1) : void 0, (a = t[i](n, i, e, o));
					} catch (s) {
						a = s;
					}
					if (a instanceof Error && !(a.message in m)) {
						m[a.message] = !0;
						r();
					}
				}
		}
		function u(e) {
			var t = e.type;
			if ("function" == typeof t) {
				var n = t.displayName || t.name;
				t.propTypes && s(n, t.propTypes, e.props, p.prop), "function" == typeof t.getDefaultProps;
			}
		}
		var l =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			c = n(12),
			p = n(37),
			d = (n(36), n(22)),
			f = (n(51), n(56)),
			h = n(1),
			v = (n(2), {}),
			m = {},
			g = {
				createElement: function (e, t, n) {
					var r = "string" == typeof e || "function" == typeof e,
						o = c.createElement.apply(this, arguments);
					if (null == o) return o;
					if (r) for (var i = 2; i < arguments.length; i++) a(arguments[i], e);
					return u(o), o;
				},
				createFactory: function (e) {
					var t = g.createElement.bind(null, e);
					return (t.type = e), t;
				},
				cloneElement: function (e, t, n) {
					for (var r = c.cloneElement.apply(this, arguments), o = 2; o < arguments.length; o++) a(arguments[o], r.type);
					return u(r), r;
				},
			};
		e.exports = g;
	},
	function (e, t) {
		"use strict";
		var n,
			r = {
				injectEmptyComponentFactory: function (e) {
					n = e;
				},
			},
			o = {
				create: function (e) {
					return n(e);
				},
			};
		(o.injection = r), (e.exports = o);
	},
	function (e, t) {
		"use strict";
		var n = { logTopLevelRenders: !1 };
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return i(document.documentElement, e);
		}
		var o = n(157),
			i = n(116),
			a = n(67),
			s = n(68),
			u = {
				hasSelectionCapabilities: function (e) {
					var t = e && e.nodeName && e.nodeName.toLowerCase();
					return t && (("input" === t && "text" === e.type) || "textarea" === t || "true" === e.contentEditable);
				},
				getSelectionInformation: function () {
					var e = s();
					return { focusedElem: e, selectionRange: u.hasSelectionCapabilities(e) ? u.getSelection(e) : null };
				},
				restoreSelection: function (e) {
					var t = s(),
						n = e.focusedElem,
						o = e.selectionRange;
					t !== n && r(n) && (u.hasSelectionCapabilities(n) && u.setSelection(n, o), a(n));
				},
				getSelection: function (e) {
					var t;
					if ("selectionStart" in e) t = { start: e.selectionStart, end: e.selectionEnd };
					else if (document.selection && e.nodeName && "input" === e.nodeName.toLowerCase()) {
						var n = document.selection.createRange();
						n.parentElement() === e && (t = { start: -n.moveStart("character", -e.value.length), end: -n.moveEnd("character", -e.value.length) });
					} else t = o.getOffsets(e);
					return t || { start: 0, end: 0 };
				},
				setSelection: function (e, t) {
					var n = t.start,
						r = t.end;
					if ((void 0 === r && (r = n), "selectionStart" in e)) (e.selectionStart = n), (e.selectionEnd = Math.min(r, e.value.length));
					else if (document.selection && e.nodeName && "input" === e.nodeName.toLowerCase()) {
						var i = e.createTextRange();
						i.collapse(!0), i.moveStart("character", n), i.moveEnd("character", r - n), i.select();
					} else o.setOffsets(e, t);
				},
			};
		e.exports = u;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) if (e.charAt(r) !== t.charAt(r)) return r;
			return e.length === t.length ? -1 : n;
		}
		function o(e) {
			return e ? (e.nodeType === I ? e.documentElement : e.firstChild) : null;
		}
		function i(e) {
			return (e.getAttribute && e.getAttribute(O)) || "";
		}
		function a(e, t, n, r, o) {
			var i;
			if (b.logTopLevelRenders) {
				var a = e._currentElement.props,
					s = a.type;
				i = "React mount: " + ("string" == typeof s ? s : s.displayName || s.name);
			}
			var u = C.mountComponent(e, n, null, m(e, t), o);
			(e._renderedComponent._topLevelWrapper = e), U._mountImageIntoNode(u, t, e, r, n);
		}
		function s(e, t, n, r) {
			var o = k.ReactReconcileTransaction.getPooled(!n && g.useCreateElement);
			o.perform(a, null, e, t, o, n, r), k.ReactReconcileTransaction.release(o);
		}
		function u(e, t, n) {
			for (C.unmountComponent(e, n), t.nodeType === I && (t = t.documentElement); t.lastChild; ) t.removeChild(t.lastChild);
		}
		function l(e) {
			var t = o(e);
			if (t) {
				var n = v.getInstanceFromNode(t);
				return !(!n || !n._nativeParent);
			}
		}
		function c(e) {
			var t = o(e),
				n = t && v.getInstanceFromNode(t);
			return n && !n._nativeParent ? n : null;
		}
		function p(e) {
			var t = c(e);
			return t ? t._nativeContainerInfo._topLevelWrapper : null;
		}
		var d = n(24),
			f = n(23),
			h = n(35),
			v = (n(22), n(7)),
			m = n(148),
			g = n(152),
			y = n(12),
			b = n(85),
			_ = (n(9), n(168)),
			C = n(25),
			E = n(93),
			k = n(15),
			S = n(31),
			w = n(100),
			P = n(1),
			T = n(58),
			M = n(59),
			O = (n(2), f.ID_ATTRIBUTE_NAME),
			N = f.ROOT_ATTRIBUTE_NAME,
			x = 1,
			I = 9,
			D = 11,
			A = {},
			R = 1,
			L = function () {
				this.rootID = R++;
			};
		(L.prototype.isReactComponent = {}),
			(L.prototype.render = function () {
				return this.props;
			});
		var U = {
			TopLevelWrapper: L,
			_instancesByReactRootID: A,
			scrollMonitor: function (e, t) {
				t();
			},
			_updateRootComponent: function (e, t, n, r) {
				return (
					U.scrollMonitor(n, function () {
						E.enqueueElementInternal(e, t), r && E.enqueueCallbackInternal(e, r);
					}),
					e
				);
			},
			_renderNewRootComponent: function (e, t, n, r) {
				!t || (t.nodeType !== x && t.nodeType !== I && t.nodeType !== D) ? P(!1) : void 0, h.ensureScrollValueMonitoring();
				var o = w(e);
				return k.batchedUpdates(s, o, t, n, r), (A[o._instance.rootID] = o), o;
			},
			renderSubtreeIntoContainer: function (e, t, n, r) {
				return null == e || null == e._reactInternalInstance ? P(!1) : void 0, U._renderSubtreeIntoContainer(e, t, n, r);
			},
			_renderSubtreeIntoContainer: function (e, t, n, r) {
				E.validateCallback(r, "ReactDOM.render"), y.isValidElement(t) ? void 0 : P(!1);
				var a = y(L, null, null, null, null, null, t),
					s = p(n);
				if (s) {
					if (M(s._currentElement.props, t)) {
						var u = s._renderedComponent.getPublicInstance(),
							c =
								r &&
								function () {
									r.call(u);
								};
						return U._updateRootComponent(s, a, n, c), u;
					}
					U.unmountComponentAtNode(n);
				}
				var d = o(n),
					f = d && !!i(d),
					h = l(n),
					v = f && !s && !h,
					m = U._renderNewRootComponent(
						a,
						n,
						v,
						null != e ? e._reactInternalInstance._processChildContext(e._reactInternalInstance._context) : S
					)._renderedComponent.getPublicInstance();
				return r && r.call(m), m;
			},
			render: function (e, t, n) {
				return U._renderSubtreeIntoContainer(null, e, t, n);
			},
			unmountComponentAtNode: function (e) {
				!e || (e.nodeType !== x && e.nodeType !== I && e.nodeType !== D) ? P(!1) : void 0;
				var t = p(e);
				if (!t) {
					l(e), 1 === e.nodeType && e.hasAttribute(N);
					return !1;
				}
				return delete A[t._instance.rootID], k.batchedUpdates(u, t, e, !1), !0;
			},
			_mountImageIntoNode: function (e, t, n, i, a) {
				if ((!t || (t.nodeType !== x && t.nodeType !== I && t.nodeType !== D) ? P(!1) : void 0, i)) {
					var s = o(t);
					if (_.canReuseMarkup(e, s)) return void v.precacheNode(n, s);
					var u = s.getAttribute(_.CHECKSUM_ATTR_NAME);
					s.removeAttribute(_.CHECKSUM_ATTR_NAME);
					var l = s.outerHTML;
					s.setAttribute(_.CHECKSUM_ATTR_NAME, u);
					var c = e,
						p = r(c, l);
					" (client) " + c.substring(p - 20, p + 20) + "\n (server) " + l.substring(p - 20, p + 20);
					t.nodeType === I ? P(!1) : void 0;
				}
				if ((t.nodeType === I ? P(!1) : void 0, a.useCreateElement)) {
					for (; t.lastChild; ) t.removeChild(t.lastChild);
					d.insertTreeBefore(t, e, null);
				} else T(t, e), v.precacheNode(n, t.firstChild);
			},
		};
		e.exports = U;
	},
	function (e, t, n) {
		"use strict";
		var r = n(32),
			o = r({ INSERT_MARKUP: null, MOVE_EXISTING: null, REMOVE_NODE: null, SET_MARKUP: null, TEXT_CONTENT: null });
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			if ("function" == typeof e.type) return e.type;
			var t = e.type,
				n = p[t];
			return null == n && (p[t] = n = l(t)), n;
		}
		function o(e) {
			return c ? void 0 : u(!1), new c(e);
		}
		function i(e) {
			return new d(e);
		}
		function a(e) {
			return e instanceof d;
		}
		var s = n(4),
			u = n(1),
			l = null,
			c = null,
			p = {},
			d = null,
			f = {
				injectGenericComponentClass: function (e) {
					c = e;
				},
				injectTextComponentClass: function (e) {
					d = e;
				},
				injectComponentClasses: function (e) {
					s(p, e);
				},
			},
			h = { getComponentClassForElement: r, createInternalComponent: o, createInstanceForText: i, isTextComponent: a, injection: f };
		e.exports = h;
	},
	function (e, t, n) {
		"use strict";
		var r = n(12),
			o = n(1),
			i = {
				NATIVE: 0,
				COMPOSITE: 1,
				EMPTY: 2,
				getType: function (e) {
					return null === e || e === !1 ? i.EMPTY : r.isValidElement(e) ? ("function" == typeof e.type ? i.COMPOSITE : i.NATIVE) : void o(!1);
				},
			};
		e.exports = i;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {}
		var o =
			(n(2),
			{
				isMounted: function (e) {
					return !1;
				},
				enqueueCallback: function (e, t) {},
				enqueueForceUpdate: function (e) {
					r(e, "forceUpdate");
				},
				enqueueReplaceState: function (e, t) {
					r(e, "replaceState");
				},
				enqueueSetState: function (e, t) {
					r(e, "setState");
				},
			});
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			return e === t ? 0 !== e || 1 / e === 1 / t : e !== e && t !== t;
		}
		function o(e) {
			function t(t, n, r, o, i, a) {
				if (((o = o || S), (a = a || r), null == n[r])) {
					var s = C[i];
					return t ? new Error("Required " + s + " `" + a + "` was not specified in " + ("`" + o + "`.")) : null;
				}
				return e(n, r, o, i, a);
			}
			var n = t.bind(null, !1);
			return (n.isRequired = t.bind(null, !0)), n;
		}
		function i(e) {
			function t(t, n, r, o, i) {
				var a = t[n];
				if (m(a) !== e) {
					var s = C[o],
						u = g(a);
					return new Error("Invalid " + s + " `" + i + "` of type " + ("`" + u + "` supplied to `" + r + "`, expected ") + ("`" + e + "`."));
				}
				return null;
			}
			return o(t);
		}
		function a() {
			return o(E.thatReturns(null));
		}
		function s(e) {
			function t(t, n, r, o, i) {
				if ("function" != typeof e) return new Error("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside arrayOf.");
				var a = t[n];
				if (!Array.isArray(a)) {
					var s = C[o],
						u = m(a);
					return new Error("Invalid " + s + " `" + i + "` of type " + ("`" + u + "` supplied to `" + r + "`, expected an array."));
				}
				for (var l = 0; l < a.length; l++) {
					var c = e(a, l, r, o, i + "[" + l + "]");
					if (c instanceof Error) return c;
				}
				return null;
			}
			return o(t);
		}
		function u() {
			function e(e, t, n, r, o) {
				if (!_.isValidElement(e[t])) {
					var i = C[r];
					return new Error("Invalid " + i + " `" + o + "` supplied to " + ("`" + n + "`, expected a single ReactElement."));
				}
				return null;
			}
			return o(e);
		}
		function l(e) {
			function t(t, n, r, o, i) {
				if (!(t[n] instanceof e)) {
					var a = C[o],
						s = e.name || S,
						u = y(t[n]);
					return new Error("Invalid " + a + " `" + i + "` of type " + ("`" + u + "` supplied to `" + r + "`, expected ") + ("instance of `" + s + "`."));
				}
				return null;
			}
			return o(t);
		}
		function c(e) {
			function t(t, n, o, i, a) {
				for (var s = t[n], u = 0; u < e.length; u++) if (r(s, e[u])) return null;
				var l = C[i],
					c = JSON.stringify(e);
				return new Error("Invalid " + l + " `" + a + "` of value `" + s + "` " + ("supplied to `" + o + "`, expected one of " + c + "."));
			}
			return o(
				Array.isArray(e)
					? t
					: function () {
							return new Error("Invalid argument supplied to oneOf, expected an instance of array.");
					  }
			);
		}
		function p(e) {
			function t(t, n, r, o, i) {
				if ("function" != typeof e) return new Error("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside objectOf.");
				var a = t[n],
					s = m(a);
				if ("object" !== s) {
					var u = C[o];
					return new Error("Invalid " + u + " `" + i + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected an object."));
				}
				for (var l in a)
					if (a.hasOwnProperty(l)) {
						var c = e(a, l, r, o, i + "." + l);
						if (c instanceof Error) return c;
					}
				return null;
			}
			return o(t);
		}
		function d(e) {
			function t(t, n, r, o, i) {
				for (var a = 0; a < e.length; a++) {
					if (null == (0, e[a])(t, n, r, o, i)) return null;
				}
				var s = C[o];
				return new Error("Invalid " + s + " `" + i + "` supplied to " + ("`" + r + "`."));
			}
			return o(
				Array.isArray(e)
					? t
					: function () {
							return new Error("Invalid argument supplied to oneOfType, expected an instance of array.");
					  }
			);
		}
		function f() {
			function e(e, t, n, r, o) {
				if (!v(e[t])) {
					var i = C[r];
					return new Error("Invalid " + i + " `" + o + "` supplied to " + ("`" + n + "`, expected a ReactNode."));
				}
				return null;
			}
			return o(e);
		}
		function h(e) {
			function t(t, n, r, o, i) {
				var a = t[n],
					s = m(a);
				if ("object" !== s) {
					var u = C[o];
					return new Error("Invalid " + u + " `" + i + "` of type `" + s + "` " + ("supplied to `" + r + "`, expected `object`."));
				}
				for (var l in e) {
					var c = e[l];
					if (c) {
						var p = c(a, l, r, o, i + "." + l);
						if (p) return p;
					}
				}
				return null;
			}
			return o(t);
		}
		function v(e) {
			switch ("undefined" == typeof e ? "undefined" : b(e)) {
				case "number":
				case "string":
				case "undefined":
					return !0;
				case "boolean":
					return !e;
				case "object":
					if (Array.isArray(e)) return e.every(v);
					if (null === e || _.isValidElement(e)) return !0;
					var t = k(e);
					if (!t) return !1;
					var n,
						r = t.call(e);
					if (t !== e.entries) {
						for (; !(n = r.next()).done; ) if (!v(n.value)) return !1;
					} else
						for (; !(n = r.next()).done; ) {
							var o = n.value;
							if (o && !v(o[1])) return !1;
						}
					return !0;
				default:
					return !1;
			}
		}
		function m(e) {
			var t = "undefined" == typeof e ? "undefined" : b(e);
			return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : t;
		}
		function g(e) {
			var t = m(e);
			if ("object" === t) {
				if (e instanceof Date) return "date";
				if (e instanceof RegExp) return "regexp";
			}
			return t;
		}
		function y(e) {
			return e.constructor && e.constructor.name ? e.constructor.name : S;
		}
		var b =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			_ = n(12),
			C = n(36),
			E = n(10),
			k = n(56),
			S = "<<anonymous>>",
			w = {
				array: i("array"),
				bool: i("boolean"),
				func: i("function"),
				number: i("number"),
				object: i("object"),
				string: i("string"),
				any: a(),
				arrayOf: s,
				element: u(),
				instanceOf: l,
				node: f(),
				objectOf: p,
				oneOf: c,
				oneOfType: d,
				shape: h,
			};
		e.exports = w;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			a.enqueueUpdate(e);
		}
		function o(e, t) {
			var n = i.get(e);
			return n ? n : null;
		}
		var i =
				("function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
				n(22),
				n(50)),
			a = n(15),
			s = n(1),
			u =
				(n(2),
				{
					isMounted: function (e) {
						var t = i.get(e);
						return !!t && !!t._renderedComponent;
					},
					enqueueCallback: function (e, t, n) {
						u.validateCallback(t, n);
						var i = o(e);
						return i ? (i._pendingCallbacks ? i._pendingCallbacks.push(t) : (i._pendingCallbacks = [t]), void r(i)) : null;
					},
					enqueueCallbackInternal: function (e, t) {
						e._pendingCallbacks ? e._pendingCallbacks.push(t) : (e._pendingCallbacks = [t]), r(e);
					},
					enqueueForceUpdate: function (e) {
						var t = o(e, "forceUpdate");
						t && ((t._pendingForceUpdate = !0), r(t));
					},
					enqueueReplaceState: function (e, t) {
						var n = o(e, "replaceState");
						n && ((n._pendingStateQueue = [t]), (n._pendingReplaceState = !0), r(n));
					},
					enqueueSetState: function (e, t) {
						var n = o(e, "setState");
						if (n) {
							(n._pendingStateQueue || (n._pendingStateQueue = [])).push(t), r(n);
						}
					},
					enqueueElementInternal: function (e, t) {
						(e._pendingElement = t), r(e);
					},
					validateCallback: function (e, t) {
						e && "function" != typeof e ? s(!1) : void 0;
					},
				});
		e.exports = u;
	},
	function (e, t) {
		"use strict";
		e.exports = "15.1.0";
	},
	function (e, t) {
		"use strict";
		var n = {
			currentScrollLeft: 0,
			currentScrollTop: 0,
			refreshScrollValues: function (e) {
				(n.currentScrollLeft = e.x), (n.currentScrollTop = e.y);
			},
		};
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			if ((null == t ? o(!1) : void 0, null == e)) return t;
			var n = Array.isArray(e),
				r = Array.isArray(t);
			return n && r ? (e.push.apply(e, t), e) : n ? (e.push(t), e) : r ? [e].concat(t) : [e, t];
		}
		var o = n(1);
		e.exports = r;
	},
	function (e, t) {
		"use strict";
		var n = function (e, t, n) {
			Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
		};
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			for (var t; (t = e._renderedNodeType) === o.COMPOSITE; ) e = e._renderedComponent;
			return t === o.NATIVE ? e._renderedComponent : t === o.EMPTY ? null : void 0;
		}
		var o = n(90);
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			return !i && o.canUseDOM && (i = "textContent" in document.documentElement ? "textContent" : "innerText"), i;
		}
		var o = n(8),
			i = null;
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return "function" == typeof e && "undefined" != typeof e.prototype && "function" == typeof e.prototype.mountComponent && "function" == typeof e.prototype.receiveComponent;
		}
		function o(e) {
			var t,
				n = null === e || e === !1;
			if (n) t = u.create(o);
			else if ("object" === ("undefined" == typeof e ? "undefined" : i(e))) {
				var a = e;
				!a || ("function" != typeof a.type && "string" != typeof a.type) ? c(!1) : void 0,
					(t = "string" == typeof a.type ? l.createInternalComponent(a) : r(a.type) ? new a.type(a) : new p(a));
			} else "string" == typeof e || "number" == typeof e ? (t = l.createInstanceForText(e)) : c(!1);
			(t._mountIndex = 0), (t._mountImage = null);
			return t;
		}
		var i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			a = n(4),
			s = n(144),
			u = n(84),
			l = n(89),
			c = (n(9), n(1)),
			p =
				(n(2),
				function (e) {
					this.construct(e);
				});
		a(p.prototype, s.Mixin, { _instantiateReactComponent: o });
		e.exports = o;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (("input" === t && r[e.type]) || "textarea" === t);
		}
		var r = {
			color: !0,
			date: !0,
			datetime: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0,
		};
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		var r = n(8),
			o = n(40),
			i = n(58),
			a = function (e, t) {
				e.textContent = t;
			};
		r.canUseDOM &&
			("textContent" in document.documentElement ||
				(a = function (e, t) {
					i(e, o(t));
				})),
			(e.exports = a);
	},
	function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", { value: !0 });
		var n = {
			EMPTY_OPTION_TEXT: "--",
			EMPTY_OPTION_VALUE: -2,
			ALWAYS_ASK_OPTION_VALUE: -1,
			_callbacks: { outgoingCall: [], outgoingMessages: [], outgoingData: [] },
			observe: function (e, t) {
				var n = this._callbacks[e];
				n && n.push(t);
			},
			unobserve: function (e, t) {
				var n = this._callbacks[e];
				if (n) {
					var r = n.indexOf(t);
					r > -1 && n.splice(r, 1);
				}
			},
			getCardIndexFrom: function (e, t) {
				this._get(e)._onWhichCard(t);
			},
			_get: function (e) {
				switch (((this.settingKeys = []), e)) {
					case "outgoingCall":
						this.settingKeys.push("ril.telephony.defaultServiceId");
						break;
					case "outgoingMessages":
						this.settingKeys.push("ril.sms.defaultServiceId");
						break;
					case "outgoingData":
						this.settingKeys.push("ril.data.defaultServiceId");
				}
				return this;
			},
			_onWhichCard: function (e) {
				this.settingKeys.forEach(
					function (t) {
						this._getFromSettingsDB(t, e);
					}.bind(this)
				);
			},
			_getFromSettingsDB: function (e, t) {
				var n = window.navigator.mozSettings,
					r = n.createLock().get(e),
					o = function () {
						if (t) {
							t((r.result && r.result[e]) || 0);
						}
					};
				(r.onsuccess = o), (r.onerror = o);
			},
			setServiceOnCard: function (e, t) {
				this._set(e)._on(+t);
			},
			_set: function (e) {
				switch (((this.settingKeys = []), e)) {
					case "outgoingCall":
						this.settingKeys.push("ril.telephony.defaultServiceId"), this.settingKeys.push("ril.voicemail.defaultServiceId");
						break;
					case "outgoingMessages":
						this.settingKeys.push("ril.sms.defaultServiceId");
						break;
					case "outgoingData":
						this.settingKeys.push("ril.mms.defaultServiceId"), this.settingKeys.push("ril.data.defaultServiceId");
				}
				return this;
			},
			_on: function (e) {
				this.settingKeys.forEach(
					function (t) {
						this._setToSettingsDB(t, e);
					}.bind(this)
				);
			},
			_setToSettingsDB: function (e, t, n) {
				var r = function () {
						n && n();
					},
					o = window.navigator.mozSettings,
					i = o.createLock().get(e);
				(i.onsuccess = function () {
					if (i.result[e] !== t) {
						var n = {};
						n[e] = t;
						var a = o.createLock().set(n);
						(a.onsuccess = r), (a.onerror = r);
					} else r();
				}),
					(i.onerror = r);
			},
			_addSettingsObservers: function () {
				var e = this;
				navigator.mozSettings.addObserver("ril.telephony.defaultServiceId", function (t) {
					e._callbacks.outgoingCall.forEach(function (e) {
						e(t.settingValue);
					});
				}),
					navigator.mozSettings.addObserver("ril.sms.defaultServiceId", function (t) {
						e._callbacks.outgoingMessages.forEach(function (e) {
							e(t.settingValue);
						});
					}),
					navigator.mozSettings.addObserver("ril.data.defaultServiceId", function (t) {
						e._callbacks.outgoingData.forEach(function (e) {
							e(t.settingValue);
						});
					});
			},
		};
		n._addSettingsObservers(), (t.default = n);
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = n(14),
			l = r(u),
			c = n(197),
			p = r(c),
			d = navigator.mozIccManager,
			f = (function (e) {
				function t() {
					var e, n, r, a;
					o(this, t);
					for (var s = arguments.length, u = Array(s), l = 0; l < s; l++) u[l] = arguments[l];
					return (
						(n = r = i(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(u)))),
						(r.length = 0),
						(r._instances = []),
						(r.TIMEOUT_FOR_SIM2 = 2e3),
						(r._timerForSIM2 = null),
						(r.ready = !1),
						(a = n),
						i(r, a)
					);
				}
				return (
					a(t, e),
					s(t, [
						{
							key: "start",
							value: function () {
								d &&
									((this._conns = Array.prototype.slice.call(navigator.mozMobileConnections)),
									(this.length = this._conns.length),
									0 !== this._conns.length &&
										(this._conns.forEach(function (e, t) {
											this._instances.push(new p.default(e, t, d.getIccById(e.iccId)));
										}, this),
										d.iccIds.length === this._conns.length ? this.publishSIMSlotIsReady() : d.addEventListener("iccdetected", this)));
							},
						},
						{
							key: "isMultiSIM",
							value: function () {
								return this.length > 1;
							},
						},
						{
							key: "isSIMCardAbsent",
							value: function (e) {
								var t = this.get(e);
								return !t || t.isAbsent();
							},
						},
						{
							key: "hasOnlyOneSIMCardDetected",
							value: function () {
								var e = this.isSIMCardAbsent(0),
									t = this.isSIMCardAbsent(1);
								return (e && !t) || (!e && t);
							},
						},
						{
							key: "noSIMCardOnDevice",
							value: function () {
								return !d || !d.iccIds || 0 === d.iccIds.length;
							},
						},
						{
							key: "noSIMCardConnectedToNetwork",
							value: function () {
								return (
									!d ||
									!d.iccIds ||
									this._instances.every(function (e) {
										return e.conn.voice && e.conn.voice.emergencyCallsOnly;
									})
								);
							},
						},
						{
							key: "get",
							value: function (e) {
								return e > this.length - 1 ? null : this._instances[e];
							},
						},
						{
							key: "getMobileConnection",
							value: function (e) {
								return e > this.length - 1 ? null : this._instances[e].conn;
							},
						},
						{
							key: "getSlots",
							value: function () {
								return this._instances;
							},
						},
						{
							key: "getSlotByIccId",
							value: function (e) {
								var t = null;
								return (
									this._instances.some(function (n) {
										return !(!n.conn.iccId || n.conn.iccId !== e) && ((t = n), !0);
									}, this),
									t
								);
							},
						},
						{
							key: "waitForSecondSIM",
							value: function () {
								var e = this;
								this._timerForSIM2 = setTimeout(function () {
									clearTimeout(e._timerForSIM2), e.publishSIMSlotIsReady();
								}, this.TIMEOUT_FOR_SIM2);
							},
						},
						{
							key: "publishSIMSlotIsReady",
							value: function () {
								this.ready || ((this.ready = !0), window.dispatchEvent(new CustomEvent("simslotready")));
							},
						},
						{
							key: "_handle_iccdetected",
							value: function (e) {
								var t = this.getSlotByIccId(e.iccId);
								t &&
									(t.update(d.getIccById(e.iccId)),
									this.isMultiSIM()
										? this.hasOnlyOneSIMCardDetected()
											? this.waitForSecondSIM()
											: (clearTimeout(this._timerForSIM2), this.publishSIMSlotIsReady())
										: this.publishSIMSlotIsReady());
							},
						},
					]),
					t
				);
			})(l.default),
			h = new f();
		h.start(), (t.default = h);
	},
	,
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
					}
					return e;
				},
			u = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			l = n(3),
			c = r(l),
			p = n(6),
			d = r(p),
			f = n(5),
			h = r(f),
			v = n(132),
			m = r(v);
		n(229);
		var g = (function (e) {
			function t(e) {
				o(this, t);
				var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return (
					(n.name = "DialogRenderer"),
					(n.closeDialog = function () {
						(n.isHidden = !0), n.focusLast(), n.dialog.off("closed", n.closeDialog);
					}),
					(n.state = { dialog: !1, options: {} }),
					h.default.register("showDialog", n),
					h.default.register("hideDialog", n),
					h.default.registerState("isHidden", n),
					(n.isHidden = !0),
					n
				);
			}
			return (
				a(t, e),
				u(t, [
					{
						key: "showDialog",
						value: function (e) {
							var t = this;
							(this.lastActive = this.lastActive || document.activeElement),
								this.setState({ dialog: !0, options: e }, function () {
									"prompt" === e.type ? (t.dialog.element.classList.add("prompt"), t.dialog.element.querySelector("input").select()) : t.dialog.element.classList.remove("prompt");
								}),
								(this.isHidden = !1);
						},
					},
					{
						key: "hideDialog",
						value: function () {
							this.dialog.hide();
						},
					},
					{
						key: "focusLast",
						value: function () {
							this.lastActive && this.lastActive.offsetParent && document.hasFocus() ? this.lastActive.focus() : h.default.request(h.default.query("App.lastSheet") + ":show"),
								(this.lastActive = null);
						},
					},
					{
						key: "componentDidUpdate",
						value: function () {
							this.dialog.show(), this.dialog.off("closed", this.closeDialog), this.dialog.on("closed", this.closeDialog);
						},
					},
					{
						key: "render",
						value: function () {
							var e = this;
							return c.default.createElement(
								"div",
								{ id: "dialog-root", className: "dialog-root " + (this.state.options.otherClass || "") },
								this.state.dialog &&
									c.default.createElement(
										m.default,
										s(
											{
												ref: function (t) {
													e.dialog = t;
												},
											},
											this.state.options
										)
									)
							);
						},
					},
				]),
				t
			);
		})(d.default);
		t.default = g;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = n(3),
			l = r(u),
			c = n(6),
			p = r(c),
			d = n(71),
			f = r(d),
			h = n(5),
			v = r(h),
			m = (function (e) {
				function t(e) {
					o(this, t);
					var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.name = "OptionMenuRenderer"), (n.state = { menu: !1, options: null }), v.default.register("showOptionMenu", n), n;
				}
				return (
					a(t, e),
					s(t, [
						{
							key: "showOptionMenu",
							value: function (e) {
								(this.lastActive = this.lastActive || document.activeElement), this.setState({ menu: !0, options: e });
							},
						},
						{
							key: "focusLast",
							value: function () {
								this.lastActive && this.lastActive.offsetParent && this.lastActive.focus(), (this.lastActive = null);
							},
						},
						{
							key: "componentDidUpdate",
							value: function () {
								if (this.menu) {
									var e = this;
									this.menu.show(this.state.options),
										this.menu.on("closed", function t() {
											e.focusLast(), e.menu.off("closed", t);
										});
								} else v.default.request("focus");
							},
						},
						{
							key: "render",
							value: function () {
								var e = this;
								return l.default.createElement(
									"div",
									{ id: "menu-root" },
									this.state.menu
										? l.default.createElement(f.default, {
												ref: function (t) {
													e.menu = t;
												},
										  })
										: null
								);
							},
						},
					]),
					t
				);
			})(p.default);
		t.default = m;
	},
	,
	,
	,
	function (e, t) {},
	111,
	,
	function (e, t) {
		"use strict";
		function n(e) {
			return e.replace(r, function (e, t) {
				return t.toUpperCase();
			});
		}
		var r = /-(.)/g;
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return o(e.replace(i, "ms-"));
		}
		var o = n(114),
			i = /^-ms-/;
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			return (
				!(!e || !t) && (e === t || (!o(e) && (o(t) ? r(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t)))))
			);
		}
		var o = n(123);
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			var t = e.length;
			if (
				(Array.isArray(e) || ("object" !== ("undefined" == typeof e ? "undefined" : a(e)) && "function" != typeof e) ? s(!1) : void 0,
				"number" != typeof t ? s(!1) : void 0,
				0 === t || t - 1 in e ? void 0 : s(!1),
				"function" == typeof e.callee ? s(!1) : void 0,
				e.hasOwnProperty)
			)
				try {
					return Array.prototype.slice.call(e);
				} catch (n) {}
			for (var r = Array(t), o = 0; o < t; o++) r[o] = e[o];
			return r;
		}
		function o(e) {
			return (
				!!e &&
				("object" == ("undefined" == typeof e ? "undefined" : a(e)) || "function" == typeof e) &&
				"length" in e &&
				!("setInterval" in e) &&
				"number" != typeof e.nodeType &&
				(Array.isArray(e) || "callee" in e || "item" in e)
			);
		}
		function i(e) {
			return o(e) ? (Array.isArray(e) ? e.slice() : r(e)) : [e];
		}
		var a =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			s = n(1);
		e.exports = i;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			var t = e.match(c);
			return t && t[1].toLowerCase();
		}
		function o(e, t) {
			var n = l;
			l ? void 0 : u(!1);
			var o = r(e),
				i = o && s(o);
			if (i) {
				n.innerHTML = i[1] + e + i[2];
				for (var c = i[0]; c--; ) n = n.lastChild;
			} else n.innerHTML = e;
			var p = n.getElementsByTagName("script");
			p.length && (t ? void 0 : u(!1), a(p).forEach(t));
			for (var d = Array.from(n.childNodes); n.lastChild; ) n.removeChild(n.lastChild);
			return d;
		}
		var i = n(8),
			a = n(117),
			s = n(69),
			u = n(1),
			l = i.canUseDOM ? document.createElement("div") : null,
			c = /^\s*<(\w+)/;
		e.exports = o;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			return e.Window && e instanceof e.Window
				? { x: e.pageXOffset || e.document.documentElement.scrollLeft, y: e.pageYOffset || e.document.documentElement.scrollTop }
				: { x: e.scrollLeft, y: e.scrollTop };
		}
		e.exports = n;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			return e.replace(r, "-$1").toLowerCase();
		}
		var r = /([A-Z])/g;
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return o(e).replace(i, "-ms-");
		}
		var o = n(120),
			i = /^ms-/;
		e.exports = r;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t = e ? e.ownerDocument || e : document,
				n = t.defaultView || window;
			return !(
				!e ||
				!("function" == typeof n.Node
					? e instanceof n.Node
					: "object" === ("undefined" == typeof e ? "undefined" : r(e)) && "number" == typeof e.nodeType && "string" == typeof e.nodeName)
			);
		}
		var r =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (e) {
						return typeof e;
				  }
				: function (e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				  };
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return o(e) && 3 == e.nodeType;
		}
		var o = n(122);
		e.exports = r;
	},
	function (e, t) {
		"use strict";
		function n(e, t, n) {
			if (!e) return null;
			var o = {};
			for (var i in e) r.call(e, i) && (o[i] = t.call(n, e[i], i, e));
			return o;
		}
		var r = Object.prototype.hasOwnProperty;
		e.exports = n;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			var t = {};
			return function (n) {
				return t.hasOwnProperty(n) || (t[n] = e.call(this, n)), t[n];
			};
		}
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		var r,
			o = n(8);
		o.canUseDOM && (r = window.performance || window.msPerformance || window.webkitPerformance), (e.exports = r || {});
	},
	function (e, t, n) {
		"use strict";
		var r,
			o = n(126);
		(r = o.now
			? function () {
					return o.now();
			  }
			: function () {
					return Date.now();
			  }),
			(e.exports = r);
	},
	,
	function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", { value: !0 });
		var n = {
			BRAZIL_MCC: "724",
			BRAZIL_CELLBROADCAST_CHANNEL: 50,
			MOBILE_INFO: {
				brazil: {
					carriers: {
						"00": "NEXTEL",
						"02": "TIM",
						"03": "TIM",
						"04": "TIM",
						"05": "CLARO",
						"06": "VIVO",
						"07": "CTBC",
						"08": "TIM",
						10: "VIVO",
						11: "VIVO",
						15: "SERCOMTEL",
						16: "OI",
						23: "VIVO",
						24: "OI",
						31: "OI",
						32: "CTBC",
						33: "CTBC",
						34: "CTBC",
						37: "AEIOU",
					},
					regions: {
						11: "SP",
						12: "SP",
						13: "SP",
						14: "SP",
						15: "SP",
						16: "SP",
						17: "SP",
						18: "SP",
						19: "SP",
						21: "RJ",
						22: "RJ",
						24: "RJ",
						27: "ES",
						28: "ES",
						31: "MG",
						32: "MG",
						33: "MG",
						34: "MG",
						35: "MG",
						37: "MG",
						38: "MG",
						41: "PR",
						42: "PR",
						43: "PR",
						44: "PR",
						45: "PR",
						46: "PR",
						47: "SC",
						48: "SC",
						49: "SC",
						51: "RS",
						53: "RS",
						54: "RS",
						55: "RS",
						61: "DF",
						62: "GO",
						63: "TO",
						64: "GO",
						65: "MT",
						66: "MT",
						67: "MS",
						68: "AC",
						69: "RO",
						71: "BA",
						73: "BA",
						74: "BA",
						75: "BA",
						77: "BA",
						79: "SE",
						81: "PE",
						82: "AL",
						83: "PB",
						84: "RN",
						85: "CE",
						86: "PI",
						87: "PE",
						88: "CE",
						89: "PI",
						91: "PA",
						92: "AM",
						93: "PA",
						94: "PA",
						95: "RR",
						96: "AP",
						97: "AM",
						98: "MA",
						99: "MA",
					},
				},
			},
			userFacingInfo: function (e) {
				var t = e.voice.network,
					n = e.iccId,
					r = navigator.mozIccManager.getIccById(n),
					o = r ? r.iccInfo : null,
					i = t ? t.shortName || t.longName : null;
				i && o && o.isDisplaySpnRequired && o.spn && (i = o.isDisplayNetworkNameRequired && i !== o.spn ? i + " " + o.spn : o.spn);
				var a, s;
				if (this.isBrazil(e)) {
					var u = e.voice.cell.gsmLocationAreaCode % 100,
						l = this.MOBILE_INFO.brazil.carriers,
						c = this.MOBILE_INFO.brazil.regions;
					(a = l[t.mnc] || this.BRAZIL_MCC + t.mnc), (s = c[u] ? c[u] + " " + u : "");
				}
				return { operator: i, carrier: a, region: s };
			},
			isBrazil: function (e) {
				var t = e.voice.cell,
					n = e.voice.network;
				return n ? n.mcc === this.BRAZIL_MCC && t && t.gsmLocationAreaCode : null;
			},
			getMobileInfo: function () {
				return this.MOBILE_INFO;
			},
		};
		t.default = n;
	},
	,
	,
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = function e(t, n, r) {
				null === t && (t = Function.prototype);
				var o = Object.getOwnPropertyDescriptor(t, n);
				if (void 0 === o) {
					var i = Object.getPrototypeOf(t);
					return null === i ? void 0 : e(i, n, r);
				}
				if ("value" in o) return o.value;
				var a = o.get;
				if (void 0 !== a) return a.call(r);
			},
			l = n(3),
			c = r(l),
			p = n(11),
			d = r(p),
			f = n(6),
			h = r(f),
			v = n(16),
			m = r(v),
			g = n(5),
			y = r(g);
		n(220);
		var b = 0,
			_ = (function (e) {
				function t() {
					var e, n, r, a;
					o(this, t);
					for (var s = arguments.length, u = Array(s), l = 0; l < s; l++) u[l] = arguments[l];
					return (n = r = i(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(u)))), (r.name = "Dialog"), (a = n), i(r, a);
				}
				return (
					a(t, e),
					s(t, [
						{
							key: "componentDidUpdate",
							value: function (e, t) {
								"prompt" === this.props.type && (d.default.findDOMNode(this.refs.input).value = this.props.initialValue || "");
							},
						},
						{
							key: "componentDidMount",
							value: function () {
								(this.element = d.default.findDOMNode(this)),
									(this.content = this.element.querySelector(".content")),
									"prompt" === this.props.type && d.default.findDOMNode(this.refs.input).setAttribute("x-inputmode", this.props.inputMode),
									y.default.register("show", this),
									y.default.register("hide", this),
									this.updateSoftKeys();
							},
						},
						{
							key: "scrollContent",
							value: function (e) {
								if (this.content) {
									var t = this.content.scrollHeight - this.content.clientHeight;
									if ((0 == this.content.scrollTop && e < 0) || (this.content.scrollTop == t && e > 0)) return !1;
									var n,
										r = this.content.clientHeight - 41;
									return e > 0 ? (n = this.content.scrollTop + r) : e < 0 && (n = this.content.scrollTop - r), n < 0 ? (n = 0) : n > t && (n = t), this.content.scrollTo(0, n), !0;
								}
							},
						},
						{
							key: "updateSoftKeys",
							value: function () {
								if ("custom" !== this.props.type)
									"alert" === this.props.type
										? m.default.register({ left: "", center: "ok", right: "" }, d.default.findDOMNode(this))
										: "progress" === this.props.type
										? m.default.register({ left: this.props.hideCancel ? "" : this.props.cancel || "cancel", center: "", right: "" }, d.default.findDOMNode(this))
										: m.default.register({ left: this.props.cancel || "cancel", center: "", right: this.props.ok || "ok" }, d.default.findDOMNode(this));
								else {
									var e = this.props.buttons;
									3 === e.length
										? "alert" !== this.props.type
											? m.default.register({ left: e[0].message, center: e[1].message, right: e[2].message }, d.default.findDOMNode(this))
											: m.default.register({ left: "", center: "ok", right: "" }, d.default.findDOMNode(this))
										: 2 === e.length
										? (m.default.register({ left: e[0].message, center: "", right: e[1].message }, d.default.findDOMNode(this)),
										  d.default.findDOMNode(this.refs.checkbox) &&
												m.default.register(
													{ center: "check-on" === d.default.findDOMNode(this.refs.checkbox).dataset.icon ? "off" : "on" },
													d.default.findDOMNode(this.refs.checkboxContainer)
												))
										: 1 === e.length && m.default.register({ left: "", center: e[0].message, right: "" }, d.default.findDOMNode(this));
								}
							},
						},
						{
							key: "focus",
							value: function () {
								this.focusIfPossible(), this.updateSoftKeys();
							},
						},
						{
							key: "focusIfPossible",
							value: function () {
								this.isHidden() ||
									("custom" === this.props.type && this.refs.checkboxContainer
										? d.default.findDOMNode(this.refs.checkboxContainer).focus()
										: "prompt" === this.props.type
										? d.default.findDOMNode(this.refs.input).focus()
										: this.props.noFocus || (this.refs.content ? d.default.findDOMNode(this.refs.content).focus() : this.element.focus()));
							},
						},
						{
							key: "hide",
							value: function () {
								"prompt" === this.props.type && (d.default.findDOMNode(this.refs.input).value = this.props.initialValue || ""),
									u(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "hide", this).call(this);
							},
						},
						{
							key: "getInstanceID",
							value: function () {
								return this._id || ((this._id = b), b++), this._id;
							},
						},
						{
							key: "onKeyDown",
							value: function (e) {
								var t = (e.target, e.key);
								switch (t) {
									case "ArrowDown":
										e.stopPropagation(), e.preventDefault(), this.scrollContent(1);
										break;
									case "ArrowUp":
										e.stopPropagation(), e.preventDefault(), this.scrollContent(-1);
										break;
									case "Enter":
										if ((e.stopPropagation(), e.preventDefault(), "custom" === this.props.type)) {
											if (3 === this.props.buttons.length) {
												var n = { selectedButton: 1 };
												if (this.props.showCheckbox) {
													var r = d.default.findDOMNode(this.refs.checkbox).dataset.icon;
													n.checked = "check-on" === r;
												}
												this.props.onOk && this.props.onOk(n), this.props.noClose || this.hide();
											} else if (this.props.showCheckbox && document.activeElement === d.default.findDOMNode(this.refs.checkboxContainer)) {
												var r = d.default.findDOMNode(this.refs.checkbox).dataset.icon;
												(d.default.findDOMNode(this.refs.checkbox).dataset.icon = "check-on" === r ? "check-off" : "check-on"), this.updateSoftKeys();
											}
										} else "alert" === this.props.type && (this.props.onOk && this.props.onOk(), this.props.noClose || this.hide());
										break;
									case "F1":
									case "SoftLeft":
										if ((e.stopPropagation(), e.preventDefault(), "custom" === this.props.type)) {
											var n = { selectedButton: 0 };
											this.props.showCheckbox && (n.checked = "check-on" === d.default.findDOMNode(this.refs.checkbox).dataset.icon), this.props.onOk && this.props.onOk(n);
										} else if ("alert" !== this.props.type) {
											if (this.props.hideCancel) return;
											this.props.onCancel && this.props.onCancel();
										}
										"alert" !== this.props.type && this.hide();
										break;
									case "F2":
									case "SoftRight":
										if ((e.stopPropagation(), e.preventDefault(), this.props.hideCancel)) return;
										if ("custom" === this.props.type) {
											var n = { selectedButton: 3 === this.props.buttons.length ? 2 : 1 };
											this.props.showCheckbox && (n.checked = d.default.findDOMNode(this.refs.checkbox).checked), this.props.onOk && this.props.onOk(n);
										} else
											"prompt" === this.props.type
												? this.props.onOk && this.props.onOk(d.default.findDOMNode(this.refs.input).value)
												: "confirm" === this.props.type && this.props.onOk && this.props.onOk();
										this.props.noClose || "alert" === this.props.type || this.hide();
										break;
									case "BrowserBack":
									case "Backspace":
									case "EndCall":
										if ("INPUT" === document.activeElement.tagName && document.activeElement.value) return;
										if ((e.stopPropagation(), e.preventDefault(), this.props.hideCancel)) return;
										this.props.onBack && this.props.onBack(), this.hide();
								}
							},
						},
						{
							key: "render",
							value: function () {
								var e = this,
									t = "";
								return (
									this.props.header &&
										(t = this.props.translated
											? c.default.createElement("div", { className: "header h1", key: "no-translated-header", id: "dialog-header-" + this.getInstanceID() }, this.props.header)
											: c.default.createElement("div", {
													className: "header h1",
													key: "translated-header",
													"data-l10n-id": this.props.header,
													id: "dialog-header-" + this.getInstanceID(),
											  })),
									c.default.createElement(
										"div",
										{
											className: "dialog-container",
											tabIndex: "-1",
											onKeyDown: function (t) {
												return e.onKeyDown(t);
											},
										},
										c.default.createElement(
											"div",
											{ role: "heading", className: "dialog", "aria-labelledby": "dialog-header-" + this.getInstanceID() },
											t,
											this.props.children ||
												c.default.createElement(
													"div",
													{ className: "content p-ul", ref: "content", tabIndex: "-1" },
													this.props.translated ? this.props.content : c.default.createElement("div", { "data-l10n-id": this.props.content }),
													"prompt" === this.props.type
														? c.default.createElement("input", {
																ref: "input",
																type: this.props.inputType,
																className: "primary",
																placeholder: this.props.placeholder,
																defaultValue: this.props.initialValue,
																maxLength: this.props.maxLength,
														  })
														: "",
													"custom" === this.props.type && this.props.showCheckbox
														? c.default.createElement(
																"div",
																{ tabIndex: "-1", ref: "checkboxContainer" },
																c.default.createElement("i", { ref: "checkbox", "data-icon": this.props.checkboxCheckedByDefault ? "check-on" : "check-off" }),
																c.default.createElement("span", null, this.props.checkboxMessage)
														  )
														: "",
													"progress" === this.props.type
														? c.default.createElement(
																"div",
																null,
																c.default.createElement("p", null, this.props.progressValue, "/", this.props.progressMax),
																c.default.createElement("progress", { value: this.props.progressValue, max: this.props.progressMax })
														  )
														: ""
												)
										)
									)
								);
							},
						},
					]),
					t
				);
			})(h.default);
		(_.defaultProps = {
			header: "",
			content: "",
			type: "confirm",
			inputType: "text",
			inputMode: "",
			ok: "",
			cancel: "",
			onOk: null,
			onBack: null,
			onCancel: null,
			translated: !1,
			buttons: [],
			showCheckbox: !1,
			checkboxCheckedByDefault: !1,
			checkboxMessage: "",
			placeholder: "",
			initialValue: "",
			maxLength: 100,
			progressValue: "",
			progressMax: "",
			noClose: !1,
			noFocus: !1,
			hideCancel: !1,
		}),
			(_.propTypes = {
				header: c.default.PropTypes.string,
				content: c.default.PropTypes.string,
				type: c.default.PropTypes.string,
				inputType: c.default.PropTypes.string,
				inputMode: c.default.PropTypes.string,
				ok: c.default.PropTypes.string,
				cancel: c.default.PropTypes.string,
				onOk: c.default.PropTypes.func,
				onBack: c.default.PropTypes.func,
				onCancel: c.default.PropTypes.func,
				translated: c.default.PropTypes.bool,
				buttons: c.default.PropTypes.array,
				showCheckbox: c.default.PropTypes.bool,
				checkboxCheckedByDefault: c.default.PropTypes.bool,
				checkboxMessage: c.default.PropTypes.string,
				placeholder: c.default.PropTypes.string,
				initialValue: c.default.PropTypes.string,
				maxLength: c.default.PropTypes.number,
				progressValue: c.default.PropTypes.string,
				progressMax: c.default.PropTypes.string,
			}),
			(t.default = _);
	},
	function (e, t, n) {
		"use strict";
		var r = n(7),
			o = n(67),
			i = {
				focusDOMComponent: function () {
					o(r.getNodeFromInstance(this));
				},
			};
		e.exports = i;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			var e = window.opera;
			return "object" === ("undefined" == typeof e ? "undefined" : f(e)) && "function" == typeof e.version && parseInt(e.version(), 10) <= 12;
		}
		function o(e) {
			return (e.ctrlKey || e.altKey || e.metaKey) && !(e.ctrlKey && e.altKey);
		}
		function i(e) {
			switch (e) {
				case O.topCompositionStart:
					return N.compositionStart;
				case O.topCompositionEnd:
					return N.compositionEnd;
				case O.topCompositionUpdate:
					return N.compositionUpdate;
			}
		}
		function a(e, t) {
			return e === O.topKeyDown && t.keyCode === E;
		}
		function s(e, t) {
			switch (e) {
				case O.topKeyUp:
					return C.indexOf(t.keyCode) !== -1;
				case O.topKeyDown:
					return t.keyCode !== E;
				case O.topKeyPress:
				case O.topMouseDown:
				case O.topBlur:
					return !0;
				default:
					return !1;
			}
		}
		function u(e) {
			var t = e.detail;
			return "object" === ("undefined" == typeof t ? "undefined" : f(t)) && "data" in t ? t.data : null;
		}
		function l(e, t, n, r) {
			var o, l;
			if ((k ? (o = i(e)) : I ? s(e, n) && (o = N.compositionEnd) : a(e, n) && (o = N.compositionStart), !o)) return null;
			P && (I || o !== N.compositionStart ? o === N.compositionEnd && I && (l = I.getData()) : (I = g.getPooled(r)));
			var c = y.getPooled(o, t, n, r);
			if (l) c.data = l;
			else {
				var p = u(n);
				null !== p && (c.data = p);
			}
			return v.accumulateTwoPhaseDispatches(c), c;
		}
		function c(e, t) {
			switch (e) {
				case O.topCompositionEnd:
					return u(t);
				case O.topKeyPress:
					return t.which !== T ? null : ((x = !0), M);
				case O.topTextInput:
					var n = t.data;
					return n === M && x ? null : n;
				default:
					return null;
			}
		}
		function p(e, t) {
			if (I) {
				if (e === O.topCompositionEnd || s(e, t)) {
					var n = I.getData();
					return g.release(I), (I = null), n;
				}
				return null;
			}
			switch (e) {
				case O.topPaste:
					return null;
				case O.topKeyPress:
					return t.which && !o(t) ? String.fromCharCode(t.which) : null;
				case O.topCompositionEnd:
					return P ? null : t.data;
				default:
					return null;
			}
		}
		function d(e, t, n, r) {
			var o;
			if (((o = w ? c(e, n) : p(e, n)), !o)) return null;
			var i = b.getPooled(N.beforeInput, t, n, r);
			return (i.data = o), v.accumulateTwoPhaseDispatches(i), i;
		}
		var f =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			h = n(17),
			v = n(28),
			m = n(8),
			g = n(140),
			y = n(179),
			b = n(182),
			_ = n(20),
			C = [9, 13, 27, 32],
			E = 229,
			k = m.canUseDOM && "CompositionEvent" in window,
			S = null;
		m.canUseDOM && "documentMode" in document && (S = document.documentMode);
		var w = m.canUseDOM && "TextEvent" in window && !S && !r(),
			P = m.canUseDOM && (!k || (S && S > 8 && S <= 11)),
			T = 32,
			M = String.fromCharCode(T),
			O = h.topLevelTypes,
			N = {
				beforeInput: {
					phasedRegistrationNames: { bubbled: _({ onBeforeInput: null }), captured: _({ onBeforeInputCapture: null }) },
					dependencies: [O.topCompositionEnd, O.topKeyPress, O.topTextInput, O.topPaste],
				},
				compositionEnd: {
					phasedRegistrationNames: { bubbled: _({ onCompositionEnd: null }), captured: _({ onCompositionEndCapture: null }) },
					dependencies: [O.topBlur, O.topCompositionEnd, O.topKeyDown, O.topKeyPress, O.topKeyUp, O.topMouseDown],
				},
				compositionStart: {
					phasedRegistrationNames: { bubbled: _({ onCompositionStart: null }), captured: _({ onCompositionStartCapture: null }) },
					dependencies: [O.topBlur, O.topCompositionStart, O.topKeyDown, O.topKeyPress, O.topKeyUp, O.topMouseDown],
				},
				compositionUpdate: {
					phasedRegistrationNames: { bubbled: _({ onCompositionUpdate: null }), captured: _({ onCompositionUpdateCapture: null }) },
					dependencies: [O.topBlur, O.topCompositionUpdate, O.topKeyDown, O.topKeyPress, O.topKeyUp, O.topMouseDown],
				},
			},
			x = !1,
			I = null,
			D = {
				eventTypes: N,
				extractEvents: function (e, t, n, r) {
					return [l(e, t, n, r), d(e, t, n, r)];
				},
			};
		e.exports = D;
	},
	function (e, t, n) {
		"use strict";
		var r = n(74),
			o = n(8),
			i = (n(9), n(115), n(188)),
			a = n(121),
			s = n(125),
			u =
				(n(2),
				s(function (e) {
					return a(e);
				})),
			l = !1,
			c = "cssFloat";
		if (o.canUseDOM) {
			var p = document.createElement("div").style;
			try {
				p.font = "";
			} catch (d) {
				l = !0;
			}
			void 0 === document.documentElement.style.cssFloat && (c = "styleFloat");
		}
		var f = {
			createMarkupForStyles: function (e, t) {
				var n = "";
				for (var r in e)
					if (e.hasOwnProperty(r)) {
						var o = e[r];
						null != o && ((n += u(r) + ":"), (n += i(r, o, t) + ";"));
					}
				return n || null;
			},
			setValueForStyles: function (e, t, n) {
				var o = e.style;
				for (var a in t)
					if (t.hasOwnProperty(a)) {
						var s = i(a, t[a], n);
						if ((("float" !== a && "cssFloat" !== a) || (a = c), s)) o[a] = s;
						else {
							var u = l && r.shorthandPropertyExpansions[a];
							if (u) for (var p in u) o[p] = "";
							else o[a] = "";
						}
					}
			},
		};
		e.exports = f;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			var t = e.nodeName && e.nodeName.toLowerCase();
			return "select" === t || ("input" === t && "file" === e.type);
		}
		function o(e) {
			var t = S.getPooled(N.change, I, e, w(e));
			_.accumulateTwoPhaseDispatches(t), k.batchedUpdates(i, t);
		}
		function i(e) {
			b.enqueueEvents(e), b.processEventQueue(!1);
		}
		function a(e, t) {
			(x = e), (I = t), x.attachEvent("onchange", o);
		}
		function s() {
			x && (x.detachEvent("onchange", o), (x = null), (I = null));
		}
		function u(e, t) {
			if (e === O.topChange) return t;
		}
		function l(e, t, n) {
			e === O.topFocus ? (s(), a(t, n)) : e === O.topBlur && s();
		}
		function c(e, t) {
			(x = e),
				(I = t),
				(D = e.value),
				(A = Object.getOwnPropertyDescriptor(e.constructor.prototype, "value")),
				Object.defineProperty(x, "value", U),
				x.attachEvent ? x.attachEvent("onpropertychange", d) : x.addEventListener("propertychange", d, !1);
		}
		function p() {
			x && (delete x.value, x.detachEvent ? x.detachEvent("onpropertychange", d) : x.removeEventListener("propertychange", d, !1), (x = null), (I = null), (D = null), (A = null));
		}
		function d(e) {
			if ("value" === e.propertyName) {
				var t = e.srcElement.value;
				t !== D && ((D = t), o(e));
			}
		}
		function f(e, t) {
			if (e === O.topInput) return t;
		}
		function h(e, t, n) {
			e === O.topFocus ? (p(), c(t, n)) : e === O.topBlur && p();
		}
		function v(e, t) {
			if ((e === O.topSelectionChange || e === O.topKeyUp || e === O.topKeyDown) && x && x.value !== D) return (D = x.value), I;
		}
		function m(e) {
			return e.nodeName && "input" === e.nodeName.toLowerCase() && ("checkbox" === e.type || "radio" === e.type);
		}
		function g(e, t) {
			if (e === O.topClick) return t;
		}
		var y = n(17),
			b = n(27),
			_ = n(28),
			C = n(8),
			E = n(7),
			k = n(15),
			S = n(18),
			w = n(55),
			P = n(57),
			T = n(101),
			M = n(20),
			O = y.topLevelTypes,
			N = {
				change: {
					phasedRegistrationNames: { bubbled: M({ onChange: null }), captured: M({ onChangeCapture: null }) },
					dependencies: [O.topBlur, O.topChange, O.topClick, O.topFocus, O.topInput, O.topKeyDown, O.topKeyUp, O.topSelectionChange],
				},
			},
			x = null,
			I = null,
			D = null,
			A = null,
			R = !1;
		C.canUseDOM && (R = P("change") && (!("documentMode" in document) || document.documentMode > 8));
		var L = !1;
		C.canUseDOM && (L = P("input") && (!("documentMode" in document) || document.documentMode > 11));
		var U = {
				get: function () {
					return A.get.call(this);
				},
				set: function (e) {
					(D = "" + e), A.set.call(this, e);
				},
			},
			F = {
				eventTypes: N,
				extractEvents: function (e, t, n, o) {
					var i,
						a,
						s = t ? E.getNodeFromInstance(t) : window;
					if ((r(s) ? (R ? (i = u) : (a = l)) : T(s) ? (L ? (i = f) : ((i = v), (a = h))) : m(s) && (i = g), i)) {
						var c = i(e, t);
						if (c) {
							var p = S.getPooled(N.change, c, n, o);
							return (p.type = "change"), _.accumulateTwoPhaseDispatches(p), p;
						}
					}
					a && a(e, s, t);
				},
			};
		e.exports = F;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e.substring(1, e.indexOf(" "));
		}
		var o = n(24),
			i = n(8),
			a = n(118),
			s = n(10),
			u = n(69),
			l = n(1),
			c = /^(<[^ \/>]+)/,
			p = "data-danger-index",
			d = {
				dangerouslyRenderMarkup: function (e) {
					i.canUseDOM ? void 0 : l(!1);
					for (var t, n = {}, o = 0; o < e.length; o++) e[o] ? void 0 : l(!1), (t = r(e[o])), (t = u(t) ? t : "*"), (n[t] = n[t] || []), (n[t][o] = e[o]);
					var d = [],
						f = 0;
					for (t in n)
						if (n.hasOwnProperty(t)) {
							var h,
								v = n[t];
							for (h in v)
								if (v.hasOwnProperty(h)) {
									var m = v[h];
									v[h] = m.replace(c, "$1 " + p + '="' + h + '" ');
								}
							for (var g = a(v.join(""), s), y = 0; y < g.length; ++y) {
								var b = g[y];
								b.hasAttribute && b.hasAttribute(p) && ((h = +b.getAttribute(p)), b.removeAttribute(p), d.hasOwnProperty(h) ? l(!1) : void 0, (d[h] = b), (f += 1));
							}
						}
					return f !== d.length ? l(!1) : void 0, d.length !== e.length ? l(!1) : void 0, d;
				},
				dangerouslyReplaceNodeWithMarkup: function (e, t) {
					if ((i.canUseDOM ? void 0 : l(!1), t ? void 0 : l(!1), "HTML" === e.nodeName ? l(!1) : void 0, "string" == typeof t)) {
						var n = a(t, s)[0];
						e.parentNode.replaceChild(n, e);
					} else o.replaceChildWithTree(e, t);
				},
			};
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		var r = n(20),
			o = [
				r({ ResponderEventPlugin: null }),
				r({ SimpleEventPlugin: null }),
				r({ TapEventPlugin: null }),
				r({ EnterLeaveEventPlugin: null }),
				r({ ChangeEventPlugin: null }),
				r({ SelectEventPlugin: null }),
				r({ BeforeInputEventPlugin: null }),
			];
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		var r = n(17),
			o = n(28),
			i = n(7),
			a = n(38),
			s = n(20),
			u = r.topLevelTypes,
			l = {
				mouseEnter: { registrationName: s({ onMouseEnter: null }), dependencies: [u.topMouseOut, u.topMouseOver] },
				mouseLeave: { registrationName: s({ onMouseLeave: null }), dependencies: [u.topMouseOut, u.topMouseOver] },
			},
			c = {
				eventTypes: l,
				extractEvents: function (e, t, n, r) {
					if (e === u.topMouseOver && (n.relatedTarget || n.fromElement)) return null;
					if (e !== u.topMouseOut && e !== u.topMouseOver) return null;
					var s;
					if (r.window === r) s = r;
					else {
						var c = r.ownerDocument;
						s = c ? c.defaultView || c.parentWindow : window;
					}
					var p, d;
					if (e === u.topMouseOut) {
						p = t;
						var f = n.relatedTarget || n.toElement;
						d = f ? i.getClosestInstanceFromNode(f) : null;
					} else (p = null), (d = t);
					if (p === d) return null;
					var h = null == p ? s : i.getNodeFromInstance(p),
						v = null == d ? s : i.getNodeFromInstance(d),
						m = a.getPooled(l.mouseLeave, p, n, r);
					(m.type = "mouseleave"), (m.target = h), (m.relatedTarget = v);
					var g = a.getPooled(l.mouseEnter, d, n, r);
					return (g.type = "mouseenter"), (g.target = v), (g.relatedTarget = h), o.accumulateEnterLeaveDispatches(m, g, p, d), [m, g];
				},
			};
		e.exports = c;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			(this._root = e), (this._startText = this.getText()), (this._fallbackText = null);
		}
		var o = n(4),
			i = n(21),
			a = n(99);
		o(r.prototype, {
			destructor: function () {
				(this._root = null), (this._startText = null), (this._fallbackText = null);
			},
			getText: function () {
				return "value" in this._root ? this._root.value : this._root[a()];
			},
			getData: function () {
				if (this._fallbackText) return this._fallbackText;
				var e,
					t,
					n = this._startText,
					r = n.length,
					o = this.getText(),
					i = o.length;
				for (e = 0; e < r && n[e] === o[e]; e++);
				var a = r - e;
				for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
				var s = t > 1 ? 1 - t : void 0;
				return (this._fallbackText = o.slice(e, s)), this._fallbackText;
			},
		}),
			i.addPoolingTo(r),
			(e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		var r = n(23),
			o = r.injection.MUST_USE_PROPERTY,
			i = r.injection.HAS_BOOLEAN_VALUE,
			a = r.injection.HAS_SIDE_EFFECTS,
			s = r.injection.HAS_NUMERIC_VALUE,
			u = r.injection.HAS_POSITIVE_NUMERIC_VALUE,
			l = r.injection.HAS_OVERLOADED_BOOLEAN_VALUE,
			c = {
				isCustomAttribute: RegExp.prototype.test.bind(new RegExp("^(data|aria)-[" + r.ATTRIBUTE_NAME_CHAR + "]*$")),
				Properties: {
					accept: 0,
					acceptCharset: 0,
					accessKey: 0,
					action: 0,
					allowFullScreen: i,
					allowTransparency: 0,
					alt: 0,
					async: i,
					autoComplete: 0,
					autoPlay: i,
					capture: i,
					cellPadding: 0,
					cellSpacing: 0,
					charSet: 0,
					challenge: 0,
					checked: o | i,
					cite: 0,
					classID: 0,
					className: 0,
					cols: u,
					colSpan: 0,
					content: 0,
					contentEditable: 0,
					contextMenu: 0,
					controls: i,
					coords: 0,
					crossOrigin: 0,
					data: 0,
					dateTime: 0,
					default: i,
					defer: i,
					dir: 0,
					disabled: i,
					download: l,
					draggable: 0,
					encType: 0,
					form: 0,
					formAction: 0,
					formEncType: 0,
					formMethod: 0,
					formNoValidate: i,
					formTarget: 0,
					frameBorder: 0,
					headers: 0,
					height: 0,
					hidden: i,
					high: 0,
					href: 0,
					hrefLang: 0,
					htmlFor: 0,
					httpEquiv: 0,
					icon: 0,
					id: 0,
					inputMode: 0,
					integrity: 0,
					is: 0,
					keyParams: 0,
					keyType: 0,
					kind: 0,
					label: 0,
					lang: 0,
					list: 0,
					loop: i,
					low: 0,
					manifest: 0,
					marginHeight: 0,
					marginWidth: 0,
					max: 0,
					maxLength: 0,
					media: 0,
					mediaGroup: 0,
					method: 0,
					min: 0,
					minLength: 0,
					multiple: o | i,
					muted: o | i,
					name: 0,
					nonce: 0,
					noValidate: i,
					open: i,
					optimum: 0,
					pattern: 0,
					placeholder: 0,
					poster: 0,
					preload: 0,
					profile: 0,
					radioGroup: 0,
					readOnly: i,
					rel: 0,
					required: i,
					reversed: i,
					role: 0,
					rows: u,
					rowSpan: s,
					sandbox: 0,
					scope: 0,
					scoped: i,
					scrolling: 0,
					seamless: i,
					selected: o | i,
					shape: 0,
					size: u,
					sizes: 0,
					span: u,
					spellCheck: 0,
					src: 0,
					srcDoc: 0,
					srcLang: 0,
					srcSet: 0,
					start: s,
					step: 0,
					style: 0,
					summary: 0,
					tabIndex: 0,
					target: 0,
					title: 0,
					type: 0,
					useMap: 0,
					value: o | a,
					width: 0,
					wmode: 0,
					wrap: 0,
					about: 0,
					datatype: 0,
					inlist: 0,
					prefix: 0,
					property: 0,
					resource: 0,
					typeof: 0,
					vocab: 0,
					autoCapitalize: 0,
					autoCorrect: 0,
					autoSave: 0,
					color: 0,
					itemProp: 0,
					itemScope: i,
					itemType: 0,
					itemID: 0,
					itemRef: 0,
					results: 0,
					security: 0,
					unselectable: 0,
				},
				DOMAttributeNames: { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" },
				DOMPropertyNames: {},
			};
		e.exports = c;
	},
	function (e, t, n) {
		"use strict";
		var r = n(4),
			o = n(77),
			i = n(79),
			a = n(78),
			s = n(151),
			u = n(12),
			l = (n(83), n(92)),
			c = n(94),
			p = n(194),
			d = (n(2), u.createElement),
			f = u.createFactory,
			h = u.cloneElement,
			v = r,
			m = {
				Children: { map: o.map, forEach: o.forEach, count: o.count, toArray: o.toArray, only: p },
				Component: i,
				createElement: d,
				cloneElement: h,
				isValidElement: u.isValidElement,
				PropTypes: l,
				createClass: a.createClass,
				createFactory: f,
				createMixin: function (e) {
					return e;
				},
				DOM: s,
				version: c,
				__spread: v,
			};
		e.exports = m;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n) {
			var r = void 0 === e[n];
			null != t && r && (e[n] = i(t));
		}
		var o = n(25),
			i = n(100),
			a = (n(46), n(59)),
			s = n(60),
			u =
				(n(2),
				{
					instantiateChildren: function (e, t, n) {
						if (null == e) return null;
						var o = {};
						return s(e, r, o), o;
					},
					updateChildren: function (e, t, n, r, s) {
						if (t || e) {
							var u, l;
							for (u in t)
								if (t.hasOwnProperty(u)) {
									l = e && e[u];
									var c = l && l._currentElement,
										p = t[u];
									if (null != l && a(c, p)) o.receiveComponent(l, p, r, s), (t[u] = l);
									else {
										l && ((n[u] = o.getNativeNode(l)), o.unmountComponent(l, !1));
										var d = i(p);
										t[u] = d;
									}
								}
							for (u in e) !e.hasOwnProperty(u) || (t && t.hasOwnProperty(u)) || ((l = e[u]), (n[u] = o.getNativeNode(l)), o.unmountComponent(l, !1));
						}
					},
					unmountChildren: function (e, t) {
						for (var n in e)
							if (e.hasOwnProperty(n)) {
								var r = e[n];
								o.unmountComponent(r, t);
							}
					},
				});
		e.exports = u;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			var t = e._currentElement._owner || null;
			if (t) {
				var n = t.getName();
				if (n) return " Check the render method of `" + n + "`.";
			}
			return "";
		}
		function o(e) {}
		function i(e, t) {}
		function a(e) {
			return e.prototype && e.prototype.isReactComponent;
		}
		var s =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			u = n(4),
			l = n(48),
			c = n(22),
			p = n(12),
			d = n(49),
			f = n(50),
			h = (n(9), n(90)),
			v = n(37),
			m = (n(36), n(25)),
			g = n(93),
			y = n(31),
			b = n(1),
			_ = n(59);
		n(2);
		o.prototype.render = function () {
			var e = f.get(this)._currentElement.type,
				t = e(this.props, this.context, this.updater);
			return i(e, t), t;
		};
		var C = 1,
			E = {
				construct: function (e) {
					(this._currentElement = e),
						(this._rootNodeID = null),
						(this._instance = null),
						(this._nativeParent = null),
						(this._nativeContainerInfo = null),
						(this._updateBatchNumber = null),
						(this._pendingElement = null),
						(this._pendingStateQueue = null),
						(this._pendingReplaceState = !1),
						(this._pendingForceUpdate = !1),
						(this._renderedNodeType = null),
						(this._renderedComponent = null),
						(this._context = null),
						(this._mountOrder = 0),
						(this._topLevelWrapper = null),
						(this._pendingCallbacks = null),
						(this._calledComponentWillUnmount = !1);
				},
				mountComponent: function (e, t, n, r) {
					(this._context = r), (this._mountOrder = C++), (this._nativeParent = t), (this._nativeContainerInfo = n);
					var u,
						l = this._processProps(this._currentElement.props),
						c = this._processContext(r),
						d = this._currentElement.type,
						h = this._constructComponent(l, c);
					a(d) || (null != h && null != h.render) || ((u = h), i(d, u), null === h || h === !1 || p.isValidElement(h) ? void 0 : b(!1), (h = new o(d)));
					(h.props = l), (h.context = c), (h.refs = y), (h.updater = g), (this._instance = h), f.set(h, this);
					var v = h.state;
					void 0 === v && (h.state = v = null),
						"object" !== ("undefined" == typeof v ? "undefined" : s(v)) || Array.isArray(v) ? b(!1) : void 0,
						(this._pendingStateQueue = null),
						(this._pendingReplaceState = !1),
						(this._pendingForceUpdate = !1);
					var m;
					return (
						(m = h.unstable_handleError ? this.performInitialMountWithErrorHandling(u, t, n, e, r) : this.performInitialMount(u, t, n, e, r)),
						h.componentDidMount && e.getReactMountReady().enqueue(h.componentDidMount, h),
						m
					);
				},
				_constructComponent: function (e, t) {
					return this._constructComponentWithoutOwner(e, t);
				},
				_constructComponentWithoutOwner: function (e, t) {
					var n,
						r = this._currentElement.type;
					return (n = a(r) ? new r(e, t, g) : r(e, t, g));
				},
				performInitialMountWithErrorHandling: function (e, t, n, r, o) {
					var i,
						a = r.checkpoint();
					try {
						i = this.performInitialMount(e, t, n, r, o);
					} catch (s) {
						r.rollback(a),
							this._instance.unstable_handleError(s),
							this._pendingStateQueue && (this._instance.state = this._processPendingState(this._instance.props, this._instance.context)),
							(a = r.checkpoint()),
							this._renderedComponent.unmountComponent(!0),
							r.rollback(a),
							(i = this.performInitialMount(e, t, n, r, o));
					}
					return i;
				},
				performInitialMount: function (e, t, n, r, o) {
					var i = this._instance;
					return (
						i.componentWillMount && (i.componentWillMount(), this._pendingStateQueue && (i.state = this._processPendingState(i.props, i.context))),
						void 0 === e && (e = this._renderValidatedComponent()),
						(this._renderedNodeType = h.getType(e)),
						(this._renderedComponent = this._instantiateReactComponent(e)),
						m.mountComponent(this._renderedComponent, r, t, n, this._processChildContext(o))
					);
				},
				getNativeNode: function () {
					return m.getNativeNode(this._renderedComponent);
				},
				unmountComponent: function (e) {
					if (this._renderedComponent) {
						var t = this._instance;
						if (t.componentWillUnmount && !t._calledComponentWillUnmount)
							if (((t._calledComponentWillUnmount = !0), e)) {
								var n = this.getName() + ".componentWillUnmount()";
								d.invokeGuardedCallback(n, t.componentWillUnmount.bind(t));
							} else t.componentWillUnmount();
						this._renderedComponent && (m.unmountComponent(this._renderedComponent, e), (this._renderedNodeType = null), (this._renderedComponent = null), (this._instance = null)),
							(this._pendingStateQueue = null),
							(this._pendingReplaceState = !1),
							(this._pendingForceUpdate = !1),
							(this._pendingCallbacks = null),
							(this._pendingElement = null),
							(this._context = null),
							(this._rootNodeID = null),
							(this._topLevelWrapper = null),
							f.remove(t);
					}
				},
				_maskContext: function (e) {
					var t = this._currentElement.type,
						n = t.contextTypes;
					if (!n) return y;
					var r = {};
					for (var o in n) r[o] = e[o];
					return r;
				},
				_processContext: function (e) {
					var t = this._maskContext(e);
					return t;
				},
				_processChildContext: function (e) {
					var t = this._currentElement.type,
						n = this._instance,
						r = n.getChildContext && n.getChildContext();
					if (r) {
						"object" !== s(t.childContextTypes) ? b(!1) : void 0;
						for (var o in r) o in t.childContextTypes ? void 0 : b(!1);
						return u({}, e, r);
					}
					return e;
				},
				_processProps: function (e) {
					return e;
				},
				_checkPropTypes: function (e, t, n) {
					var o = this.getName();
					for (var i in e)
						if (e.hasOwnProperty(i)) {
							var a;
							try {
								"function" != typeof e[i] ? b(!1) : void 0, (a = e[i](t, i, o, n));
							} catch (s) {
								a = s;
							}
							if (a instanceof Error) {
								r(this);
								n === v.prop;
							}
						}
				},
				receiveComponent: function (e, t, n) {
					var r = this._currentElement,
						o = this._context;
					(this._pendingElement = null), this.updateComponent(t, r, e, o, n);
				},
				performUpdateIfNecessary: function (e) {
					null != this._pendingElement
						? m.receiveComponent(this, this._pendingElement, e, this._context)
						: null !== this._pendingStateQueue || this._pendingForceUpdate
						? this.updateComponent(e, this._currentElement, this._currentElement, this._context, this._context)
						: (this._updateBatchNumber = null);
				},
				updateComponent: function (e, t, n, r, o) {
					var i,
						a,
						s = this._instance,
						u = !1;
					this._context === o ? (i = s.context) : ((i = this._processContext(o)), (u = !0)),
						t === n ? (a = n.props) : ((a = this._processProps(n.props)), (u = !0)),
						u && s.componentWillReceiveProps && s.componentWillReceiveProps(a, i);
					var l = this._processPendingState(a, i),
						c = !0;
					!this._pendingForceUpdate && s.shouldComponentUpdate && (c = s.shouldComponentUpdate(a, l, i)),
						(this._updateBatchNumber = null),
						c
							? ((this._pendingForceUpdate = !1), this._performComponentUpdate(n, a, l, i, e, o))
							: ((this._currentElement = n), (this._context = o), (s.props = a), (s.state = l), (s.context = i));
				},
				_processPendingState: function (e, t) {
					var n = this._instance,
						r = this._pendingStateQueue,
						o = this._pendingReplaceState;
					if (((this._pendingReplaceState = !1), (this._pendingStateQueue = null), !r)) return n.state;
					if (o && 1 === r.length) return r[0];
					for (var i = u({}, o ? r[0] : n.state), a = o ? 1 : 0; a < r.length; a++) {
						var s = r[a];
						u(i, "function" == typeof s ? s.call(n, i, e, t) : s);
					}
					return i;
				},
				_performComponentUpdate: function (e, t, n, r, o, i) {
					var a,
						s,
						u,
						l = this._instance,
						c = Boolean(l.componentDidUpdate);
					c && ((a = l.props), (s = l.state), (u = l.context)),
						l.componentWillUpdate && l.componentWillUpdate(t, n, r),
						(this._currentElement = e),
						(this._context = i),
						(l.props = t),
						(l.state = n),
						(l.context = r),
						this._updateRenderedComponent(o, i),
						c && o.getReactMountReady().enqueue(l.componentDidUpdate.bind(l, a, s, u), l);
				},
				_updateRenderedComponent: function (e, t) {
					var n = this._renderedComponent,
						r = n._currentElement,
						o = this._renderValidatedComponent();
					if (_(r, o)) m.receiveComponent(n, o, e, this._processChildContext(t));
					else {
						var i = m.getNativeNode(n);
						m.unmountComponent(n, !1), (this._renderedNodeType = h.getType(o)), (this._renderedComponent = this._instantiateReactComponent(o));
						var a = m.mountComponent(this._renderedComponent, e, this._nativeParent, this._nativeContainerInfo, this._processChildContext(t));
						this._replaceNodeWithMarkup(i, a, n);
					}
				},
				_replaceNodeWithMarkup: function (e, t, n) {
					l.replaceNodeWithMarkup(e, t, n);
				},
				_renderValidatedComponentWithoutOwnerOrContext: function () {
					var e = this._instance,
						t = e.render();
					return t;
				},
				_renderValidatedComponent: function () {
					var e;
					c.current = this;
					try {
						e = this._renderValidatedComponentWithoutOwnerOrContext();
					} finally {
						c.current = null;
					}
					return null === e || e === !1 || p.isValidElement(e) ? void 0 : b(!1), e;
				},
				attachRef: function (e, t) {
					var n = this.getPublicInstance();
					null == n ? b(!1) : void 0;
					var r = t.getPublicInstance();
					(n.refs === y ? (n.refs = {}) : n.refs)[e] = r;
				},
				detachRef: function (e) {
					delete this.getPublicInstance().refs[e];
				},
				getName: function () {
					var e = this._currentElement.type,
						t = this._instance && this._instance.constructor;
					return e.displayName || (t && t.displayName) || e.name || (t && t.name) || null;
				},
				getPublicInstance: function () {
					var e = this._instance;
					return e instanceof o ? null : e;
				},
				_instantiateReactComponent: null,
			},
			k = { Mixin: E };
		e.exports = k;
	},
	function (e, t, n) {
		"use strict";
		var r = n(7),
			o = n(164),
			i = n(87),
			a = n(25),
			s = n(15),
			u = n(94),
			l = n(189),
			c = n(98),
			p = n(196);
		n(2);
		o.inject();
		var d = {
			findDOMNode: l,
			render: i.render,
			unmountComponentAtNode: i.unmountComponentAtNode,
			version: u,
			unstable_batchedUpdates: s.batchedUpdates,
			unstable_renderSubtreeIntoContainer: p,
		};
		"undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
			"function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject &&
			__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
				ComponentTree: {
					getClosestInstanceFromNode: r.getClosestInstanceFromNode,
					getNodeFromInstance: function (e) {
						return e._renderedComponent && (e = c(e)), e ? r.getNodeFromInstance(e) : null;
					},
				},
				Mount: i,
				Reconciler: a,
			});
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		var r = n(33),
			o = { getNativeProps: r.getNativeProps };
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			t &&
				(Q[e._tag] && (null != t.children || null != t.dangerouslySetInnerHTML ? R(!1) : void 0),
				null != t.dangerouslySetInnerHTML && (null != t.children ? R(!1) : void 0, "object" === d(t.dangerouslySetInnerHTML) && K in t.dangerouslySetInnerHTML ? void 0 : R(!1)),
				null != t.style && "object" !== d(t.style) ? R(!1) : void 0);
		}
		function o(e, t, n, r) {
			if (!(r instanceof D)) {
				var o = e._nativeContainerInfo;
				V(t, o._node && o._node.nodeType === z ? o._node : o._ownerDocument), r.getReactMountReady().enqueue(i, { inst: e, registrationName: t, listener: n });
			}
		}
		function i() {
			var e = this;
			C.putListener(e.inst, e.registrationName, e.listener);
		}
		function a() {
			var e = this;
			O.postMountWrapper(e);
		}
		function s() {
			var e = this;
			e._rootNodeID ? void 0 : R(!1);
			var t = j(e);
			switch ((t ? void 0 : R(!1), e._tag)) {
				case "iframe":
				case "object":
					e._wrapperState.listeners = [k.trapBubbledEvent(_.topLevelTypes.topLoad, "load", t)];
					break;
				case "video":
				case "audio":
					e._wrapperState.listeners = [];
					for (var n in Y) Y.hasOwnProperty(n) && e._wrapperState.listeners.push(k.trapBubbledEvent(_.topLevelTypes[n], Y[n], t));
					break;
				case "img":
					e._wrapperState.listeners = [k.trapBubbledEvent(_.topLevelTypes.topError, "error", t), k.trapBubbledEvent(_.topLevelTypes.topLoad, "load", t)];
					break;
				case "form":
					e._wrapperState.listeners = [k.trapBubbledEvent(_.topLevelTypes.topReset, "reset", t), k.trapBubbledEvent(_.topLevelTypes.topSubmit, "submit", t)];
					break;
				case "input":
				case "select":
				case "textarea":
					e._wrapperState.listeners = [k.trapBubbledEvent(_.topLevelTypes.topInvalid, "invalid", t)];
			}
		}
		function u() {
			N.postUpdateWrapper(this);
		}
		function l(e) {
			Z.call(J, e) || ($.test(e) ? void 0 : R(!1), (J[e] = !0));
		}
		function c(e, t) {
			return e.indexOf("-") >= 0 || null != t.is;
		}
		function p(e) {
			var t = e.type;
			l(t),
				(this._currentElement = e),
				(this._tag = t.toLowerCase()),
				(this._namespaceURI = null),
				(this._renderedChildren = null),
				(this._previousStyle = null),
				(this._previousStyleCopy = null),
				(this._nativeNode = null),
				(this._nativeParent = null),
				(this._rootNodeID = null),
				(this._domID = null),
				(this._nativeContainerInfo = null),
				(this._wrapperState = null),
				(this._topLevelWrapper = null),
				(this._flags = 0);
		}
		var d =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
					  },
			f = n(4),
			h = n(133),
			v = n(135),
			m = n(24),
			g = n(76),
			y = n(23),
			b = n(44),
			_ = n(17),
			C = n(27),
			E = n(34),
			k = n(35),
			S = n(80),
			w = n(146),
			P = n(81),
			T = n(7),
			M = n(154),
			O = n(156),
			N = n(82),
			x = n(159),
			I = (n(9), n(169)),
			D = n(173),
			A = (n(10), n(40)),
			R = n(1),
			L = (n(57), n(20)),
			U = (n(70), n(61), n(2), P),
			F = C.deleteListener,
			j = T.getNodeFromInstance,
			V = k.listenTo,
			B = E.registrationNameModules,
			q = { string: !0, number: !0 },
			W = L({ style: null }),
			K = L({ __html: null }),
			H = { children: null, dangerouslySetInnerHTML: null, suppressContentEditableWarning: null },
			z = 11,
			Y = {
				topAbort: "abort",
				topCanPlay: "canplay",
				topCanPlayThrough: "canplaythrough",
				topDurationChange: "durationchange",
				topEmptied: "emptied",
				topEncrypted: "encrypted",
				topEnded: "ended",
				topError: "error",
				topLoadedData: "loadeddata",
				topLoadedMetadata: "loadedmetadata",
				topLoadStart: "loadstart",
				topPause: "pause",
				topPlay: "play",
				topPlaying: "playing",
				topProgress: "progress",
				topRateChange: "ratechange",
				topSeeked: "seeked",
				topSeeking: "seeking",
				topStalled: "stalled",
				topSuspend: "suspend",
				topTimeUpdate: "timeupdate",
				topVolumeChange: "volumechange",
				topWaiting: "waiting",
			},
			G = { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 },
			X = { listing: !0, pre: !0, textarea: !0 },
			Q = f({ menuitem: !0 }, G),
			$ = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
			J = {},
			Z = {}.hasOwnProperty,
			ee = 1;
		(p.displayName = "ReactDOMComponent"),
			(p.Mixin = {
				mountComponent: function (e, t, n, o) {
					(this._rootNodeID = ee++), (this._domID = n._idCounter++), (this._nativeParent = t), (this._nativeContainerInfo = n);
					var i = this._currentElement.props;
					switch (this._tag) {
						case "iframe":
						case "object":
						case "img":
						case "form":
						case "video":
						case "audio":
							(this._wrapperState = { listeners: null }), e.getReactMountReady().enqueue(s, this);
							break;
						case "button":
							i = w.getNativeProps(this, i, t);
							break;
						case "input":
							M.mountWrapper(this, i, t), (i = M.getNativeProps(this, i)), e.getReactMountReady().enqueue(s, this);
							break;
						case "option":
							O.mountWrapper(this, i, t), (i = O.getNativeProps(this, i));
							break;
						case "select":
							N.mountWrapper(this, i, t), (i = N.getNativeProps(this, i)), e.getReactMountReady().enqueue(s, this);
							break;
						case "textarea":
							x.mountWrapper(this, i, t), (i = x.getNativeProps(this, i)), e.getReactMountReady().enqueue(s, this);
					}
					r(this, i);
					var u, l;
					null != t ? ((u = t._namespaceURI), (l = t._tag)) : n._tag && ((u = n._namespaceURI), (l = n._tag)),
						(null == u || (u === g.svg && "foreignobject" === l)) && (u = g.html),
						u === g.html && ("svg" === this._tag ? (u = g.svg) : "math" === this._tag && (u = g.mathml)),
						(this._namespaceURI = u);
					var c;
					if (e.useCreateElement) {
						var p,
							d = n._ownerDocument;
						if (u === g.html)
							if ("script" === this._tag) {
								var f = d.createElement("div"),
									v = this._currentElement.type;
								(f.innerHTML = "<" + v + "></" + v + ">"), (p = f.removeChild(f.firstChild));
							} else p = d.createElement(this._currentElement.type, i.is || null);
						else p = d.createElementNS(u, this._currentElement.type);
						T.precacheNode(this, p), (this._flags |= U.hasCachedChildNodes), this._nativeParent || b.setAttributeForRoot(p), this._updateDOMProperties(null, i, e);
						var y = m(p);
						this._createInitialChildren(e, i, o, y), (c = y);
					} else {
						var _ = this._createOpenTagMarkupAndPutListeners(e, i),
							C = this._createContentMarkup(e, i, o);
						c = !C && G[this._tag] ? _ + "/>" : _ + ">" + C + "</" + this._currentElement.type + ">";
					}
					switch (this._tag) {
						case "button":
						case "input":
						case "select":
						case "textarea":
							i.autoFocus && e.getReactMountReady().enqueue(h.focusDOMComponent, this);
							break;
						case "option":
							e.getReactMountReady().enqueue(a, this);
					}
					return c;
				},
				_createOpenTagMarkupAndPutListeners: function (e, t) {
					var n = "<" + this._currentElement.type;
					for (var r in t)
						if (t.hasOwnProperty(r)) {
							var i = t[r];
							if (null != i)
								if (B.hasOwnProperty(r)) i && o(this, r, i, e);
								else {
									r === W && (i && (i = this._previousStyleCopy = f({}, t.style)), (i = v.createMarkupForStyles(i, this)));
									var a = null;
									null != this._tag && c(this._tag, t) ? H.hasOwnProperty(r) || (a = b.createMarkupForCustomAttribute(r, i)) : (a = b.createMarkupForProperty(r, i)),
										a && (n += " " + a);
								}
						}
					return e.renderToStaticMarkup ? n : (this._nativeParent || (n += " " + b.createMarkupForRoot()), (n += " " + b.createMarkupForID(this._domID)));
				},
				_createContentMarkup: function (e, t, n) {
					var r = "",
						o = t.dangerouslySetInnerHTML;
					if (null != o) null != o.__html && (r = o.__html);
					else {
						var i = q[d(t.children)] ? t.children : null,
							a = null != i ? null : t.children;
						if (null != i) r = A(i);
						else if (null != a) {
							var s = this.mountChildren(a, e, n);
							r = s.join("");
						}
					}
					return X[this._tag] && "\n" === r.charAt(0) ? "\n" + r : r;
				},
				_createInitialChildren: function (e, t, n, r) {
					var o = t.dangerouslySetInnerHTML;
					if (null != o) null != o.__html && m.queueHTML(r, o.__html);
					else {
						var i = q[d(t.children)] ? t.children : null,
							a = null != i ? null : t.children;
						if (null != i) m.queueText(r, i);
						else if (null != a) for (var s = this.mountChildren(a, e, n), u = 0; u < s.length; u++) m.queueChild(r, s[u]);
					}
				},
				receiveComponent: function (e, t, n) {
					var r = this._currentElement;
					(this._currentElement = e), this.updateComponent(t, r, e, n);
				},
				updateComponent: function (e, t, n, o) {
					var i = t.props,
						a = this._currentElement.props;
					switch (this._tag) {
						case "button":
							(i = w.getNativeProps(this, i)), (a = w.getNativeProps(this, a));
							break;
						case "input":
							M.updateWrapper(this), (i = M.getNativeProps(this, i)), (a = M.getNativeProps(this, a));
							break;
						case "option":
							(i = O.getNativeProps(this, i)), (a = O.getNativeProps(this, a));
							break;
						case "select":
							(i = N.getNativeProps(this, i)), (a = N.getNativeProps(this, a));
							break;
						case "textarea":
							x.updateWrapper(this), (i = x.getNativeProps(this, i)), (a = x.getNativeProps(this, a));
					}
					r(this, a), this._updateDOMProperties(i, a, e), this._updateDOMChildren(i, a, e, o), "select" === this._tag && e.getReactMountReady().enqueue(u, this);
				},
				_updateDOMProperties: function (e, t, n) {
					var r, i, a;
					for (r in e)
						if (!t.hasOwnProperty(r) && e.hasOwnProperty(r) && null != e[r])
							if (r === W) {
								var s = this._previousStyleCopy;
								for (i in s) s.hasOwnProperty(i) && ((a = a || {}), (a[i] = ""));
								this._previousStyleCopy = null;
							} else B.hasOwnProperty(r) ? e[r] && F(this, r) : (y.properties[r] || y.isCustomAttribute(r)) && b.deleteValueForProperty(j(this), r);
					for (r in t) {
						var u = t[r],
							l = r === W ? this._previousStyleCopy : null != e ? e[r] : void 0;
						if (t.hasOwnProperty(r) && u !== l && (null != u || null != l))
							if (r === W)
								if ((u ? (u = this._previousStyleCopy = f({}, u)) : (this._previousStyleCopy = null), l)) {
									for (i in l) !l.hasOwnProperty(i) || (u && u.hasOwnProperty(i)) || ((a = a || {}), (a[i] = ""));
									for (i in u) u.hasOwnProperty(i) && l[i] !== u[i] && ((a = a || {}), (a[i] = u[i]));
								} else a = u;
							else if (B.hasOwnProperty(r)) u ? o(this, r, u, n) : l && F(this, r);
							else if (c(this._tag, t)) H.hasOwnProperty(r) || b.setValueForAttribute(j(this), r, u);
							else if (y.properties[r] || y.isCustomAttribute(r)) {
								var p = j(this);
								null != u ? b.setValueForProperty(p, r, u) : b.deleteValueForProperty(p, r);
							}
					}
					a && v.setValueForStyles(j(this), a, this);
				},
				_updateDOMChildren: function (e, t, n, r) {
					var o = q[d(e.children)] ? e.children : null,
						i = q[d(t.children)] ? t.children : null,
						a = e.dangerouslySetInnerHTML && e.dangerouslySetInnerHTML.__html,
						s = t.dangerouslySetInnerHTML && t.dangerouslySetInnerHTML.__html,
						u = null != o ? null : e.children,
						l = null != i ? null : t.children,
						c = null != o || null != a,
						p = null != i || null != s;
					null != u && null == l ? this.updateChildren(null, n, r) : c && !p && this.updateTextContent(""),
						null != i ? o !== i && this.updateTextContent("" + i) : null != s ? a !== s && this.updateMarkup("" + s) : null != l && this.updateChildren(l, n, r);
				},
				getNativeNode: function () {
					return j(this);
				},
				unmountComponent: function (e) {
					switch (this._tag) {
						case "iframe":
						case "object":
						case "img":
						case "form":
						case "video":
						case "audio":
							var t = this._wrapperState.listeners;
							if (t) for (var n = 0; n < t.length; n++) t[n].remove();
							break;
						case "html":
						case "head":
						case "body":
							R(!1);
					}
					this.unmountChildren(e),
						T.uncacheNode(this),
						C.deleteAllListeners(this),
						S.unmountIDFromEnvironment(this._rootNodeID),
						(this._rootNodeID = null),
						(this._domID = null),
						(this._wrapperState = null);
				},
				getPublicInstance: function () {
					return j(this);
				},
			}),
			f(p.prototype, p.Mixin, I.Mixin),
			(e.exports = p);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			var n = {
				_topLevelWrapper: e,
				_idCounter: 1,
				_ownerDocument: t ? (t.nodeType === o ? t : t.ownerDocument) : null,
				_node: t,
				_tag: t ? t.nodeName.toLowerCase() : null,
				_namespaceURI: t ? t.namespaceURI : null,
			};
			return n;
		}
		var o = (n(61), 9);
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r, o, i) {}
		var o = n(161),
			i = (n(2), []),
			a = {
				addDevtool: function (e) {
					i.push(e);
				},
				removeDevtool: function (e) {
					for (var t = 0; t < i.length; t++) i[t] === e && (i.splice(t, 1), t--);
				},
				onCreateMarkupForProperty: function (e, t) {
					r("onCreateMarkupForProperty", e, t);
				},
				onSetValueForProperty: function (e, t, n) {
					r("onSetValueForProperty", e, t, n);
				},
				onDeleteValueForProperty: function (e, t) {
					r("onDeleteValueForProperty", e, t);
				},
			};
		a.addDevtool(o), (e.exports = a);
	},
	function (e, t, n) {
		"use strict";
		var r = n(4),
			o = n(24),
			i = n(7),
			a = function (e) {
				(this._currentElement = null), (this._nativeNode = null), (this._nativeParent = null), (this._nativeContainerInfo = null), (this._domID = null);
			};
		r(a.prototype, {
			mountComponent: function (e, t, n, r) {
				var a = n._idCounter++;
				(this._domID = a), (this._nativeParent = t), (this._nativeContainerInfo = n);
				var s = " react-empty: " + this._domID + " ";
				if (e.useCreateElement) {
					var u = n._ownerDocument,
						l = u.createComment(s);
					return i.precacheNode(this, l), o(l);
				}
				return e.renderToStaticMarkup ? "" : "<!--" + s + "-->";
			},
			receiveComponent: function () {},
			getNativeNode: function () {
				return i.getNodeFromInstance(this);
			},
			unmountComponent: function () {
				i.uncacheNode(this);
			},
		}),
			(e.exports = a);
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return o.createFactory(e);
		}
		var o = n(12),
			i = (n(83), n(124)),
			a = i(
				{
					a: "a",
					abbr: "abbr",
					address: "address",
					area: "area",
					article: "article",
					aside: "aside",
					audio: "audio",
					b: "b",
					base: "base",
					bdi: "bdi",
					bdo: "bdo",
					big: "big",
					blockquote: "blockquote",
					body: "body",
					br: "br",
					button: "button",
					canvas: "canvas",
					caption: "caption",
					cite: "cite",
					code: "code",
					col: "col",
					colgroup: "colgroup",
					data: "data",
					datalist: "datalist",
					dd: "dd",
					del: "del",
					details: "details",
					dfn: "dfn",
					dialog: "dialog",
					div: "div",
					dl: "dl",
					dt: "dt",
					em: "em",
					embed: "embed",
					fieldset: "fieldset",
					figcaption: "figcaption",
					figure: "figure",
					footer: "footer",
					form: "form",
					h1: "h1",
					h2: "h2",
					h3: "h3",
					h4: "h4",
					h5: "h5",
					h6: "h6",
					head: "head",
					header: "header",
					hgroup: "hgroup",
					hr: "hr",
					html: "html",
					i: "i",
					iframe: "iframe",
					img: "img",
					input: "input",
					ins: "ins",
					kbd: "kbd",
					keygen: "keygen",
					label: "label",
					legend: "legend",
					li: "li",
					link: "link",
					main: "main",
					map: "map",
					mark: "mark",
					menu: "menu",
					menuitem: "menuitem",
					meta: "meta",
					meter: "meter",
					nav: "nav",
					noscript: "noscript",
					object: "object",
					ol: "ol",
					optgroup: "optgroup",
					option: "option",
					output: "output",
					p: "p",
					param: "param",
					picture: "picture",
					pre: "pre",
					progress: "progress",
					q: "q",
					rp: "rp",
					rt: "rt",
					ruby: "ruby",
					s: "s",
					samp: "samp",
					script: "script",
					section: "section",
					select: "select",
					small: "small",
					source: "source",
					span: "span",
					strong: "strong",
					style: "style",
					sub: "sub",
					summary: "summary",
					sup: "sup",
					table: "table",
					tbody: "tbody",
					td: "td",
					textarea: "textarea",
					tfoot: "tfoot",
					th: "th",
					thead: "thead",
					time: "time",
					title: "title",
					tr: "tr",
					track: "track",
					u: "u",
					ul: "ul",
					var: "var",
					video: "video",
					wbr: "wbr",
					circle: "circle",
					clipPath: "clipPath",
					defs: "defs",
					ellipse: "ellipse",
					g: "g",
					image: "image",
					line: "line",
					linearGradient: "linearGradient",
					mask: "mask",
					path: "path",
					pattern: "pattern",
					polygon: "polygon",
					polyline: "polyline",
					radialGradient: "radialGradient",
					rect: "rect",
					stop: "stop",
					svg: "svg",
					text: "text",
					tspan: "tspan",
				},
				r
			);
		e.exports = a;
	},
	function (e, t) {
		"use strict";
		var n = { useCreateElement: !0 };
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		var r = n(43),
			o = n(7),
			i = {
				dangerouslyProcessChildrenUpdates: function (e, t) {
					var n = o.getNodeFromInstance(e);
					r.processUpdates(n, t);
				},
			};
		e.exports = i;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			this._rootNodeID && d.updateWrapper(this);
		}
		function o(e) {
			var t = this._currentElement.props,
				n = u.executeOnChange(t, e);
			c.asap(r, this);
			var o = t.name;
			if ("radio" === t.type && null != o) {
				for (var i = l.getNodeFromInstance(this), a = i; a.parentNode; ) a = a.parentNode;
				for (var s = a.querySelectorAll("input[name=" + JSON.stringify("" + o) + '][type="radio"]'), d = 0; d < s.length; d++) {
					var f = s[d];
					if (f !== i && f.form === i.form) {
						var h = l.getInstanceFromNode(f);
						h ? void 0 : p(!1), c.asap(r, h);
					}
				}
			}
			return n;
		}
		var i = n(4),
			a = n(33),
			s = n(44),
			u = n(47),
			l = n(7),
			c = n(15),
			p = n(1),
			d =
				(n(2),
				{
					getNativeProps: function (e, t) {
						var n = u.getValue(t),
							r = u.getChecked(t);
						return i({ type: void 0 }, a.getNativeProps(e, t), {
							defaultChecked: void 0,
							defaultValue: void 0,
							value: null != n ? n : e._wrapperState.initialValue,
							checked: null != r ? r : e._wrapperState.initialChecked,
							onChange: e._wrapperState.onChange,
						});
					},
					mountWrapper: function (e, t) {
						var n = t.defaultValue;
						e._wrapperState = { initialChecked: t.defaultChecked || !1, initialValue: null != n ? n : null, listeners: null, onChange: o.bind(e) };
					},
					updateWrapper: function (e) {
						var t = e._currentElement.props,
							n = t.checked;
						null != n && s.setValueForProperty(l.getNodeFromInstance(e), "checked", n || !1);
						var r = u.getValue(t);
						null != r && s.setValueForProperty(l.getNodeFromInstance(e), "value", "" + r);
					},
				});
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		var r = n(149);
		e.exports = { debugTool: r };
	},
	function (e, t, n) {
		"use strict";
		var r = n(4),
			o = n(77),
			i = n(7),
			a = n(82),
			s =
				(n(2),
				{
					mountWrapper: function (e, t, n) {
						var r = null;
						if (null != n) {
							var o = n;
							"optgroup" === o._tag && (o = o._nativeParent), null != o && "select" === o._tag && (r = a.getSelectValueContext(o));
						}
						var i = null;
						if (null != r)
							if (((i = !1), Array.isArray(r))) {
								for (var s = 0; s < r.length; s++)
									if ("" + r[s] == "" + t.value) {
										i = !0;
										break;
									}
							} else i = "" + r == "" + t.value;
						e._wrapperState = { selected: i };
					},
					postMountWrapper: function (e) {
						var t = e._currentElement.props;
						if (null != t.value) {
							i.getNodeFromInstance(e).setAttribute("value", t.value);
						}
					},
					getNativeProps: function (e, t) {
						var n = r({ selected: void 0, children: void 0 }, t);
						null != e._wrapperState.selected && (n.selected = e._wrapperState.selected);
						var i = "";
						return (
							o.forEach(t.children, function (e) {
								null != e && (("string" != typeof e && "number" != typeof e) || (i += e));
							}),
							i && (n.children = i),
							n
						);
					},
				});
		e.exports = s;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return e === n && t === r;
		}
		function o(e) {
			var t = document.selection,
				n = t.createRange(),
				r = n.text.length,
				o = n.duplicate();
			o.moveToElementText(e), o.setEndPoint("EndToStart", n);
			var i = o.text.length;
			return { start: i, end: i + r };
		}
		function i(e) {
			var t = window.getSelection && window.getSelection();
			if (!t || 0 === t.rangeCount) return null;
			var n = t.anchorNode,
				o = t.anchorOffset,
				i = t.focusNode,
				a = t.focusOffset,
				s = t.getRangeAt(0);
			try {
				s.startContainer.nodeType, s.endContainer.nodeType;
			} catch (u) {
				return null;
			}
			var l = r(t.anchorNode, t.anchorOffset, t.focusNode, t.focusOffset),
				c = l ? 0 : s.toString().length,
				p = s.cloneRange();
			p.selectNodeContents(e), p.setEnd(s.startContainer, s.startOffset);
			var d = r(p.startContainer, p.startOffset, p.endContainer, p.endOffset),
				f = d ? 0 : p.toString().length,
				h = f + c,
				v = document.createRange();
			v.setStart(n, o), v.setEnd(i, a);
			var m = v.collapsed;
			return { start: m ? h : f, end: m ? f : h };
		}
		function a(e, t) {
			var n,
				r,
				o = document.selection.createRange().duplicate();
			void 0 === t.end ? ((n = t.start), (r = n)) : t.start > t.end ? ((n = t.end), (r = t.start)) : ((n = t.start), (r = t.end)),
				o.moveToElementText(e),
				o.moveStart("character", n),
				o.setEndPoint("EndToStart", o),
				o.moveEnd("character", r - n),
				o.select();
		}
		function s(e, t) {
			if (window.getSelection) {
				var n = window.getSelection(),
					r = e[c()].length,
					o = Math.min(t.start, r),
					i = void 0 === t.end ? o : Math.min(t.end, r);
				if (!n.extend && o > i) {
					var a = i;
					(i = o), (o = a);
				}
				var s = l(e, o),
					u = l(e, i);
				if (s && u) {
					var p = document.createRange();
					p.setStart(s.node, s.offset), n.removeAllRanges(), o > i ? (n.addRange(p), n.extend(u.node, u.offset)) : (p.setEnd(u.node, u.offset), n.addRange(p));
				}
			}
		}
		var u = n(8),
			l = n(192),
			c = n(99),
			p = u.canUseDOM && "selection" in document && !("getSelection" in window),
			d = { getOffsets: p ? o : i, setOffsets: p ? a : s };
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		var r = n(4),
			o = n(43),
			i = n(24),
			a = n(7),
			s = (n(9), n(40)),
			u = n(1),
			l =
				(n(61),
				function (e) {
					(this._currentElement = e),
						(this._stringText = "" + e),
						(this._nativeNode = null),
						(this._nativeParent = null),
						(this._domID = null),
						(this._mountIndex = 0),
						(this._closingComment = null),
						(this._commentNodes = null);
				});
		r(l.prototype, {
			mountComponent: function (e, t, n, r) {
				var o = n._idCounter++,
					u = " react-text: " + o + " ",
					l = " /react-text ";
				if (((this._domID = o), (this._nativeParent = t), e.useCreateElement)) {
					var c = n._ownerDocument,
						p = c.createComment(u),
						d = c.createComment(l),
						f = i(c.createDocumentFragment());
					return (
						i.queueChild(f, i(p)),
						this._stringText && i.queueChild(f, i(c.createTextNode(this._stringText))),
						i.queueChild(f, i(d)),
						a.precacheNode(this, p),
						(this._closingComment = d),
						f
					);
				}
				var h = s(this._stringText);
				return e.renderToStaticMarkup ? h : "<!--" + u + "-->" + h + "<!--" + l + "-->";
			},
			receiveComponent: function (e, t) {
				if (e !== this._currentElement) {
					this._currentElement = e;
					var n = "" + e;
					if (n !== this._stringText) {
						this._stringText = n;
						var r = this.getNativeNode();
						o.replaceDelimitedText(r[0], r[1], n);
					}
				}
			},
			getNativeNode: function () {
				var e = this._commentNodes;
				if (e) return e;
				if (!this._closingComment)
					for (var t = a.getNodeFromInstance(this), n = t.nextSibling; ; ) {
						if ((null == n ? u(!1) : void 0, 8 === n.nodeType && " /react-text " === n.nodeValue)) {
							this._closingComment = n;
							break;
						}
						n = n.nextSibling;
					}
				return (e = [this._nativeNode, this._closingComment]), (this._commentNodes = e), e;
			},
			unmountComponent: function () {
				(this._closingComment = null), (this._commentNodes = null), a.uncacheNode(this);
			},
		}),
			(e.exports = l);
	},
	function (e, t, n) {
		"use strict";
		function r() {
			this._rootNodeID && d.updateWrapper(this);
		}
		function o(e) {
			var t = this._currentElement.props,
				n = u.executeOnChange(t, e);
			return c.asap(r, this), n;
		}
		var i = n(4),
			a = n(33),
			s = n(44),
			u = n(47),
			l = n(7),
			c = n(15),
			p = n(1),
			d =
				(n(2),
				{
					getNativeProps: function (e, t) {
						return (
							null != t.dangerouslySetInnerHTML ? p(!1) : void 0,
							i({}, a.getNativeProps(e, t), { defaultValue: void 0, value: void 0, children: e._wrapperState.initialValue, onChange: e._wrapperState.onChange })
						);
					},
					mountWrapper: function (e, t) {
						var n = t.defaultValue,
							r = t.children;
						null != r && (null != n ? p(!1) : void 0, Array.isArray(r) && (r.length <= 1 ? void 0 : p(!1), (r = r[0])), (n = "" + r)), null == n && (n = "");
						var i = u.getValue(t);
						e._wrapperState = { initialValue: "" + (null != i ? i : n), listeners: null, onChange: o.bind(e) };
					},
					updateWrapper: function (e) {
						var t = e._currentElement.props,
							n = u.getValue(t);
						null != n && s.setValueForProperty(l.getNodeFromInstance(e), "value", "" + n);
					},
				});
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			"_nativeNode" in e ? void 0 : u(!1), "_nativeNode" in t ? void 0 : u(!1);
			for (var n = 0, r = e; r; r = r._nativeParent) n++;
			for (var o = 0, i = t; i; i = i._nativeParent) o++;
			for (; n - o > 0; ) (e = e._nativeParent), n--;
			for (; o - n > 0; ) (t = t._nativeParent), o--;
			for (var a = n; a--; ) {
				if (e === t) return e;
				(e = e._nativeParent), (t = t._nativeParent);
			}
			return null;
		}
		function o(e, t) {
			"_nativeNode" in e ? void 0 : u(!1), "_nativeNode" in t ? void 0 : u(!1);
			for (; t; ) {
				if (t === e) return !0;
				t = t._nativeParent;
			}
			return !1;
		}
		function i(e) {
			return "_nativeNode" in e ? void 0 : u(!1), e._nativeParent;
		}
		function a(e, t, n) {
			for (var r = []; e; ) r.push(e), (e = e._nativeParent);
			var o;
			for (o = r.length; o-- > 0; ) t(r[o], !1, n);
			for (o = 0; o < r.length; o++) t(r[o], !0, n);
		}
		function s(e, t, n, o, i) {
			for (var a = e && t ? r(e, t) : null, s = []; e && e !== a; ) s.push(e), (e = e._nativeParent);
			for (var u = []; t && t !== a; ) u.push(t), (t = t._nativeParent);
			var l;
			for (l = 0; l < s.length; l++) n(s[l], !0, o);
			for (l = u.length; l-- > 0; ) n(u[l], !1, i);
		}
		var u = n(1);
		e.exports = { isAncestor: o, getLowestCommonAncestor: r, getParentInstance: i, traverseTwoPhase: a, traverseEnterLeave: s };
	},
	function (e, t, n) {
		"use strict";
		var r,
			o =
				(n(23),
				n(34),
				n(2),
				{
					onCreateMarkupForProperty: function (e, t) {
						r(e);
					},
					onSetValueForProperty: function (e, t, n) {
						r(t);
					},
					onDeleteValueForProperty: function (e, t) {
						r(t);
					},
				});
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r, o, i) {}
		function o(e) {}
		var i = (n(8), n(127), n(2), []),
			a = {
				addDevtool: function (e) {
					i.push(e);
				},
				removeDevtool: function (e) {
					for (var t = 0; t < i.length; t++) i[t] === e && (i.splice(t, 1), t--);
				},
				beginProfiling: function () {},
				endProfiling: function () {},
				getFlushHistory: function () {},
				onBeginFlush: function () {
					r("onBeginFlush");
				},
				onEndFlush: function () {
					r("onEndFlush");
				},
				onBeginLifeCycleTimer: function (e, t) {
					o(e), r("onBeginLifeCycleTimer", e, t);
				},
				onEndLifeCycleTimer: function (e, t) {
					o(e), r("onEndLifeCycleTimer", e, t);
				},
				onBeginReconcilerTimer: function (e, t) {
					o(e), r("onBeginReconcilerTimer", e, t);
				},
				onEndReconcilerTimer: function (e, t) {
					o(e), r("onEndReconcilerTimer", e, t);
				},
				onBeginProcessingChildContext: function () {
					r("onBeginProcessingChildContext");
				},
				onEndProcessingChildContext: function () {
					r("onEndProcessingChildContext");
				},
				onNativeOperation: function (e, t, n) {
					o(e), r("onNativeOperation", e, t, n);
				},
				onSetState: function () {
					r("onSetState");
				},
				onSetDisplayName: function (e, t) {
					o(e), r("onSetDisplayName", e, t);
				},
				onSetChildren: function (e, t) {
					o(e), r("onSetChildren", e, t);
				},
				onSetOwner: function (e, t) {
					o(e), r("onSetOwner", e, t);
				},
				onSetText: function (e, t) {
					o(e), r("onSetText", e, t);
				},
				onMountRootComponent: function (e) {
					o(e), r("onMountRootComponent", e);
				},
				onMountComponent: function (e) {
					o(e), r("onMountComponent", e);
				},
				onUpdateComponent: function (e) {
					o(e), r("onUpdateComponent", e);
				},
				onUnmountComponent: function (e) {
					o(e), r("onUnmountComponent", e);
				},
			};
		e.exports = a;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			this.reinitializeTransaction();
		}
		var o = n(4),
			i = n(15),
			a = n(39),
			s = n(10),
			u = {
				initialize: s,
				close: function () {
					d.isBatchingUpdates = !1;
				},
			},
			l = { initialize: s, close: i.flushBatchedUpdates.bind(i) },
			c = [l, u];
		o(r.prototype, a.Mixin, {
			getTransactionWrappers: function () {
				return c;
			},
		});
		var p = new r(),
			d = {
				isBatchingUpdates: !1,
				batchedUpdates: function (e, t, n, r, o, i) {
					var a = d.isBatchingUpdates;
					(d.isBatchingUpdates = !0), a ? e(t, n, r, o, i) : p.perform(e, null, t, n, r, o, i);
				},
			};
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		function r() {
			E ||
				((E = !0),
				g.EventEmitter.injectReactEventListener(m),
				g.EventPluginHub.injectEventPluginOrder(a),
				g.EventPluginUtils.injectComponentTree(p),
				g.EventPluginUtils.injectTreeTraversal(f),
				g.EventPluginHub.injectEventPluginsByName({ SimpleEventPlugin: C, EnterLeaveEventPlugin: s, ChangeEventPlugin: i, SelectEventPlugin: _, BeforeInputEventPlugin: o }),
				g.NativeComponent.injectGenericComponentClass(c),
				g.NativeComponent.injectTextComponentClass(h),
				g.DOMProperty.injectDOMPropertyConfig(u),
				g.DOMProperty.injectDOMPropertyConfig(b),
				g.EmptyComponent.injectEmptyComponentFactory(function (e) {
					return new d(e);
				}),
				g.Updates.injectReconcileTransaction(y),
				g.Updates.injectBatchingStrategy(v),
				g.Component.injectEnvironment(l));
		}
		var o = n(134),
			i = n(136),
			a = n(138),
			s = n(139),
			u = n(141),
			l = n(80),
			c = n(147),
			p = n(7),
			d = n(150),
			f = n(160),
			h = n(158),
			v = n(163),
			m = n(166),
			g = n(167),
			y = n(171),
			b = n(174),
			_ = n(175),
			C = n(176),
			E = !1;
		e.exports = { inject: r };
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			o.enqueueEvents(e), o.processEventQueue(!1);
		}
		var o = n(27),
			i = {
				handleTopLevel: function (e, t, n, i) {
					r(o.extractEvents(e, t, n, i));
				},
			};
		e.exports = i;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			for (; e._nativeParent; ) e = e._nativeParent;
			var t = p.getNodeFromInstance(e),
				n = t.parentNode;
			return p.getClosestInstanceFromNode(n);
		}
		function o(e, t) {
			(this.topLevelType = e), (this.nativeEvent = t), (this.ancestors = []);
		}
		function i(e) {
			var t = f(e.nativeEvent),
				n = p.getClosestInstanceFromNode(t),
				o = n;
			do e.ancestors.push(o), (o = o && r(o));
			while (o);
			for (var i = 0; i < e.ancestors.length; i++) (n = e.ancestors[i]), v._handleTopLevel(e.topLevelType, n, e.nativeEvent, f(e.nativeEvent));
		}
		function a(e) {
			e(h(window));
		}
		var s = n(4),
			u = n(66),
			l = n(8),
			c = n(21),
			p = n(7),
			d = n(15),
			f = n(55),
			h = n(119);
		s(o.prototype, {
			destructor: function () {
				(this.topLevelType = null), (this.nativeEvent = null), (this.ancestors.length = 0);
			},
		}),
			c.addPoolingTo(o, c.twoArgumentPooler);
		var v = {
			_enabled: !0,
			_handleTopLevel: null,
			WINDOW_HANDLE: l.canUseDOM ? window : null,
			setHandleTopLevel: function (e) {
				v._handleTopLevel = e;
			},
			setEnabled: function (e) {
				v._enabled = !!e;
			},
			isEnabled: function () {
				return v._enabled;
			},
			trapBubbledEvent: function (e, t, n) {
				var r = n;
				return r ? u.listen(r, t, v.dispatchEvent.bind(null, e)) : null;
			},
			trapCapturedEvent: function (e, t, n) {
				var r = n;
				return r ? u.capture(r, t, v.dispatchEvent.bind(null, e)) : null;
			},
			monitorScrollValue: function (e) {
				var t = a.bind(null, e);
				u.listen(window, "scroll", t);
			},
			dispatchEvent: function (e, t) {
				if (v._enabled) {
					var n = o.getPooled(e, t);
					try {
						d.batchedUpdates(i, n);
					} finally {
						o.release(n);
					}
				}
			},
		};
		e.exports = v;
	},
	function (e, t, n) {
		"use strict";
		var r = n(23),
			o = n(27),
			i = n(45),
			a = n(48),
			s = n(78),
			u = n(84),
			l = n(35),
			c = n(89),
			p = n(15),
			d = {
				Component: a.injection,
				Class: s.injection,
				DOMProperty: r.injection,
				EmptyComponent: u.injection,
				EventPluginHub: o.injection,
				EventPluginUtils: i.injection,
				EventEmitter: l.injection,
				NativeComponent: c.injection,
				Updates: p.injection,
			};
		e.exports = d;
	},
	function (e, t, n) {
		"use strict";
		var r = n(187),
			o = /\/?>/,
			i = /^<\!\-\-/,
			a = {
				CHECKSUM_ATTR_NAME: "data-react-checksum",
				addChecksumToMarkup: function (e) {
					var t = r(e);
					return i.test(e) ? e : e.replace(o, " " + a.CHECKSUM_ATTR_NAME + '="' + t + '"$&');
				},
				canReuseMarkup: function (e, t) {
					var n = t.getAttribute(a.CHECKSUM_ATTR_NAME);
					return (n = n && parseInt(n, 10)), r(e) === n;
				},
			};
		e.exports = a;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n) {
			return { type: p.INSERT_MARKUP, content: e, fromIndex: null, fromNode: null, toIndex: n, afterNode: t };
		}
		function o(e, t, n) {
			return { type: p.MOVE_EXISTING, content: null, fromIndex: e._mountIndex, fromNode: d.getNativeNode(e), toIndex: n, afterNode: t };
		}
		function i(e, t) {
			return { type: p.REMOVE_NODE, content: null, fromIndex: e._mountIndex, fromNode: t, toIndex: null, afterNode: null };
		}
		function a(e) {
			return { type: p.SET_MARKUP, content: e, fromIndex: null, fromNode: null, toIndex: null, afterNode: null };
		}
		function s(e) {
			return { type: p.TEXT_CONTENT, content: e, fromIndex: null, fromNode: null, toIndex: null, afterNode: null };
		}
		function u(e, t) {
			return t && ((e = e || []), e.push(t)), e;
		}
		function l(e, t) {
			c.processChildrenUpdates(e, t);
		}
		var c = n(48),
			p = (n(9), n(88)),
			d = (n(22), n(25)),
			f = n(143),
			h = (n(10), n(190)),
			v = n(1),
			m = {
				Mixin: {
					_reconcilerInstantiateChildren: function (e, t, n) {
						return f.instantiateChildren(e, t, n);
					},
					_reconcilerUpdateChildren: function (e, t, n, r, o) {
						var i;
						return (i = h(t)), f.updateChildren(e, i, n, r, o), i;
					},
					mountChildren: function (e, t, n) {
						var r = this._reconcilerInstantiateChildren(e, t, n);
						this._renderedChildren = r;
						var o = [],
							i = 0;
						for (var a in r)
							if (r.hasOwnProperty(a)) {
								var s = r[a],
									u = d.mountComponent(s, t, this, this._nativeContainerInfo, n);
								(s._mountIndex = i++), o.push(u);
							}
						return o;
					},
					updateTextContent: function (e) {
						var t = this._renderedChildren;
						f.unmountChildren(t, !1);
						for (var n in t) t.hasOwnProperty(n) && v(!1);
						l(this, [s(e)]);
					},
					updateMarkup: function (e) {
						var t = this._renderedChildren;
						f.unmountChildren(t, !1);
						for (var n in t) t.hasOwnProperty(n) && v(!1);
						l(this, [a(e)]);
					},
					updateChildren: function (e, t, n) {
						this._updateChildren(e, t, n);
					},
					_updateChildren: function (e, t, n) {
						var r = this._renderedChildren,
							o = {},
							i = this._reconcilerUpdateChildren(r, e, o, t, n);
						if (i || r) {
							var a,
								s = null,
								c = 0,
								p = 0,
								f = null;
							for (a in i)
								if (i.hasOwnProperty(a)) {
									var h = r && r[a],
										v = i[a];
									h === v
										? ((s = u(s, this.moveChild(h, f, p, c))), (c = Math.max(h._mountIndex, c)), (h._mountIndex = p))
										: (h && (c = Math.max(h._mountIndex, c)), (s = u(s, this._mountChildAtIndex(v, f, p, t, n)))),
										p++,
										(f = d.getNativeNode(v));
								}
							for (a in o) o.hasOwnProperty(a) && (s = u(s, this._unmountChild(r[a], o[a])));
							s && l(this, s), (this._renderedChildren = i);
						}
					},
					unmountChildren: function (e) {
						var t = this._renderedChildren;
						f.unmountChildren(t, e), (this._renderedChildren = null);
					},
					moveChild: function (e, t, n, r) {
						if (e._mountIndex < r) return o(e, t, n);
					},
					createChild: function (e, t, n) {
						return r(n, t, e._mountIndex);
					},
					removeChild: function (e, t) {
						return i(e, t);
					},
					_mountChildAtIndex: function (e, t, n, r, o) {
						var i = d.mountComponent(e, r, this, this._nativeContainerInfo, o);
						return (e._mountIndex = n), this.createChild(e, t, i);
					},
					_unmountChild: function (e, t) {
						var n = this.removeChild(e, t);
						return (e._mountIndex = null), n;
					},
				},
			};
		e.exports = m;
	},
	function (e, t, n) {
		"use strict";
		var r = n(1),
			o = {
				isValidOwner: function (e) {
					return !(!e || "function" != typeof e.attachRef || "function" != typeof e.detachRef);
				},
				addComponentAsRefTo: function (e, t, n) {
					o.isValidOwner(n) ? void 0 : r(!1), n.attachRef(t, e);
				},
				removeComponentAsRefFrom: function (e, t, n) {
					o.isValidOwner(n) ? void 0 : r(!1);
					var i = n.getPublicInstance();
					i && i.refs[t] === e.getPublicInstance() && n.detachRef(t);
				},
			};
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			this.reinitializeTransaction(), (this.renderToStaticMarkup = !1), (this.reactMountReady = i.getPooled(null)), (this.useCreateElement = e);
		}
		var o = n(4),
			i = n(75),
			a = n(21),
			s = n(35),
			u = n(86),
			l = n(39),
			c = { initialize: u.getSelectionInformation, close: u.restoreSelection },
			p = {
				initialize: function () {
					var e = s.isEnabled();
					return s.setEnabled(!1), e;
				},
				close: function (e) {
					s.setEnabled(e);
				},
			},
			d = {
				initialize: function () {
					this.reactMountReady.reset();
				},
				close: function () {
					this.reactMountReady.notifyAll();
				},
			},
			f = [c, p, d],
			h = {
				getTransactionWrappers: function () {
					return f;
				},
				getReactMountReady: function () {
					return this.reactMountReady;
				},
				checkpoint: function () {
					return this.reactMountReady.checkpoint();
				},
				rollback: function (e) {
					this.reactMountReady.rollback(e);
				},
				destructor: function () {
					i.release(this.reactMountReady), (this.reactMountReady = null);
				},
			};
		o(r.prototype, l.Mixin, h), a.addPoolingTo(r), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n) {
			"function" == typeof e ? e(t.getPublicInstance()) : i.addComponentAsRefTo(t, e, n);
		}
		function o(e, t, n) {
			"function" == typeof e ? e(null) : i.removeComponentAsRefFrom(t, e, n);
		}
		var i = n(170),
			a = {};
		(a.attachRefs = function (e, t) {
			if (null !== t && t !== !1) {
				var n = t.ref;
				null != n && r(n, e, t._owner);
			}
		}),
			(a.shouldUpdateRefs = function (e, t) {
				var n = null === e || e === !1,
					r = null === t || t === !1;
				return n || r || t._owner !== e._owner || t.ref !== e.ref;
			}),
			(a.detachRefs = function (e, t) {
				if (null !== t && t !== !1) {
					var n = t.ref;
					null != n && o(n, e, t._owner);
				}
			}),
			(e.exports = a);
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			this.reinitializeTransaction(), (this.renderToStaticMarkup = e), (this.useCreateElement = !1);
		}
		var o = n(4),
			i = n(21),
			a = n(39),
			s = [],
			u = { enqueue: function () {} },
			l = {
				getTransactionWrappers: function () {
					return s;
				},
				getReactMountReady: function () {
					return u;
				},
				destructor: function () {},
				checkpoint: function () {},
				rollback: function () {},
			};
		o(r.prototype, a.Mixin, l), i.addPoolingTo(r), (e.exports = r);
	},
	function (e, t) {
		"use strict";
		var n = { xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace" },
			r = {
				accentHeight: "accent-height",
				accumulate: 0,
				additive: 0,
				alignmentBaseline: "alignment-baseline",
				allowReorder: "allowReorder",
				alphabetic: 0,
				amplitude: 0,
				arabicForm: "arabic-form",
				ascent: 0,
				attributeName: "attributeName",
				attributeType: "attributeType",
				autoReverse: "autoReverse",
				azimuth: 0,
				baseFrequency: "baseFrequency",
				baseProfile: "baseProfile",
				baselineShift: "baseline-shift",
				bbox: 0,
				begin: 0,
				bias: 0,
				by: 0,
				calcMode: "calcMode",
				capHeight: "cap-height",
				clip: 0,
				clipPath: "clip-path",
				clipRule: "clip-rule",
				clipPathUnits: "clipPathUnits",
				colorInterpolation: "color-interpolation",
				colorInterpolationFilters: "color-interpolation-filters",
				colorProfile: "color-profile",
				colorRendering: "color-rendering",
				contentScriptType: "contentScriptType",
				contentStyleType: "contentStyleType",
				cursor: 0,
				cx: 0,
				cy: 0,
				d: 0,
				decelerate: 0,
				descent: 0,
				diffuseConstant: "diffuseConstant",
				direction: 0,
				display: 0,
				divisor: 0,
				dominantBaseline: "dominant-baseline",
				dur: 0,
				dx: 0,
				dy: 0,
				edgeMode: "edgeMode",
				elevation: 0,
				enableBackground: "enable-background",
				end: 0,
				exponent: 0,
				externalResourcesRequired: "externalResourcesRequired",
				fill: 0,
				fillOpacity: "fill-opacity",
				fillRule: "fill-rule",
				filter: 0,
				filterRes: "filterRes",
				filterUnits: "filterUnits",
				floodColor: "flood-color",
				floodOpacity: "flood-opacity",
				focusable: 0,
				fontFamily: "font-family",
				fontSize: "font-size",
				fontSizeAdjust: "font-size-adjust",
				fontStretch: "font-stretch",
				fontStyle: "font-style",
				fontVariant: "font-variant",
				fontWeight: "font-weight",
				format: 0,
				from: 0,
				fx: 0,
				fy: 0,
				g1: 0,
				g2: 0,
				glyphName: "glyph-name",
				glyphOrientationHorizontal: "glyph-orientation-horizontal",
				glyphOrientationVertical: "glyph-orientation-vertical",
				glyphRef: "glyphRef",
				gradientTransform: "gradientTransform",
				gradientUnits: "gradientUnits",
				hanging: 0,
				horizAdvX: "horiz-adv-x",
				horizOriginX: "horiz-origin-x",
				ideographic: 0,
				imageRendering: "image-rendering",
				in: 0,
				in2: 0,
				intercept: 0,
				k: 0,
				k1: 0,
				k2: 0,
				k3: 0,
				k4: 0,
				kernelMatrix: "kernelMatrix",
				kernelUnitLength: "kernelUnitLength",
				kerning: 0,
				keyPoints: "keyPoints",
				keySplines: "keySplines",
				keyTimes: "keyTimes",
				lengthAdjust: "lengthAdjust",
				letterSpacing: "letter-spacing",
				lightingColor: "lighting-color",
				limitingConeAngle: "limitingConeAngle",
				local: 0,
				markerEnd: "marker-end",
				markerMid: "marker-mid",
				markerStart: "marker-start",
				markerHeight: "markerHeight",
				markerUnits: "markerUnits",
				markerWidth: "markerWidth",
				mask: 0,
				maskContentUnits: "maskContentUnits",
				maskUnits: "maskUnits",
				mathematical: 0,
				mode: 0,
				numOctaves: "numOctaves",
				offset: 0,
				opacity: 0,
				operator: 0,
				order: 0,
				orient: 0,
				orientation: 0,
				origin: 0,
				overflow: 0,
				overlinePosition: "overline-position",
				overlineThickness: "overline-thickness",
				paintOrder: "paint-order",
				panose1: "panose-1",
				pathLength: "pathLength",
				patternContentUnits: "patternContentUnits",
				patternTransform: "patternTransform",
				patternUnits: "patternUnits",
				pointerEvents: "pointer-events",
				points: 0,
				pointsAtX: "pointsAtX",
				pointsAtY: "pointsAtY",
				pointsAtZ: "pointsAtZ",
				preserveAlpha: "preserveAlpha",
				preserveAspectRatio: "preserveAspectRatio",
				primitiveUnits: "primitiveUnits",
				r: 0,
				radius: 0,
				refX: "refX",
				refY: "refY",
				renderingIntent: "rendering-intent",
				repeatCount: "repeatCount",
				repeatDur: "repeatDur",
				requiredExtensions: "requiredExtensions",
				requiredFeatures: "requiredFeatures",
				restart: 0,
				result: 0,
				rotate: 0,
				rx: 0,
				ry: 0,
				scale: 0,
				seed: 0,
				shapeRendering: "shape-rendering",
				slope: 0,
				spacing: 0,
				specularConstant: "specularConstant",
				specularExponent: "specularExponent",
				speed: 0,
				spreadMethod: "spreadMethod",
				startOffset: "startOffset",
				stdDeviation: "stdDeviation",
				stemh: 0,
				stemv: 0,
				stitchTiles: "stitchTiles",
				stopColor: "stop-color",
				stopOpacity: "stop-opacity",
				strikethroughPosition: "strikethrough-position",
				strikethroughThickness: "strikethrough-thickness",
				string: 0,
				stroke: 0,
				strokeDasharray: "stroke-dasharray",
				strokeDashoffset: "stroke-dashoffset",
				strokeLinecap: "stroke-linecap",
				strokeLinejoin: "stroke-linejoin",
				strokeMiterlimit: "stroke-miterlimit",
				strokeOpacity: "stroke-opacity",
				strokeWidth: "stroke-width",
				surfaceScale: "surfaceScale",
				systemLanguage: "systemLanguage",
				tableValues: "tableValues",
				targetX: "targetX",
				targetY: "targetY",
				textAnchor: "text-anchor",
				textDecoration: "text-decoration",
				textRendering: "text-rendering",
				textLength: "textLength",
				to: 0,
				transform: 0,
				u1: 0,
				u2: 0,
				underlinePosition: "underline-position",
				underlineThickness: "underline-thickness",
				unicode: 0,
				unicodeBidi: "unicode-bidi",
				unicodeRange: "unicode-range",
				unitsPerEm: "units-per-em",
				vAlphabetic: "v-alphabetic",
				vHanging: "v-hanging",
				vIdeographic: "v-ideographic",
				vMathematical: "v-mathematical",
				values: 0,
				vectorEffect: "vector-effect",
				version: 0,
				vertAdvY: "vert-adv-y",
				vertOriginX: "vert-origin-x",
				vertOriginY: "vert-origin-y",
				viewBox: "viewBox",
				viewTarget: "viewTarget",
				visibility: 0,
				widths: 0,
				wordSpacing: "word-spacing",
				writingMode: "writing-mode",
				x: 0,
				xHeight: "x-height",
				x1: 0,
				x2: 0,
				xChannelSelector: "xChannelSelector",
				xlinkActuate: "xlink:actuate",
				xlinkArcrole: "xlink:arcrole",
				xlinkHref: "xlink:href",
				xlinkRole: "xlink:role",
				xlinkShow: "xlink:show",
				xlinkTitle: "xlink:title",
				xlinkType: "xlink:type",
				xmlBase: "xml:base",
				xmlLang: "xml:lang",
				xmlSpace: "xml:space",
				y: 0,
				y1: 0,
				y2: 0,
				yChannelSelector: "yChannelSelector",
				z: 0,
				zoomAndPan: "zoomAndPan",
			},
			o = {
				Properties: {},
				DOMAttributeNamespaces: {
					xlinkActuate: n.xlink,
					xlinkArcrole: n.xlink,
					xlinkHref: n.xlink,
					xlinkRole: n.xlink,
					xlinkShow: n.xlink,
					xlinkTitle: n.xlink,
					xlinkType: n.xlink,
					xmlBase: n.xml,
					xmlLang: n.xml,
					xmlSpace: n.xml,
				},
				DOMAttributeNames: {},
			};
		Object.keys(r).forEach(function (e) {
			(o.Properties[e] = 0), r[e] && (o.DOMAttributeNames[e] = r[e]);
		}),
			(e.exports = o);
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			if ("selectionStart" in e && l.hasSelectionCapabilities(e)) return { start: e.selectionStart, end: e.selectionEnd };
			if (window.getSelection) {
				var t = window.getSelection();
				return { anchorNode: t.anchorNode, anchorOffset: t.anchorOffset, focusNode: t.focusNode, focusOffset: t.focusOffset };
			}
			if (document.selection) {
				var n = document.selection.createRange();
				return { parentElement: n.parentElement(), text: n.text, top: n.boundingTop, left: n.boundingLeft };
			}
		}
		function o(e, t) {
			if (C || null == y || y !== p()) return null;
			var n = r(y);
			if (!_ || !h(_, n)) {
				_ = n;
				var o = c.getPooled(g.select, b, e, t);
				return (o.type = "select"), (o.target = y), a.accumulateTwoPhaseDispatches(o), o;
			}
			return null;
		}
		var i = n(17),
			a = n(28),
			s = n(8),
			u = n(7),
			l = n(86),
			c = n(18),
			p = n(68),
			d = n(101),
			f = n(20),
			h = n(70),
			v = i.topLevelTypes,
			m = s.canUseDOM && "documentMode" in document && document.documentMode <= 11,
			g = {
				select: {
					phasedRegistrationNames: { bubbled: f({ onSelect: null }), captured: f({ onSelectCapture: null }) },
					dependencies: [v.topBlur, v.topContextMenu, v.topFocus, v.topKeyDown, v.topMouseDown, v.topMouseUp, v.topSelectionChange],
				},
			},
			y = null,
			b = null,
			_ = null,
			C = !1,
			E = !1,
			k = f({ onSelect: null }),
			S = {
				eventTypes: g,
				extractEvents: function (e, t, n, r) {
					if (!E) return null;
					var i = t ? u.getNodeFromInstance(t) : window;
					switch (e) {
						case v.topFocus:
							(d(i) || "true" === i.contentEditable) && ((y = i), (b = t), (_ = null));
							break;
						case v.topBlur:
							(y = null), (b = null), (_ = null);
							break;
						case v.topMouseDown:
							C = !0;
							break;
						case v.topContextMenu:
						case v.topMouseUp:
							return (C = !1), o(n, r);
						case v.topSelectionChange:
							if (m) break;
						case v.topKeyDown:
						case v.topKeyUp:
							return o(n, r);
					}
					return null;
				},
				didPutListener: function (e, t, n) {
					t === k && (E = !0);
				},
			};
		e.exports = S;
	},
	function (e, t, n) {
		"use strict";
		var r = n(17),
			o = n(66),
			i = n(28),
			a = n(7),
			s = n(177),
			u = n(178),
			l = n(18),
			c = n(181),
			p = n(183),
			d = n(38),
			f = n(180),
			h = n(184),
			v = n(185),
			m = n(29),
			g = n(186),
			y = n(10),
			b = n(53),
			_ = n(1),
			C = n(20),
			E = r.topLevelTypes,
			k = {
				abort: { phasedRegistrationNames: { bubbled: C({ onAbort: !0 }), captured: C({ onAbortCapture: !0 }) } },
				animationEnd: { phasedRegistrationNames: { bubbled: C({ onAnimationEnd: !0 }), captured: C({ onAnimationEndCapture: !0 }) } },
				animationIteration: { phasedRegistrationNames: { bubbled: C({ onAnimationIteration: !0 }), captured: C({ onAnimationIterationCapture: !0 }) } },
				animationStart: { phasedRegistrationNames: { bubbled: C({ onAnimationStart: !0 }), captured: C({ onAnimationStartCapture: !0 }) } },
				blur: { phasedRegistrationNames: { bubbled: C({ onBlur: !0 }), captured: C({ onBlurCapture: !0 }) } },
				canPlay: { phasedRegistrationNames: { bubbled: C({ onCanPlay: !0 }), captured: C({ onCanPlayCapture: !0 }) } },
				canPlayThrough: { phasedRegistrationNames: { bubbled: C({ onCanPlayThrough: !0 }), captured: C({ onCanPlayThroughCapture: !0 }) } },
				click: { phasedRegistrationNames: { bubbled: C({ onClick: !0 }), captured: C({ onClickCapture: !0 }) } },
				contextMenu: { phasedRegistrationNames: { bubbled: C({ onContextMenu: !0 }), captured: C({ onContextMenuCapture: !0 }) } },
				copy: { phasedRegistrationNames: { bubbled: C({ onCopy: !0 }), captured: C({ onCopyCapture: !0 }) } },
				cut: { phasedRegistrationNames: { bubbled: C({ onCut: !0 }), captured: C({ onCutCapture: !0 }) } },
				doubleClick: { phasedRegistrationNames: { bubbled: C({ onDoubleClick: !0 }), captured: C({ onDoubleClickCapture: !0 }) } },
				drag: { phasedRegistrationNames: { bubbled: C({ onDrag: !0 }), captured: C({ onDragCapture: !0 }) } },
				dragEnd: { phasedRegistrationNames: { bubbled: C({ onDragEnd: !0 }), captured: C({ onDragEndCapture: !0 }) } },
				dragEnter: { phasedRegistrationNames: { bubbled: C({ onDragEnter: !0 }), captured: C({ onDragEnterCapture: !0 }) } },
				dragExit: { phasedRegistrationNames: { bubbled: C({ onDragExit: !0 }), captured: C({ onDragExitCapture: !0 }) } },
				dragLeave: { phasedRegistrationNames: { bubbled: C({ onDragLeave: !0 }), captured: C({ onDragLeaveCapture: !0 }) } },
				dragOver: { phasedRegistrationNames: { bubbled: C({ onDragOver: !0 }), captured: C({ onDragOverCapture: !0 }) } },
				dragStart: { phasedRegistrationNames: { bubbled: C({ onDragStart: !0 }), captured: C({ onDragStartCapture: !0 }) } },
				drop: { phasedRegistrationNames: { bubbled: C({ onDrop: !0 }), captured: C({ onDropCapture: !0 }) } },
				durationChange: { phasedRegistrationNames: { bubbled: C({ onDurationChange: !0 }), captured: C({ onDurationChangeCapture: !0 }) } },
				emptied: { phasedRegistrationNames: { bubbled: C({ onEmptied: !0 }), captured: C({ onEmptiedCapture: !0 }) } },
				encrypted: { phasedRegistrationNames: { bubbled: C({ onEncrypted: !0 }), captured: C({ onEncryptedCapture: !0 }) } },
				ended: { phasedRegistrationNames: { bubbled: C({ onEnded: !0 }), captured: C({ onEndedCapture: !0 }) } },
				error: { phasedRegistrationNames: { bubbled: C({ onError: !0 }), captured: C({ onErrorCapture: !0 }) } },
				focus: { phasedRegistrationNames: { bubbled: C({ onFocus: !0 }), captured: C({ onFocusCapture: !0 }) } },
				input: { phasedRegistrationNames: { bubbled: C({ onInput: !0 }), captured: C({ onInputCapture: !0 }) } },
				invalid: { phasedRegistrationNames: { bubbled: C({ onInvalid: !0 }), captured: C({ onInvalidCapture: !0 }) } },
				keyDown: { phasedRegistrationNames: { bubbled: C({ onKeyDown: !0 }), captured: C({ onKeyDownCapture: !0 }) } },
				keyPress: { phasedRegistrationNames: { bubbled: C({ onKeyPress: !0 }), captured: C({ onKeyPressCapture: !0 }) } },
				keyUp: { phasedRegistrationNames: { bubbled: C({ onKeyUp: !0 }), captured: C({ onKeyUpCapture: !0 }) } },
				load: { phasedRegistrationNames: { bubbled: C({ onLoad: !0 }), captured: C({ onLoadCapture: !0 }) } },
				loadedData: { phasedRegistrationNames: { bubbled: C({ onLoadedData: !0 }), captured: C({ onLoadedDataCapture: !0 }) } },
				loadedMetadata: { phasedRegistrationNames: { bubbled: C({ onLoadedMetadata: !0 }), captured: C({ onLoadedMetadataCapture: !0 }) } },
				loadStart: { phasedRegistrationNames: { bubbled: C({ onLoadStart: !0 }), captured: C({ onLoadStartCapture: !0 }) } },
				mouseDown: { phasedRegistrationNames: { bubbled: C({ onMouseDown: !0 }), captured: C({ onMouseDownCapture: !0 }) } },
				mouseMove: { phasedRegistrationNames: { bubbled: C({ onMouseMove: !0 }), captured: C({ onMouseMoveCapture: !0 }) } },
				mouseOut: { phasedRegistrationNames: { bubbled: C({ onMouseOut: !0 }), captured: C({ onMouseOutCapture: !0 }) } },
				mouseOver: { phasedRegistrationNames: { bubbled: C({ onMouseOver: !0 }), captured: C({ onMouseOverCapture: !0 }) } },
				mouseUp: { phasedRegistrationNames: { bubbled: C({ onMouseUp: !0 }), captured: C({ onMouseUpCapture: !0 }) } },
				paste: { phasedRegistrationNames: { bubbled: C({ onPaste: !0 }), captured: C({ onPasteCapture: !0 }) } },
				pause: { phasedRegistrationNames: { bubbled: C({ onPause: !0 }), captured: C({ onPauseCapture: !0 }) } },
				play: { phasedRegistrationNames: { bubbled: C({ onPlay: !0 }), captured: C({ onPlayCapture: !0 }) } },
				playing: { phasedRegistrationNames: { bubbled: C({ onPlaying: !0 }), captured: C({ onPlayingCapture: !0 }) } },
				progress: { phasedRegistrationNames: { bubbled: C({ onProgress: !0 }), captured: C({ onProgressCapture: !0 }) } },
				rateChange: { phasedRegistrationNames: { bubbled: C({ onRateChange: !0 }), captured: C({ onRateChangeCapture: !0 }) } },
				reset: { phasedRegistrationNames: { bubbled: C({ onReset: !0 }), captured: C({ onResetCapture: !0 }) } },
				scroll: { phasedRegistrationNames: { bubbled: C({ onScroll: !0 }), captured: C({ onScrollCapture: !0 }) } },
				seeked: { phasedRegistrationNames: { bubbled: C({ onSeeked: !0 }), captured: C({ onSeekedCapture: !0 }) } },
				seeking: { phasedRegistrationNames: { bubbled: C({ onSeeking: !0 }), captured: C({ onSeekingCapture: !0 }) } },
				stalled: { phasedRegistrationNames: { bubbled: C({ onStalled: !0 }), captured: C({ onStalledCapture: !0 }) } },
				submit: { phasedRegistrationNames: { bubbled: C({ onSubmit: !0 }), captured: C({ onSubmitCapture: !0 }) } },
				suspend: { phasedRegistrationNames: { bubbled: C({ onSuspend: !0 }), captured: C({ onSuspendCapture: !0 }) } },
				timeUpdate: { phasedRegistrationNames: { bubbled: C({ onTimeUpdate: !0 }), captured: C({ onTimeUpdateCapture: !0 }) } },
				touchCancel: { phasedRegistrationNames: { bubbled: C({ onTouchCancel: !0 }), captured: C({ onTouchCancelCapture: !0 }) } },
				touchEnd: { phasedRegistrationNames: { bubbled: C({ onTouchEnd: !0 }), captured: C({ onTouchEndCapture: !0 }) } },
				touchMove: { phasedRegistrationNames: { bubbled: C({ onTouchMove: !0 }), captured: C({ onTouchMoveCapture: !0 }) } },
				touchStart: { phasedRegistrationNames: { bubbled: C({ onTouchStart: !0 }), captured: C({ onTouchStartCapture: !0 }) } },
				transitionEnd: { phasedRegistrationNames: { bubbled: C({ onTransitionEnd: !0 }), captured: C({ onTransitionEndCapture: !0 }) } },
				volumeChange: { phasedRegistrationNames: { bubbled: C({ onVolumeChange: !0 }), captured: C({ onVolumeChangeCapture: !0 }) } },
				waiting: { phasedRegistrationNames: { bubbled: C({ onWaiting: !0 }), captured: C({ onWaitingCapture: !0 }) } },
				wheel: { phasedRegistrationNames: { bubbled: C({ onWheel: !0 }), captured: C({ onWheelCapture: !0 }) } },
			},
			S = {
				topAbort: k.abort,
				topAnimationEnd: k.animationEnd,
				topAnimationIteration: k.animationIteration,
				topAnimationStart: k.animationStart,
				topBlur: k.blur,
				topCanPlay: k.canPlay,
				topCanPlayThrough: k.canPlayThrough,
				topClick: k.click,
				topContextMenu: k.contextMenu,
				topCopy: k.copy,
				topCut: k.cut,
				topDoubleClick: k.doubleClick,
				topDrag: k.drag,
				topDragEnd: k.dragEnd,
				topDragEnter: k.dragEnter,
				topDragExit: k.dragExit,
				topDragLeave: k.dragLeave,
				topDragOver: k.dragOver,
				topDragStart: k.dragStart,
				topDrop: k.drop,
				topDurationChange: k.durationChange,
				topEmptied: k.emptied,
				topEncrypted: k.encrypted,
				topEnded: k.ended,
				topError: k.error,
				topFocus: k.focus,
				topInput: k.input,
				topInvalid: k.invalid,
				topKeyDown: k.keyDown,
				topKeyPress: k.keyPress,
				topKeyUp: k.keyUp,
				topLoad: k.load,
				topLoadedData: k.loadedData,
				topLoadedMetadata: k.loadedMetadata,
				topLoadStart: k.loadStart,
				topMouseDown: k.mouseDown,
				topMouseMove: k.mouseMove,
				topMouseOut: k.mouseOut,
				topMouseOver: k.mouseOver,
				topMouseUp: k.mouseUp,
				topPaste: k.paste,
				topPause: k.pause,
				topPlay: k.play,
				topPlaying: k.playing,
				topProgress: k.progress,
				topRateChange: k.rateChange,
				topReset: k.reset,
				topScroll: k.scroll,
				topSeeked: k.seeked,
				topSeeking: k.seeking,
				topStalled: k.stalled,
				topSubmit: k.submit,
				topSuspend: k.suspend,
				topTimeUpdate: k.timeUpdate,
				topTouchCancel: k.touchCancel,
				topTouchEnd: k.touchEnd,
				topTouchMove: k.touchMove,
				topTouchStart: k.touchStart,
				topTransitionEnd: k.transitionEnd,
				topVolumeChange: k.volumeChange,
				topWaiting: k.waiting,
				topWheel: k.wheel,
			};
		for (var w in S) S[w].dependencies = [w];
		var P = C({ onClick: null }),
			T = {},
			M = {
				eventTypes: k,
				extractEvents: function (e, t, n, r) {
					var o = S[e];
					if (!o) return null;
					var a;
					switch (e) {
						case E.topAbort:
						case E.topCanPlay:
						case E.topCanPlayThrough:
						case E.topDurationChange:
						case E.topEmptied:
						case E.topEncrypted:
						case E.topEnded:
						case E.topError:
						case E.topInput:
						case E.topInvalid:
						case E.topLoad:
						case E.topLoadedData:
						case E.topLoadedMetadata:
						case E.topLoadStart:
						case E.topPause:
						case E.topPlay:
						case E.topPlaying:
						case E.topProgress:
						case E.topRateChange:
						case E.topReset:
						case E.topSeeked:
						case E.topSeeking:
						case E.topStalled:
						case E.topSubmit:
						case E.topSuspend:
						case E.topTimeUpdate:
						case E.topVolumeChange:
						case E.topWaiting:
							a = l;
							break;
						case E.topKeyPress:
							if (0 === b(n)) return null;
						case E.topKeyDown:
						case E.topKeyUp:
							a = p;
							break;
						case E.topBlur:
						case E.topFocus:
							a = c;
							break;
						case E.topClick:
							if (2 === n.button) return null;
						case E.topContextMenu:
						case E.topDoubleClick:
						case E.topMouseDown:
						case E.topMouseMove:
						case E.topMouseOut:
						case E.topMouseOver:
						case E.topMouseUp:
							a = d;
							break;
						case E.topDrag:
						case E.topDragEnd:
						case E.topDragEnter:
						case E.topDragExit:
						case E.topDragLeave:
						case E.topDragOver:
						case E.topDragStart:
						case E.topDrop:
							a = f;
							break;
						case E.topTouchCancel:
						case E.topTouchEnd:
						case E.topTouchMove:
						case E.topTouchStart:
							a = h;
							break;
						case E.topAnimationEnd:
						case E.topAnimationIteration:
						case E.topAnimationStart:
							a = s;
							break;
						case E.topTransitionEnd:
							a = v;
							break;
						case E.topScroll:
							a = m;
							break;
						case E.topWheel:
							a = g;
							break;
						case E.topCopy:
						case E.topCut:
						case E.topPaste:
							a = u;
					}
					a ? void 0 : _(!1);
					var y = a.getPooled(o, t, n, r);
					return i.accumulateTwoPhaseDispatches(y), y;
				},
				didPutListener: function (e, t, n) {
					if (t === P) {
						var r = e._rootNodeID,
							i = a.getNodeFromInstance(e);
						T[r] || (T[r] = o.listen(i, "click", y));
					}
				},
				willDeleteListener: function (e, t) {
					if (t === P) {
						var n = e._rootNodeID;
						T[n].remove(), delete T[n];
					}
				},
			};
		e.exports = M;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(18),
			i = { animationName: null, elapsedTime: null, pseudoElement: null };
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(18),
			i = {
				clipboardData: function (e) {
					return "clipboardData" in e ? e.clipboardData : window.clipboardData;
				},
			};
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(18),
			i = { data: null };
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(38),
			i = { dataTransfer: null };
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(29),
			i = { relatedTarget: null };
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(18),
			i = { data: null };
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(29),
			i = n(53),
			a = n(191),
			s = n(54),
			u = {
				key: a,
				location: null,
				ctrlKey: null,
				shiftKey: null,
				altKey: null,
				metaKey: null,
				repeat: null,
				locale: null,
				getModifierState: s,
				charCode: function (e) {
					return "keypress" === e.type ? i(e) : 0;
				},
				keyCode: function (e) {
					return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
				},
				which: function (e) {
					return "keypress" === e.type ? i(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
				},
			};
		o.augmentClass(r, u), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(29),
			i = n(54),
			a = { touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: i };
		o.augmentClass(r, a), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(18),
			i = { propertyName: null, elapsedTime: null, pseudoElement: null };
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n, r) {
			return o.call(this, e, t, n, r);
		}
		var o = n(38),
			i = {
				deltaX: function (e) {
					return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
				},
				deltaY: function (e) {
					return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
				},
				deltaZ: null,
				deltaMode: null,
			};
		o.augmentClass(r, i), (e.exports = r);
	},
	function (e, t) {
		"use strict";
		function n(e) {
			for (var t = 1, n = 0, o = 0, i = e.length, a = i & -4; o < a; ) {
				for (var s = Math.min(o + 4096, a); o < s; o += 4) n += (t += e.charCodeAt(o)) + (t += e.charCodeAt(o + 1)) + (t += e.charCodeAt(o + 2)) + (t += e.charCodeAt(o + 3));
				(t %= r), (n %= r);
			}
			for (; o < i; o++) n += t += e.charCodeAt(o);
			return (t %= r), (n %= r), t | (n << 16);
		}
		var r = 65521;
		e.exports = n;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n) {
			if (null == t || "boolean" == typeof t || "" === t) return "";
			if (isNaN(t) || 0 === t || (i.hasOwnProperty(e) && i[e])) return "" + t;
			if ("string" == typeof t) {
				t = t.trim();
			}
			return t + "px";
		}
		var o = n(74),
			i = (n(2), o.isUnitlessNumber);
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			if (null == e) return null;
			if (1 === e.nodeType) return e;
			var t = i.get(e);
			return t ? ((t = a(t)), t ? o.getNodeFromInstance(t) : null) : void s(("function" == typeof e.render, !1));
		}
		var o = (n(22), n(7)),
			i = n(50),
			a = n(98),
			s = n(1);
		n(2);
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t, n) {
			var r = e,
				o = void 0 === r[n];
			o && null != t && (r[n] = t);
		}
		function o(e) {
			if (null == e) return e;
			var t = {};
			return i(e, r, t), t;
		}
		var i = (n(46), n(60));
		n(2);
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			if (e.key) {
				var t = i[e.key] || e.key;
				if ("Unidentified" !== t) return t;
			}
			if ("keypress" === e.type) {
				var n = o(e);
				return 13 === n ? "Enter" : String.fromCharCode(n);
			}
			return "keydown" === e.type || "keyup" === e.type ? a[e.keyCode] || "Unidentified" : "";
		}
		var o = n(53),
			i = {
				Esc: "Escape",
				Spacebar: " ",
				Left: "ArrowLeft",
				Up: "ArrowUp",
				Right: "ArrowRight",
				Down: "ArrowDown",
				Del: "Delete",
				Win: "OS",
				Menu: "ContextMenu",
				Apps: "ContextMenu",
				Scroll: "ScrollLock",
				MozPrintableKey: "Unidentified",
			},
			a = {
				8: "Backspace",
				9: "Tab",
				12: "Clear",
				13: "Enter",
				16: "Shift",
				17: "Control",
				18: "Alt",
				19: "Pause",
				20: "CapsLock",
				27: "Escape",
				32: " ",
				33: "PageUp",
				34: "PageDown",
				35: "End",
				36: "Home",
				37: "ArrowLeft",
				38: "ArrowUp",
				39: "ArrowRight",
				40: "ArrowDown",
				45: "Insert",
				46: "Delete",
				112: "F1",
				113: "F2",
				114: "F3",
				115: "F4",
				116: "F5",
				117: "F6",
				118: "F7",
				119: "F8",
				120: "F9",
				121: "F10",
				122: "F11",
				123: "F12",
				144: "NumLock",
				145: "ScrollLock",
				224: "Meta",
			};
		e.exports = r;
	},
	function (e, t) {
		"use strict";
		function n(e) {
			for (; e && e.firstChild; ) e = e.firstChild;
			return e;
		}
		function r(e) {
			for (; e; ) {
				if (e.nextSibling) return e.nextSibling;
				e = e.parentNode;
			}
		}
		function o(e, t) {
			for (var o = n(e), i = 0, a = 0; o; ) {
				if (3 === o.nodeType) {
					if (((a = i + o.textContent.length), i <= t && a >= t)) return { node: o, offset: t - i };
					i = a;
				}
				o = n(r(o));
			}
		}
		e.exports = o;
	},
	function (e, t, n) {
		"use strict";
		function r(e, t) {
			var n = {};
			return (
				(n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), (n["ms" + e] = "MS" + t), (n["O" + e] = "o" + t.toLowerCase()), n
			);
		}
		function o(e) {
			if (s[e]) return s[e];
			if (!a[e]) return e;
			var t = a[e];
			for (var n in t) if (t.hasOwnProperty(n) && n in u) return (s[e] = t[n]);
			return "";
		}
		var i = n(8),
			a = {
				animationend: r("Animation", "AnimationEnd"),
				animationiteration: r("Animation", "AnimationIteration"),
				animationstart: r("Animation", "AnimationStart"),
				transitionend: r("Transition", "TransitionEnd"),
			},
			s = {},
			u = {};
		i.canUseDOM &&
			((u = document.createElement("div").style),
			"AnimationEvent" in window || (delete a.animationend.animation, delete a.animationiteration.animation, delete a.animationstart.animation),
			"TransitionEvent" in window || delete a.transitionend.transition),
			(e.exports = o);
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return o.isValidElement(e) ? void 0 : i(!1), e;
		}
		var o = n(12),
			i = n(1);
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return '"' + o(e) + '"';
		}
		var o = n(40);
		e.exports = r;
	},
	function (e, t, n) {
		"use strict";
		var r = n(87);
		e.exports = r.renderSubtreeIntoContainer;
	},
	function (e, t, n) {
		"use strict";
		function r(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var s = (function () {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						(r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
					}
				}
				return function (t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t;
				};
			})(),
			u = n(14),
			l = r(u),
			c = (function (e) {
				function t(e, n, r) {
					o(this, t);
					var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return (
						(a.EVENT_PREFIX = "simslot-"),
						(a.EVENTS = ["cardstatechange", "iccinfochange", "stkcommand", "stksessionend"]),
						(a.METHODS = ["sendStkResponse", "sendStkMenuSelection", "sendStkTimerExpiration", "sendStkEventDownload"]),
						(a.DOM_REQUEST_METHODS = [
							"getCardLock",
							"unlockCardLock",
							"setCardLock",
							"getCardLockRetryCount",
							"readContacts",
							"updateContact",
							"iccOpenChannel",
							"iccExchangeAPDU",
							"iccCloseChannel",
						]),
						(a.ABSENT_TYPES = ["permanentBlocked"]),
						(a.LOCK_TYPES = [
							"pinRequired",
							"pukRequired",
							"networkLocked",
							"corporateLocked",
							"serviceProviderLocked",
							"network1Locked",
							"network2Locked",
							"hrpdNetworkLocked",
							"ruimCorporateLocked",
							"ruimServiceProviderLocked",
						]),
						(a.index = n),
						(a.conn = e),
						r && a.update(r),
						a.publish("created"),
						a
					);
				}
				return (
					a(t, e),
					s(t, [
						{
							key: "update",
							value: function (e) {
								(this.simCard = e),
									this.EVENTS.forEach(function (t) {
										e.addEventListener(t, this);
									}, this),
									this.DOM_REQUEST_METHODS.forEach(function (t) {
										this[t] = function () {
											return e[t].apply(e, arguments);
										};
									}, this),
									this.METHODS.forEach(function (t) {
										this[t] = function () {
											return e[t].apply(e, arguments);
										};
									}, this),
									this.publish("updated");
							},
						},
						{
							key: "handleEvent",
							value: function (e) {
								switch (e.type) {
									default:
										this.publish(e.type), this.simCard && this.debug(this.simCard.cardState);
								}
							},
						},
						{
							key: "isAbsent",
							value: function () {
								return !this.simCard || this.ABSENT_TYPES.indexOf(this.simCard.cardState) >= 0 || (this.simCard && this.simCard.iccInfo && null === this.simCard.iccInfo.iccid);
							},
						},
						{
							key: "getSmsc",
							value: function (e) {
								var t = window.navigator.mozMobileMessage;
								if (t) {
									var n = t.getSmscAddress(this.index);
									(n.onsuccess = function () {
										e(this.result.split(",")[0].replace(/"/g, ""));
									}),
										(n.onerror = function () {
											e(null);
										});
								} else e(null);
							},
						},
						{
							key: "isUnknownState",
							value: function () {
								var e = "" === this.simCard.cardState,
									t = "unknown" === this.simCard.cardState;
								return !this.simCard.cardState || t || e;
							},
						},
						{
							key: "isLocked",
							value: function () {
								return this.LOCK_TYPES.indexOf(this.simCard.cardState) >= 0;
							},
						},
						{
							key: "getCardState",
							value: function () {
								return this.simCard.cardState;
							},
						},
					]),
					t
				);
			})(l.default);
		t.default = c;
	},
	,
	,
	,
	,
	function (e, t) {
		"use strict";
		function n(e) {
			return o(e, "begin");
		}
		function r(e) {
			return o(e, "end");
		}
		function o(e, t) {
			if (!e || !e.photo || !e.photo.length) return null;
			if (1 === e.photo.length) return e.photo[0];
			var n = e.photo,
				r = e.category;
			return Array.isArray(r) && r.indexOf("fb_linked") !== -1 ? (n.length >= 4 ? n["begin" === t ? 1 : 0] : n[0]) : ((n = i(e)), n["begin" === t ? 0 : n.length - 1]);
		}
		function i(e) {
			var t = e.photo.slice(0);
			return (
				t.sort(function (e, t) {
					return a(e) < a(t) ? -1 : a(e) > a(t) ? 1 : 0;
				}),
				t
			);
		}
		function a(e) {
			return "string" == typeof e ? e.length : e.size;
		}
		function s(e, t) {
			if (e && e.photo && e.photo.length) {
				return c(n(e));
			}
			return l(e, t);
		}
		function u() {
			return "";
		}
		function l(e, t) {
			var n = document.createElement("span");
			n.classList.add("defaultPicture"), n.classList.add("contactHeaderImage"), n.setAttribute("style", "");
			var r = ["top", "center", "bottom"],
				o = ["left", "center", "right"],
				i = o[Math.floor(Math.random() * o.length)],
				a = r[Math.floor(Math.random() * r.length)],
				s = i + " " + a;
			return (n.dataset.group = u(e, t)), (n.style.backgroundPosition = s), n;
		}
		function c(e) {
			var t = document.createElement("span");
			t.classList.add("contactHeaderImage");
			try {
				return (t.dataset.src = window.URL.createObjectURL(e)), t.setAttribute("style", "background-image:url(" + t.dataset.src + ")"), t;
			} catch (n) {}
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var p = { getThumbnail: n, getFullResolution: r, getPhotoHeader: s };
		t.default = p;
	},
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	111,
	,
	,
	111,
	111,
	111,
	,
	,
	,
	,
	,
	,
	111,
	,
	,
	,
	,
	function (e, t, n) {
		e.exports = n.p + "react-sim-chooser.en-US.properties";
	},
	function (e, t, n) {
		e.exports = n.p + "react-sim-chooser.es-US.properties";
	},
	function (e, t, n) {
		e.exports = n.p + "react-sim-chooser.fr-CA.properties";
	},
];

const i = (id) => document.getElementById(id);

const codeblockBundle = i("bundle").firstElementChild;
const copyButton1 = i("copy1");
const logButton1 = i("console1");

const codeblockVendor = i("vendor").firstElementChild;
const copyButton2 = i("copy2");
const logButton2 = i("console2");

const idInput = i("id");

idInput.oninput = () => {
	const id = idInput.value;
	const bundle = bundleJS[id];
	const vendor = vendorJS[id];

	generateCode(bundle, codeblockBundle, copyButton1, logButton1);
	generateCode(vendor, codeblockVendor, copyButton2, logButton2);
};

function generateCode(code, el, copy, log) {
	if (code && code.toString) {
		el.innerText = code.toString();
	} else {
		el.innerText = "";
	}

	copy.onclick = () => navigator.clipboard.writeText(code ?? code.toString());
	log.onclick = () => console.log(code);
}
