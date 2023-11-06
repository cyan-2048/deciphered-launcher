import React from "react";
import ComponentBase from "./ComponentBase";
import Service from "./Service";
import SimSettingsHelper from "./SimSettingsHelper";
import OptionMenu from "./OptionMenu";
import MobileOperator from "./mobile_operator";

// useless side effects, all return a string
// require(234), require(235), require(236);

// it just shows a select menu that lets you choose a sim
// let's call it SelectSimMenu
class SelectSimMenu extends ComponentBase {
	constructor(props) {
		super(props);

		this.state = { shown: false };
		Service.register("chooseSim", this);
	}

	componentDidUpdate() {
		this.refs.menu
			? (this.refs.menu.show(this.getSimOptions()),
			  this.refs.menu.on("closed", function () {
					Service.request("focus");
			  }))
			: Service.request("focus");
	}
	capitalize(e) {
		return e.charAt(0).toUpperCase() + e.slice(1);
	}
	chooseSim() {
		var self = this,
			t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "call";

		this.lastActive = document.activeElement;

		return new Promise(function (n, r) {
			self.resolve = n;
			self.reject = r;
			SimSettingsHelper.getCardIndexFrom("outgoing" + self.capitalize(t), function (t) {
				if (self.hasOnlyOneSIMCardDetected()) {
					var n = self.isSIMCardAbsent(0) ? 1 : 0;
					self.resolve(n);
				} else self.noSIMCardOnDevice() ? self.resolve(0) : t === SimSettingsHelper.ALWAYS_ASK_OPTION_VALUE ? self.setState({ shown: true }) : self.resolve(t);
			});
		});
	}
	getSimCardByIndex(index) {
		var self = this,
			mobileConnection = navigator.mozMobileConnections[index];
		if (mobileConnection) {
			var operator = MobileOperator.userFacingInfo(mobileConnection).operator,
				o = index + 1;
			return {
				id: operator ? "sim-with-index-and-carrier" : "sim-without-carrier",
				l10nArgs: JSON.stringify({ carrier: operator ? operator : null, index: o }),
				label: "SIM " + o,
				callback: function () {
					self.resolve(index), self.onCancel(), (self.resolve = null), (self.reject = null);
				},
			};
		}
	}
	getSimOptions() {
		var e = this;
		return {
			header: "select",
			options: [this.getSimCardByIndex(0), this.getSimCardByIndex(1)],
			onCancel: function () {
				e.reject();
				e.onCancel();
				e.resolve = null;
				e.reject = null;
			},
		};
	}
	onCancel() {
		this.focusLast();
	}
	focusLast() {
		this.lastActive && (this.lastActive.focus(), (this.lastActive = null));
	}
	isSIMCardAbsent(e) {
		var t = navigator.mozIccManager,
			n = navigator.mozMobileConnections[e];
		if (!t || !n) return true;
		var r = t.getIccById(n.iccId);
		return !r || (r && r.iccInfo && null === r.iccInfo.iccid);
	}
	hasOnlyOneSIMCardDetected() {
		// cool math
		return this.isSIMCardAbsent(0) ^ this.isSIMCardAbsent(1);
	}
	noSIMCardOnDevice() {
		var e = navigator.mozIccManager;
		return !e || !e.iccIds || 0 === e.iccIds.length;
	}
	render() {
		return React.createElement("div", null, this.state.shown ? React.createElement(OptionMenu, { ref: "menu" }) : null);
	}
}

export default SelectSimMenu;
