import React from "react";
import n6_RC from "./m6";
import n5 from "./m5";
import n19 from "./m19";

function a(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	}
	return Array.from(e);
}

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
})();

class n201_Clock_RC extends n6_RC {
	constructor(props) {
		super(props);

		const __self = this;

		__self.name = "Clock";
		__self.initState = {
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
		};
		__self.state = Object.assign({}, __self.initState);
		navigator.mozL10n.ready(function () {
			null === navigator.mozHour12 && (navigator.mozHour12 = "true" === localStorage.getItem("locale.hour12")), __self.refresh();
		});
		__self.digiKey = 0;
		__self.digiIcons = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "bold",
				t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
			return (
				(__self.digiKey += 1),
				[].concat(a(Array(t))).map(function (t, i) {
					return React.createElement("i", { key: "key_" + i + "_" + e + "_" + __self.digiKey, "data-icon": "numeric_" + i + "_" + e, "aria-hidden": "true" });
				})
			);
		};
		__self.iconsHtml = { bold: __self.digiIcons("rounded_semibold"), light: __self.digiIcons("light") };
	}

	focus() {}

	componentWillMount() {
		n19.addObserver("home.clock.visible", this), n19.addObserver("locale.hour12", this);
	}
	componentDidMount() {
		n5.register("start", this), n5.register("stop", this), n5.register("forcedRefresh", this), window.addEventListener("moztimechange", this);
	}
	_handle_moztimechange() {
		this.stop(), this.start();
	}
	_handle_timeformatchange() {
		this.refresh();
	}
	_handle_visibilitychange() {
		"visible" === document.visibilityState ? this.start() : this.stop();
	}
	start() {
		var e = this,
			t = new Date();
		this.refresh(),
			(this.timer = setTimeout(function () {
				e.start();
			}, 1e3 * (60 - t.getSeconds())));
	}
	refresh(e) {
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
	}
	forcedRefresh() {
		this.refresh(!0);
	}
	"_observe_locale.hour12"(e) {
		localStorage.setItem("locale.hour12", e);
	}
	"_observe_home.clock.visible"(e) {
		localStorage.setItem("home.clock.visible", e),
			this.setState({ visible: e }),
			this.stop(),
			e
				? (this.start(), window.addEventListener("moztimechange", this), window.addEventListener("timeformatchange", this), window.addEventListener("visibilitychange", this))
				: (window.removeEventListener("moztimechange", this), window.removeEventListener("timeformatchange", this), window.removeEventListener("visibilitychange", this));
	}
	stop() {
		clearInterval(this.timer), (this.timer = null);
	}
	render() {
		return this.state.visible
			? React.createElement(
					"time",
					{ className: "ClockComponent", dateTime: this.state.datetime, role: "menuitem", "aria-label": this.state.timeForReadout },
					React.createElement(
						"div",
						{ className: "clock-upper" },
						React.createElement(
							"bdi",
							{ className: "clockDigi-container" },
							React.createElement(
								"span",
								{ className: "hour clockDigi-box" },
								React.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.h1 }, this.iconsHtml.bold),
								React.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.h2 }, this.iconsHtml.bold)
							),
							React.createElement("div", { className: "clock-colon" }),
							React.createElement(
								"span",
								{ className: "minute clockDigi-box" },
								React.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.m1 }, this.iconsHtml.bold),
								React.createElement("span", { className: "clockDigi clockDigi--time", "data-now": this.state.m2 }, this.iconsHtml.bold)
							)
						),
						React.createElement("div", { className: "clock-ampm primary", "data-hour-24": !navigator.mozHour12 }, this.state.ampm)
					),
					React.createElement("hr", { className: "clock-divider" }),
					React.createElement("div", { className: "date primary" }, this.state.date)
			  )
			: null;
	}
}

export default n201_Clock_RC;
