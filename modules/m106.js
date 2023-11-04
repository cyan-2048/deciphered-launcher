import React from "react";
import n6_RC from "./m6";
import n5_Service from "./m5";
import n132_Dialog_RC from "./m132";

var s = Object.assign;

class n106_DialogRenderer_RC extends n6_RC {
	constructor(props) {
		super(props);

		const __self = this;
		__self.name = "DialogRenderer";
		__self.closeDialog = function () {
			__self.isHidden = !0;
			__self.focusLast();
			__self.dialog.off("closed", __self.closeDialog);
		};
		__self.state = { dialog: !1, options: {} };
		n5_Service.register("showDialog", __self);
		n5_Service.register("hideDialog", __self);
		n5_Service.registerState("isHidden", __self);
		__self.isHidden = !0;
	}

	showDialog(e) {
		var t = this;
		(this.lastActive = this.lastActive || document.activeElement),
			this.setState({ dialog: !0, options: e }, function () {
				"prompt" === e.type ? (t.dialog.element.classList.add("prompt"), t.dialog.element.querySelector("input").select()) : t.dialog.element.classList.remove("prompt");
			}),
			(this.isHidden = !1);
	}
	hideDialog() {
		this.dialog.hide();
	}
	focusLast() {
		this.lastActive && this.lastActive.offsetParent && document.hasFocus() ? this.lastActive.focus() : n5_Service.request(n5_Service.query("App.lastSheet") + ":show"),
			(this.lastActive = null);
	}
	componentDidUpdate() {
		this.dialog.show(), this.dialog.off("closed", this.closeDialog), this.dialog.on("closed", this.closeDialog);
	}
	render() {
		var e = this;
		return React.createElement(
			"div",
			{ id: "dialog-root", className: "dialog-root " + (this.state.options.otherClass || "") },
			this.state.dialog &&
				React.createElement(
					n132_Dialog_RC,
					s(
						{
							ref: function (t) {
								e.dialog = t;
							},
						},
						this.state.options
					)
				)
		);
	}
}

export default n106_DialogRenderer_RC;
