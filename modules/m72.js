import React from "react";
import ComponentBase from "./ComponentBase";
import Service from "./Service";
import SimSettingsHelper from "./SimSettingsHelper";
import OptionMenu from "./OptionMenu";
import MobileOperator from "./mobile_operator";

// useless side effects, all return a string
// require(234), require(235), require(236);

// have no idea what to call this, might be able to figure out once i read where it's used
class n72_RC extends ComponentBase {
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
		var e = this,
			t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "call";
		return (
			(this.lastActive = document.activeElement),
			new Promise(function (n, r) {
				(e.resolve = n),
					(e.reject = r),
					SimSettingsHelper.getCardIndexFrom("outgoing" + e.capitalize(t), function (t) {
						if (e.hasOnlyOneSIMCardDetected()) {
							var n = e.isSIMCardAbsent(0) ? 1 : 0;
							e.resolve(n);
						} else e.noSIMCardOnDevice() ? e.resolve(0) : t === SimSettingsHelper.ALWAYS_ASK_OPTION_VALUE ? e.setState({ shown: true }) : e.resolve(t);
					});
			})
		);
	}
	getSimCardByIndex(e) {
		var t = this,
			n = navigator.mozMobileConnections[e];
		if (n) {
			var r = MobileOperator.userFacingInfo(n).operator,
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
	}
	getSimOptions() {
		var e = this;
		return {
			header: "select",
			options: [this.getSimCardByIndex(0), this.getSimCardByIndex(1)],
			onCancel: function () {
				e.reject(), e.onCancel(), (e.resolve = null), (e.reject = null);
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

export default n72_RC;
