import React from "react";
import ComponentBase from "./ComponentBase";
import n26 from "./m26";
import n16_SoftKeyStore from "./m16";
import KeypadNavigator from "./KeypadNavigator";
import Service from "./Service";
import n108 from "./m108";
import n199 from "./m199";

var O = ["Contract WAP", "PAYG WAP"],
	E = [
		{ l10nId: "apnConfigPostpay", value: O[0] },
		{ l10nId: "apnConfigPrepay", value: O[1] },
	];

class APNSelection extends ComponentBase {
	constructor(props) {
		super(props);

		const __self = this;

		__self.name = "APNSelection";
		__self.FOCUS_SELECTOR = ".list-item";
		__self.state = { whichCard: 0 };
	}

	componentDidMount() {
		(this.navigator = new KeypadNavigator(this.FOCUS_SELECTOR, this.element)), this.updateSoftkeys(), Service.register("setOperatorId", this);
	}
	updateSoftkeys() {
		n16_SoftKeyStore.register({ center: "select" }, this.element);
	}
	onKeyDown(e) {
		switch (e.key) {
			case "Enter":
				var t = document.activeElement.dataset.value;
				dump("apn_selection value = " + t + ", id = " + this.id);
				var n = navigator.mozSettings.createLock(),
					i = {};
				t === O[0]
					? ((i["apn_default_show_" + this.id] = "wap.vodafone.co.uk"), n199.apnSelect(this.id, "wap.vodafone.co.uk"))
					: t === O[1]
					? ((i["apn_default_show_" + this.id] = "pp.vodafone.co.uk"), n199.apnSelect(this.id, "pp.vodafone.co.uk"))
					: (i["apn_default_show_" + this.id] = ""),
					n.set(i),
					n.set({ apn_auto_disable: true }),
					this.hide(),
					0 == this.id && n108.start();
				break;
			case "Backspace":
				e.preventDefault(), Service.request("back");
		}
	}
	hide() {
		Service.request("closeSheet", "apnselection"), this._lock && this._lock.unlock && (dump("apn_selection unlock the _lock"), this._lock.unlock(), (this._lock = null));
	}
	setOperatorId(e) {
		dump("apn_selection.js setOperatorId id = " + e), (this._lock = navigator.requestWakeLock("screen")), (this.id = e), this.setState({ whichCard: e });
	}
	render() {
		var e = this,
			t = [];
		return (
			E.forEach(function (e) {
				var n = e.value === O[0];
				t.push(
					React.createElement(
						"li",
						{ tabIndex: "-1", className: "list-item", "data-value": e.value },
						React.createElement("p", { "data-l10n-id": e.l10nId }),
						React.createElement(
							"div",
							{ className: "apnselection-key" },
							React.createElement("i", { className: "icon control", "data-icon": n ? "radio-on" : "radio-off", "aria-hidden": "true" }),
							React.createElement("input", { type: "radio", checked: n, className: "hidden" })
						)
					)
				);
			}),
			React.createElement(
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
				React.createElement("header", { class: "apnheader" }, React.createElement("h1", { "data-l10n-id": 0 == this.state.whichCard ? "apn-sim1" : "apn-sim2" })),
				React.createElement("ul", { id: "apnconfig-list" }, t),
				React.createElement("p", { "data-l10n-id": "apn-defaultconfig-message" }, "Set which type of apn to show")
			)
		);
	}
}

const n198_APNSelection_RC = n26(APNSelection, "immediate", "immediate");

export default n198_APNSelection_RC;
