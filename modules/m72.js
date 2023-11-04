import React from "react";
import n6_RC from "./m6";
import n5_Service from "./m5";
import n103 from "./m103";
import n71_OptionMenu_RC from "./m71";
import n129 from "./m129";

// useless side effects, all return a string
// require(234), require(235), require(236);

class n72_RC extends n6_RC {
	constructor(props) {
		super(props);

		this.state = { shown: !1 };
		n5_Service.register("chooseSim", this);
	}

	componentDidUpdate() {
		this.refs.menu
			? (this.refs.menu.show(this.getSimOptions()),
			  this.refs.menu.on("closed", function () {
					n5_Service.request("focus");
			  }))
			: n5_Service.request("focus");
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
					n103.getCardIndexFrom("outgoing" + e.capitalize(t), function (t) {
						if (e.hasOnlyOneSIMCardDetected()) {
							var n = e.isSIMCardAbsent(0) ? 1 : 0;
							e.resolve(n);
						} else e.noSIMCardOnDevice() ? e.resolve(0) : t === n103.ALWAYS_ASK_OPTION_VALUE ? e.setState({ shown: !0 }) : e.resolve(t);
					});
			})
		);
	}
	getSimCardByIndex(e) {
		var t = this,
			n = navigator.mozMobileConnections[e];
		if (n) {
			var r = n129.userFacingInfo(n).operator,
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
		if (!t || !n) return !0;
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
		return React.createElement("div", null, this.state.shown ? React.createElement(n71_OptionMenu_RC, { ref: "menu" }) : null);
	}
}

export default n72_RC;
