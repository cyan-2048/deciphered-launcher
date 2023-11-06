import React from "react";
import ComponentBase from "./ComponentBase";
import OptionMenu from "./OptionMenu";
import Service from "./Service";

class OptionMenuRenderer extends ComponentBase {
	constructor(prop) {
		super(prop);

		const __self = this;
		__self.name = "OptionMenuRenderer";
		__self.state = { menu: false, options: null };
		Service.register("showOptionMenu", __self);
	}

	showOptionMenu(e) {
		this.lastActive = this.lastActive || document.activeElement;
		this.setState({ menu: true, options: e });
	}
	focusLast() {
		this.lastActive && this.lastActive.offsetParent && this.lastActive.focus(), (this.lastActive = null);
	}
	componentDidUpdate() {
		if (this.menu) {
			var e = this;
			this.menu.show(this.state.options),
				this.menu.on("closed", function t() {
					e.focusLast();
					e.menu.off("closed", t);
				});
		} else Service.request("focus");
	}
	render() {
		var e = this;
		return React.createElement(
			"div",
			{ id: "menu-root" },
			this.state.menu
				? React.createElement(OptionMenu, {
						ref: function (t) {
							e.menu = t;
						},
				  })
				: null
		);
	}
}

export default OptionMenuRenderer;
