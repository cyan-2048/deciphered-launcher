import React from "react";
import ComponentBase from "./ComponentBase";
import appStore from "./appStore";
import softkeyStore from "./softkeyStore";
import Service from "./Service";
import n63_SpeedDialHelper from "./m63";
import * as n13 from "./m13";
import n42_LaunchStore from "./m42";
import SettingsCore from "./SettingsCore";
import n26 from "./m26";
import * as n216 from "./m216";
import * as n206 from "./m206";

function o(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	}
	return Array.from(e);
}
function l(e) {
	return React.createElement(
		"div",
		{ className: "app-tile", style: Object.assign({}, e.renderProps.orderStyle) },
		React.createElement(
			"div",
			{ tabIndex: "-1", role: "menuitem", className: "app", key: e.uid, onClick: e.launch },
			React.createElement(
				"div",
				{ className: "app__icon", style: e.renderProps.iconStyle },
				React.createElement("div", { className: "app__icon--hq", style: { backgroundImage: "url('" + e.icon_url_hq + "')" } }),
				e.favicon_url && React.createElement("div", { className: "app__icon--favicon", style: { backgroundImage: "url('" + e.favicon_url + "')" } })
			),
			React.createElement("div", { className: "app__name" }, n216.unescapeNumericHTMLEntities(e.displayName))
		)
	);
}

var N = ["Siberian Strike", "Danger Dash", "Castle Of Magic", "Nitro Street Run 2"],
	D = ["Assistant", "Maps", "Google Search", "YouTube", "Twitter"];

class AppList extends ComponentBase {
	static defaultProps = { viewMode: "grid", col: 3, row: 3 };
	static propTypes = { viewMode: React.PropTypes.string, col: React.PropTypes.number, row: React.PropTypes.number };

	constructor(props) {
		super(props);

		const __self = this;

		__self.name = "AppList";
		__self.navItemThrottleTime = 60;
		__self.ready = false;
		__self.menuOptions = [
			{
				id: "rename",
				callback: function () {
					__self.element.focus(), __self.focusIfPossible(), appStore.renameBookmark(__self.state.apps[__self.focusIndex]);
				},
			},
			{ id: "move", tags: ["grid", "list"], callback: __self.enterReorderMode.bind(__self) },
			{
				id: "unpin",
				callback: function () {
					__self.element.focus(), __self.focusIfPossible(), appStore.unpinBookmark(__self.state.apps[__self.focusIndex]);
				},
			},
			{ id: "grid-view", tags: ["list", "single"], callback: __self.switchViewMode.bind(__self, "grid") },
			{ id: "list-view", tags: ["grid", "single"], callback: __self.switchViewMode.bind(__self, "list") },
			{ id: "single-view", tags: ["grid", "list"], callback: __self.switchViewMode.bind(__self, "single") },
			{
				id: "uninstall",
				callback: function () {
					__self.element.focus(), __self.focusIfPossible(), appStore.uninstallMozApp(__self.state.apps[__self.focusIndex].mozApp);
				},
			},
		];
		__self.initFocus = [0, 0];
		__self.state = { col: __self.props.col, apps: [], viewMode: __self.props.viewMode, focus: __self.initFocus };
		__self.gridsPerPage = __self.props.col * __self.props.row;
		__self.onKeyDown = __self.onKeyDown.bind(__self);
		__self.onFocus = __self.onFocus.bind(__self);
		__self.updateApps = __self.updateApps.bind(__self);
		__self.currentPage = 0;
		__self.getLauncherApps();
		SettingsCore.addObserver("custom.launcher.apps", __self);
		window.addEventListener("visibilitychange", function () {
			var e = document.activeElement;
			document.hidden && __self.appElements && [].concat(o(__self.appElements)).includes(e) && ((__self.isStickyApp = true), e && e.classList.add("is-focus-app"));
		});
		n13.asyncLocalStorage.getItem("app-view-mode").then(function (e) {
			e && __self.switchViewMode(e);
		});
	}

