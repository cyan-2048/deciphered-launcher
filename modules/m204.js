import React from "react";
import ComponentBase from "./ComponentBase";
import Service from "./Service";
import softkeyStore from "./softkeyStore";
import SettingsCore from "./SettingsCore";
import * as n13 from "./m13";
import n110 from "./m110";
import n65_SimCardHelper from "./m65";
import launchStore from "./launchStore";
import n128_fontFit from "./m128";

class n204_DialerInput_RC extends ComponentBase {
	static defaultProps = { dial: null, exitDialer: null, updateTelNum: null };
	static propTypes = { dial: React.PropTypes.func, exitDialer: React.PropTypes.func, updateTelNum: React.PropTypes.func };

	constructor(props) {
		super(props);

		const __self = this;

		__self.name = "DialerInput";
		__self.SPECIAL_CHARS = ["*", "+", ","];
		__self.telNum = "";
		__self.fontStyles = "";
		__self.isVTSupported = false;
		LazyLoader.load(["shared/js/dialer/tone_player.js"], function () {
			TonePlayer.init("normal");
			TonePlayer.gTonesFrequencies = {
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
			};
		});
		__self.specialCharsCount = __self.SPECIAL_CHARS.length;
		__self.onKeyPress = __self.onKeyPress.bind(__self);
		__self.onKeyDown = __self.onKeyDown.bind(__self);
		__self.onKeyUp = __self.onKeyUp.bind(__self);
		__self.onInput = __self.onInput.bind(__self);
	}

	componentDidMount() {
		this.element.setAttribute("x-inputmode", "native");
		SettingsCore.addObserver("phone.ring.keypad", this);
		this.updateSoftKeys();
		this.getFontStyles();
		this.getVTSupportability();
	}
	componentDidUpdate() {
		this.updateSoftKeys();
	}
	updateSoftKeys() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { left: "contacts", center: "call", right: "options" };
		if (navigator.mozMobileConnections && navigator.mozMobileConnections.length > 1 && !n65_SimCardHelper.isAlwaysAsk()) {
			e.center = { text: "call", icon: "" };
			var t = SIMSlotManager.isMultiSIM() && !SIMSlotManager.hasOnlyOneSIMCardDetected(),
				n = void 0 !== n65_SimCardHelper.cardIndex;
			t && n && (e.center.icon = "sim-" + (n65_SimCardHelper.cardIndex + 1));
		}
		softkeyStore.register(e, this.element);
	}
	onInput() {
		var e = this.element.value;
		this.props.updateTelNum(e), (this.telNum = e), this.updateFontSize(e), "" === e && this.exitDialer();
	}
	onKeyPress(e) {
		e.preventDefault();
	}
	onKeyUp(e) {
		var t = n110.translate(e.key);
		"Backspace" === t && this.clearLongpressDeleteTimer(), "0" === t && (window.clearTimeout(this.longpressSpecialChar), (this.longpressSpecialChar = null));
	}
	onKeyDown(e) {
		var t = this,
			n = n110.translate(e.key);
		if (!this.longpressDeleteTimer && (!Service.query("Dialer.isCalling") || ("Call" === n && "Enter" === n)))
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
							n13.isLandscape &&
							(window.clearTimeout(this.longpressSpecialChar),
							(this.longpressSpecialChar = setTimeout(function () {
								var e = t.SPECIAL_CHARS[2],
									n = t.element.selectionStart,
									i = t.element.value;
								t.replaceLeftChar(e, n, i), t.playKeyTone(e);
							}, 1e3))),
						!n13.isLandscape && "*" === n && -1 !== this.SPECIAL_CHARS.indexOf(this.lastKeyinChar) && this.getNowTime() - this.lastInputTime < 1e3)
					) {
						var i = this.element,
							a = i.selectionStart,
							o = i.value,
							r = o[a - 1],
							s = this.SPECIAL_CHARS.indexOf(r);
						(this.element.value = o.slice(0, a - 1) + o.slice(a)), this.element.setSelectionRange(a - 1, a - 1), (n = this.SPECIAL_CHARS[(s + 1) % this.specialCharsCount]);
					}
					e.preventDefault && e.preventDefault(), this.insertKeyAtCaret(n), this.playKeyTone(n), (this.lastKeyinChar = n), (this.lastInputTime = this.getNowTime()), this.onInput();
					break;
				case "Backspace":
					e.stopPropagation(), (this.longpressDeleteTimer = setTimeout(this.longpressDelete.bind(this), 1e3));
					break;
				case "EndCall":
					e.stopPropagation(), this.deleteAllText();
					break;
				case "SoftLeft":
					e.stopPropagation(), launchStore.launch("manifestURL", "app://contact.gaiamobile.org/manifest.webapp");
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
	}
	"_observe_phone.ring.keypad"(e) {
		this._keypadSoundIsEnabled = e;
	}
	insertKeyAtCaret(e) {
		var t = this.element.selectionEnd,
			n = this.element.value;
		(this.element.value = n.substr(0, t) + e + n.substr(t)), (this.element.selectionEnd = t + 1);
	}
	sendFirstChar(e) {
		(this.element.value = ""), this.onKeyDown({ key: e }), this.getFontStyles();
	}
	getNowTime() {
		return +new Date();
	}
	replaceLeftChar(e, t, n) {
		var i = t - 1;
		(this.element.value = n.substr(0, i) + e + n.substr(i + e.length)), this.element.setSelectionRange(t, t);
	}
	clearLongpressDeleteTimer() {
		window.clearTimeout(this.longpressDeleteTimer), (this.longpressDeleteTimer = null);
	}
	longpressDelete() {
		this.clearLongpressDeleteTimer(), this.deleteAllText();
	}
	deleteAllText() {
		(this.element.value = ""), this.onInput();
	}
	playKeyTone(e) {
		this._keypadSoundIsEnabled && TonePlayer.start(TonePlayer.gTonesFrequencies[e], true);
	}
	handleTelNumber() {
		var e = this,
			t = [
				{
					id: "add-to-existing-contact",
					callback: function () {
						n13.sendNumberToContact({ name: "update", telNum: e.telNum });
					},
				},
				{
					id: "create-new-contact",
					callback: function () {
						n13.sendNumberToContact({ name: "new", telNum: e.telNum });
					},
				},
			];
		Service.request("showOptionMenu", {
			options: t,
			onCancel: function () {
				return e.element.focus();
			},
		});
	}
	getFontStyles() {
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
	}
	updateFontSize(e) {
		this.offsetWidth || (this.offsetWidth = this.element.offsetWidth);
		var t = this.element.style.fontSize,
			n = n128_fontFit({ text: e, font: this.fontStyles, space: this.offsetWidth, min: 22, max: 30 }).fontSize + "px";
		t !== n && (this.element.style.fontSize = n);
	}
	getVTSupportability() {
		var e = this;
		navigator.hasFeature &&
			navigator.hasFeature("device.capability.vilte").then(function (t) {
				e.isVTSupported = t;
			});
	}
	exitDialer() {
		this.clearLongpressDeleteTimer(), this.props.exitDialer();
	}
	render() {
		var e = this;
		return React.createElement("input", {
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
	}
}

export default n204_DialerInput_RC;
