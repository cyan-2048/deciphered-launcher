import React from "react";
import n6_RC from "./m6";
import n71_OptionMenu_RC from "./m71";
import n5_Service from "./m5";

class n107_OptionMenuRenderer_RC extends n6_RC {
	constructor(prop) {
		super(prop);

		const __self = this;
		__self.name = "OptionMenuRenderer";
		__self.state = { menu: !1, options: null };
		n5_Service.register("showOptionMenu", __self);
	}

	showOptionMenu(e) {
		this.lastActive = this.lastActive || document.activeElement;
		this.setState({ menu: !0, options: e });
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
		} else n5_Service.request("focus");
	}
	render() {
		var e = this;
		return React.createElement(
			"div",
			{ id: "menu-root" },
			this.state.menu
				? React.createElement(n71_OptionMenu_RC, {
						ref: function (t) {
							e.menu = t;
						},
				  })
				: null
		);
	}
}

export default n107_OptionMenuRenderer_RC;
