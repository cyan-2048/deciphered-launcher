import React from "react";
import n6_RC from "./m6";
import n5_Service from "./m5";
import n16_SoftKeyStore from "./m16";
import n62 from "./m62";
import n65_SimCardHelper from "./m65";

class n205_DialerSuggestions_RC extends n6_RC {
	static defaultProps = { dial: null, exitSuggestions: null, suggestions: null };
	static propTypes = { dial: React.PropTypes.func, exitSuggestions: React.PropTypes.func, suggestions: React.PropTypes.arrayOf(React.PropTypes.object) };

	constructor(props) {
		super(props);

		const __self = this;
		__self.name = "DialerSuggestions";
		__self.onKeyDown = __self.onKeyDown.bind(__self);
	}

	componentDidMount() {
		(this.suggestionNavigator = new n62(".dialer-focusable", this.element)), this.updateSoftKeys(), this.getVTSupportability();
	}
	componentDidUpdate() {
		this.updateSoftKeys();
	}
	updateSoftKeys() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { left: "", center: "call", right: this.isVTSupported ? "options" : "" };
		if (navigator.mozMobileConnections && navigator.mozMobileConnections.length > 1 && !n65_SimCardHelper.isAlwaysAsk()) {
			e.center = { text: "call", icon: "" };
			var t = SIMSlotManager.isMultiSIM() && !SIMSlotManager.hasOnlyOneSIMCardDetected(),
				n = void 0 !== n65_SimCardHelper.cardIndex;
			t && n && (e.center.icon = "sim-" + (n65_SimCardHelper.cardIndex + 1));
		}
		n16_SoftKeyStore.register(e, this.element);
	}
	getVTSupportability() {
		var e = this;
		navigator.hasFeature &&
			navigator.hasFeature("device.capability.vilte").then(function (t) {
				e.isVTSupported = t;
			});
	}
	handleOption() {
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
			n5_Service.request("showOptionMenu", {
				options: n,
				onCancel: function () {
					return e.element.focus();
				},
			});
		}
	}
	onKeyDown(e) {
		if (!n5_Service.query("Dialer.isCalling"))
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
	}
	getFocusedSuggestion() {
		var e = this.suggestionNavigator,
			t = e._candidates.indexOf(e._currentFocus);
		return this.props.suggestions[t];
	}
	initFocus() {
		var e = this;
		setTimeout(function () {
			var t = e.element.querySelector(".dialer-focusable");
			t.focus(), e.suggestionNavigator.setFocus(t);
		}, 0);
	}
	formatMatchedNum(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.props.suggestions.keyword,
			n = e.indexOf(t);
		if (-1 !== n) {
			var i = e.slice(0, n),
				a = e.slice(n + t.length);
			return React.createElement("span", {
				dir: "ltr",
				className: "dialerSuggestion__telNum",
				dangerouslySetInnerHTML: { __html: i + "<mark>" + t + "</mark>" + a },
			});
		}
	}
	suggestionsHtml() {
		var t = this;
		return this.props.suggestions.map(function (e, n) {
			return React.createElement(
				"li",
				{ key: "suggestions-" + n, className: "dialer-focusable", tabIndex: "-1" },
				React.createElement(
					"div",
					{ className: "dialerSuggestion" },
					React.createElement("div", { className: "dialerSuggestion__header text-pri" }, e.name),
					React.createElement("div", { className: "dialerSuggestion__detail text-sec" }, e.type, " ", t.formatMatchedNum(e.number))
				)
			);
		});
	}
	render() {
		var e = this;
		return React.createElement(
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
	}
}

export default n205_DialerSuggestions_RC;
