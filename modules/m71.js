import React from "react";
import ReactDOM from "react-dom";
import ComponentBase from "./ComponentBase";
import n16_SoftKeyStore from "./m16";
import KeypadNavigator from "./KeypadNavigator";

class n71_OptionMenu_RC extends ComponentBase {
	constructor(e) {
		super(e);

		this.name = "OptionMenu";
		this.FOCUS_SELECTOR = ".menu-item";
		this.state = { header: "", options: [], onCancel: function () {} };
	}

	componentDidMount() {
		(this.element = ReactDOM.findDOMNode(this)), (this.navigator = new KeypadNavigator(this.FOCUS_SELECTOR, this.element)), this.updateSoftKeys();
	}
	componentWillUnmount() {
		this.navigator.destroy(), this.unregisterSoftKeys(), (this.element = null);
	}
	componentDidUpdate() {
		this.isActive() && document.activeElement === document.body && this.focus();
	}
	componentWillUpdate() {
		var e = this.element.querySelector('[data-index="0"]');
		e && this.navigator.setFocus(e);
	}
	unregisterSoftKeys() {
		n16_SoftKeyStore.unregister(this.element);
	}
	updateSoftKeys() {
		n16_SoftKeyStore.register({ left: this.state.hasCancel ? "cancel" : "", center: "select", right: "" }, this.element);
	}
	clear() {
		this.setState({ header: "", options: [], onCancel: function () {} });
	}
	show(e) {
		var n = this;
		this.clear(),
			this.setState(e, function () {
				n.updateSoftKeys();
			});
		super.show();
	}
	onKeyDown(e) {
		var t = (e.target, e.key),
			n = null;
		switch (t) {
			case "Enter":
				e.stopPropagation(), e.preventDefault();
				var r = this.state.options[+e.target.dataset.index];
				r && r.callback && r.callback(), this.hide();
				break;
			case "ArrowUp":
				e.stopPropagation(), e.preventDefault(), (n = this.findPrev());
				break;
			case "ArrowDown":
				e.stopPropagation(), e.preventDefault(), (n = this.findNext());
				break;
			case "SoftLeft":
				if (!this.state.hasCancel) break;
			case "BrowserBack":
			case "Backspace":
				e.stopPropagation(), e.preventDefault(), this.state.onCancel && this.state.onCancel(), this.hide();
		}
		n && (n.scrollIntoView(false), n.focus());
	}
	render() {
		var e = this,
			t = [];
		return (
			this.state.options.forEach(function (e, n) {
				var r = "";
				e.icon && (r = React.createElement("img", { src: e.icon, className: "icon" }));
				var o = "content" + (e.checked ? " checked" : "");
				t.push(
					React.createElement(
						"div",
						{ key: "option-" + n, tabIndex: "-1", "data-index": n, className: "menu-item p-pri" },
						r,
						React.createElement("div", { className: o, "data-l10n-id": e.id || "", "data-l10n-args": e.l10nArgs || null, "data-icon": e.dataicon || "" }, e.label || "")
					)
				);
			}),
			React.createElement(
				"div",
				{
					className: "option-menu-container",
					tabIndex: "-1",
					onKeyDown: function (t) {
						return e.onKeyDown(t);
					},
				},
				React.createElement(
					"div",
					{ className: "option-menu" },
					React.createElement("div", { className: "header h1", key: "translated-header", "data-l10n-id": this.state.header || "options" }),
					React.createElement("div", { className: "content p-ul" }, this.props.children || t)
				)
			)
		);
	}
}
export default n71_OptionMenu_RC;
