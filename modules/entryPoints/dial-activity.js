import React from "react";
import ReactDOM from "react-dom";
import SoftKeyPanel from "../SoftKeyPanel";
import Service from "../Service";
import n72_RC from "../m72";
import n106_DialogRenderer_RC from "../m106";
import n107_OptionMenuRenderer_RC from "../m107";
import n64 from "../m64";
import { toL10n } from "../m13";

class DialActivity extends React.Component {
	constructor(props) {
		super(props);
		const __self = this;

		__self.name = "DialActivity";
		navigator.mozSetMessageHandler("activity", __self.activityHandler.bind(__self));
	}

	activityHandler(e) {
		var t = e.source;
		navigator.mozL10n.ready(function () {
			var e = t.data && t.data.number;
			return e
				? void Service.request("showDialog", {
						ok: "call",
						cancel: "cancel",
						type: "confirm",
						header: null,
						content: e,
						translated: true,
						onOk: function () {
							Service.request("chooseSim", "call")
								.then(function (t) {
									n64.dialForcely(e, t), window.close();
								})
								.catch(function () {
									window.close();
								});
						},
						onCancel: function () {
							window.close();
						},
						onBack: function () {
							window.close();
						},
				  })
				: (window.alert(toL10n("invalidNumberToDialMessage")), void window.close());
		});
	}
	render() {
		return React.createElement(
			"div",
			{ className: "app-workspace" },
			React.createElement(n107_OptionMenuRenderer_RC, null),
			React.createElement(n72_RC, null),
			React.createElement(n106_DialogRenderer_RC, null),
			React.createElement(SoftKeyPanel, null)
		);
	}
}

ReactDOM.render(React.createElement(DialActivity, null), document.getElementById("root"));