	getLauncherApps() {
		var e = this;
		SettingsCore.get("custom.launcher.apps").then(function (t) {
			(e.custom_apps = t), e.updateApps();
		});
	}
	"_observe_custom.launcher.apps"(e) {
		(this.custom_apps = e), this.updateApps();
	}
	customAppHandler(e) {
		for (var t = [], n = [], i = appStore.getDataMcc(), a = appStore.getSimmcc(), o = 0; o < e.length; o++)
			if ("TIMGate" != e[o].manifest.name)
				D.includes(e[o].manifest.name) ? (a ? "460" !== a && t.push(e[o]) : "460" !== i && t.push(e[o])) : N.includes(e[o].manifest.name) ? n.push(e[o]) : t.push(e[o]);
			else {
				var r = appStore.getDataMccmnc(),
					s = appStore.getSimmccmnc();
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
	}
	componentDidMount() {
		var e = this;
		appStore.on("change", this.updateApps),
			Service.register("show", this),
			Service.register("hide", this),
			Service.registerState("ready", this),
			n63_SpeedDialHelper.register(this.element),
			this.element.addEventListener("animationstart", function () {
				e.isAnimationEnd = false;
			}),
			this.element.addEventListener("animationend", function () {
				e.isAnimationEnd = true;
			});
	}
	componentDidUpdate(e, t) {
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
					n206.eventLogger.log({
						type: n206.EVENT_TYPES.APP_POSITION,
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
				n206.eventLogger.log({
					type: n206.EVENT_TYPES.APP_POSITION,
					starting_position: n.indexOf(e),
					end_position: -1,
					app_id: e.manifestURL,
					app_version: e.manifest.version,
				});
			});
		}
	}
	scrollIntoViewIfPossible() {
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
	}
	scrollIntoViewForListView() {
		if (!this.wrapperBondary) {
			var e = this.appElements && this.appElements[0].offsetParent;
			if (!e) return;
			var t = e.getBoundingClientRect();
			this.wrapperBondary = { top: t.top, bottom: window.innerHeight - t.bottom };
		}
		var n = document.activeElement,
			i = n.getBoundingClientRect();
		i.top < this.wrapperBondary.top ? n.scrollIntoView(true) : i.bottom > window.innerHeight - this.wrapperBondary.bottom && n.scrollIntoView(false);
	}
	getPage(e) {
		return Math.floor(e / this.props.row);
	}
	goPage() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.currentPage;
		!this.appElements ||
			this.state.pageLength < 2 ||
			(this.currentPage !== e &&
				(void 0 === this.pageOffsetY && (this.pageOffsetY = this.appElements[this.gridsPerPage].offsetTop - this.appElements[0].offsetTop),
				(this._container.scrollTop = this.pageOffsetY * e),
				(this.currentPage = e)));
	}
	updateApps() {
		var e = this,
			t = this.element.contains(document.activeElement),
			n = this.appHandler(appStore.apps);
		(n = this.customAppHandler(n)),
			this.setState(
				function (t) {
					return (t.apps = n), (t.pageLength = Math.ceil(t.apps.length / e.gridsPerPage)), t;
				},
				function () {
					t && (e.focus(), e.focusIfPossible());
				}
			);
	}
	updateSoftKeys() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { center: "select", right: "options" };
		this.state.reorderMode && (e = { center: "set", right: "", left: "cancel" }), softkeyStore.register(e, this.element);
	}
	onFocus() {
		return (
			this.isStickyApp && ((this.isStickyApp = false), document.querySelector(".is-focus-app").classList.remove("is-focus-app")),
			this.element === document.activeElement
				? (this.focusIfPossible(), this.scrollIntoViewIfPossible(), void this.updateSoftKeys())
				: (this.element.contains(document.activeElement) || this.element.focus(), void this.updateSoftKeys())
		);
	}
	focusIfPossible() {
		if (this.element.contains(document.activeElement)) {
			var e = this.getFocusGridElement();
			return e ? void e.focus() : void this.setState({ focus: this.initFocus });
		}
	}
	getFocusGridElement() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n13.rowColToIndex(this.state.focus, this.state.col),
			t = this.state.apps.length - 1;
		return (
			e > t && ((e = t), (this.state.focus = n13.indexToRowCol(e, this.state.col))),
			(this.focusIndex = e),
			this.appElements || (this.appElements = this.element.getElementsByClassName("app")),
			this.appElements[e]
		);
	}
	enterReorderMode() {
		this.setState({ reorderMode: true }),
			(this.reorder = {
				target: this.element.querySelectorAll(".app-tile")[this.focusIndex],
				focus: this.state.focus,
				app: this.state.apps[this.focusIndex],
				indexFrom: this.focusIndex,
				indexTo: this.focusIndex,
			});
	}
	exitReorderMode(e) {
		var t = this;
		this.setState(
			function (n) {
				if (((n.reorderMode = false), e)) n.focus = [].concat(o(t.reorder.focus));
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
	}
	saveOrderAndExit() {
		appStore.setAppsOrder(
			[]
				.concat(o(this.state.apps))
				.sort(function (e, t) {
					return e.renderProps.orderStyle.order - t.renderProps.orderStyle.order;
				})
				.map(function (e) {
					return e.manifest.name;
				})
		),
			n206.eventLogger.log({
				type: n206.EVENT_TYPES.APP_POSITION,
				starting_position: this.reorder.indexFrom,
				end_position: this.reorder.indexTo,
				app_id: this.reorder.app.manifestURL,
				app_version: this.reorder.app.manifest.version,
			}),
			this.exitReorderMode(true);
	}
	handleMoveGrid(e) {
		var t = this,
			n = n13.rowColToIndex(e, this.state.col),
			i = this.focusIndex > n ? -1 : 1;
		(this.reorder.focus = e),
			(this.reorder.indexTo = n),
			this.setState(function (e) {
				return (e.apps[t.focusIndex].renderProps.orderStyle.order = t.calcOrder(n, i)), e;
			});
	}
	switchViewMode() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "grid",
			t = "grid" === e ? this.props.col : 1,
			n = n13.rowColToIndex(this.state.focus, this.state.col);
		(this.currentPage = null), this.setState({ focus: n13.indexToRowCol(n, t), col: t, viewMode: e }), n13.asyncLocalStorage.setItem("app-view-mode", e);
	}
	navItem(e) {
		var t = this;
		this.navItemTimer ||
			((this.navItemTimer = setTimeout(function () {
				window.clearTimeout(t.navItemTimer), (t.navItemTimer = null);
			}, this.navItemThrottleTime)),
			this.state.reorderMode ? this.handleMoveGrid(e) : this.setState({ focus: e }));
	}
	onKeyDown(e) {
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
				(i = n13.navGrid({ currentRowCol: o, dir: a, col: this.state.col, total: this.state.apps.length })), this.navItem(i);
				break;
			case "Call":
				n42_LaunchStore.launch("manifestURL", "app://communications.gaiamobile.org/manifest.webapp");
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
					Service.request("showOptionMenu", { options: s });
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
				n ? this.exitReorderMode() : (this.setState({ focus: this.initFocus }), Service.request("closeSheet", "appList"));
		}
		i && (e.stopPropagation(), e.preventDefault());
	}
	appHandler(e) {
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
	}
	renderPagination() {
		var e = void 0,
			t = this.getPage(this.state.reorderMode ? this.reorder.focus[0] : this.state.focus[0]);
		if (this.state.pageLength > 1) {
			var n = Array(this.state.pageLength)
				.fill()
				.map(function (e, n) {
					var i = n === t ? "page-indicator active" : "page-indicator";
					return React.createElement("div", { key: "page-indicator--" + n, className: i });
				});
			e = React.createElement("div", { className: "pagination" }, n);
		}
		return e;
	}
	calcOrder(e) {
		return 1e3 * (e + 1 + 0.5 * (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0));
	}
	render() {
		var e = this,
			t = "grid" === this.state.viewMode ? this.renderPagination() : null,
			n = this.state.apps.map(function (e) {
				return React.createElement(l, Object.assign({ key: e.manifestURL }, e));
			}),
			i = ["appList", this.state.reorderMode ? "is-reordering" : ""].filter(Boolean).join(" ");
		return React.createElement(
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
			React.createElement("h1", { className: "readout-only", id: "all-apps", "data-l10n-id": "all-apps" }),
			React.createElement(
				"div",
				{
					className: "appList__container",
					role: "heading",
					"aria-labelledby": "all-apps",
					ref: function (t) {
						return (e._container = t);
					},
				},
				React.createElement("div", { className: "app-wall" }, n)
			)
		);
	}
}

const n200_AppList_RC = n26(AppList, "immediate", "immediate");
export default n200_AppList_RC;
