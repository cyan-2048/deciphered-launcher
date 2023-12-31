import React from "react";
import ComponentBase from "./ComponentBase";
import animateComponent from "./animate-component";
import softkeyStore from "./softkeyStore";
import Service from "./Service";
import instantSettingsStore from "./instantSettingsStore";
import * as n13 from "./m13";

function u(e) {
	var t = [O, e.isActive ? "is-active" : null, e.isShortcut ? "is-shortcut" : null].filter(Boolean).join(" ");
	return React.createElement(
		"div",
		{ key: e.name, className: "instantSettings__tile" },
		React.createElement(
			"button",
			{ className: t, "aria-label": e.name, "data-icon": e.icon, "data-inactived-icon": e.iconInactived },
			React.createElement(
				"div",
				{ className: "instantSettings__info" },
				React.createElement("div", { className: "instantSettings__title", "data-l10n-id": e.title }),
				React.createElement("div", { className: "instantSettings__subtitle" }, n13.toL10n(e.subtitle, e.subtitleArgs))
			)
		)
	);
}

var O = "instantSettings__icon";

class _InstantSettings extends ComponentBase {
	static defaultProps = { col: 3, row: 3 };
	static propTypes = { col: React.PropTypes.number, row: React.PropTypes.number };

	constructor(props) {
		super(props);

		const __self = this;

		__self.name = "InstantSettings";
		__self.initIndex = 0;
		__self.state = { settings: instantSettingsStore.settings, focusIndex: __self.initIndex };
		__self.onKeyDown = __self.onKeyDown.bind(__self);
		__self.onFocus = __self.onFocus.bind(__self);
		__self.setRef = __self.setRef.bind(__self);
	}

	componentDidMount() {
		(this.icons = this.element.getElementsByClassName(O)), this.updateSettings(), instantSettingsStore.on("change", this.updateSettings.bind(this));
	}
	componentDidUpdate() {
		this.focusIfPossible(), this.updateSoftKey();
	}
	updateSoftKey() {
		var e = this.state.focusIndex,
			t = this.state.settings[e];
		softkeyStore.register({ left: "", center: t.isDisabled ? "" : "select", right: "" }, this.element);
	}
	updateSettings() {
		this.setState(function (e) {
			return (
				(e.settings = instantSettingsStore.settings.filter(function (e) {
					return !e.removed;
				})),
				e
			);
		});
	}
	onKeyDown(e) {
		e.preventDefault(), e.stopPropagation();
		var t = e.key,
			n = this.state.focusIndex;
		if (instantSettingsStore.volumeManagerTimer) return void instantSettingsStore.click("volume", t);
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
	}
	onFocus(e) {
		e.target === this.element &&
			((this.state.focusIndex = this.initIndex), this.focusIfPossible(), instantSettingsStore.addSimCardObserver(), window.addEventListener("visibilitychange", this));
	}
	_handle_visibilitychange() {
		this.exit();
	}
	onCSK() {
		var e = this.state.settings[this.state.focusIndex];
		if (!e.isDisabled) {
			"launch" === instantSettingsStore.click(e.name) && this.exit();
		}
	}
	handleNavGrid(e, t) {
		var n = this.state.col,
			i = n13.navGrid({ currentRowCol: n13.indexToRowCol(e, n), dir: t, col: n, total: this.state.settings.length }),
			a = n13.rowColToIndex(i, n);
		a !== e && this.setState({ focusIndex: a });
	}
	navGrid() {
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
			d = n13.isRtl(),
			p = d ? -1 : 1;
		switch (i) {
			case "ArrowRight":
				c = n13.clamp(c + p, 0, s);
				break;
			case "ArrowLeft":
				c = n13.clamp(c - p, 0, s);
				break;
			case "ArrowUp":
				f = n13.clamp(f - 1, 0, u);
				break;
			case "ArrowDown":
				f += 1;
		}
		var h = f * o + c;
		return "ArrowDown" === i && h >= r ? -1 : n13.clamp(h, 0, r - 1);
	}
	exit() {
		instantSettingsStore.removeSimCardObserver(), Service.request("closeSheet", "instantSettings"), window.removeEventListener("visibilitychange", this);
	}
	isHidden() {
		return !this.element.offsetParent;
	}
	focusIfPossible() {
		if (this.element && !this.isHidden()) {
			var e = this.element;
			this.icons && (e = this.icons[this.state.focusIndex] || this.icons[this.initIndex]), e.focus();
		}
	}
	setRef(e) {
		this.element = e;
	}
	render() {
		return React.createElement(
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
			React.createElement("div", { className: "readout-only", id: "instantSettings-title", "data-l10n-id": "instant-settings" }),
			React.createElement(
				"main",
				{ className: "instantSettings__wall" },
				this.state &&
					this.state.settings &&
					this.state.settings.map(function (e) {
						return u(e);
					})
			)
		);
	}
}

const InstantSettings = animateComponent(_InstantSettings, "immediate", "immediate");

export default InstantSettings;
