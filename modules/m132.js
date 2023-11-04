import React from "react";
import ReactDOM from "react-dom";
import n6_RC from "./m6";
import n16_SoftKeyStore from "./m16";
import n5_Service from "./m5";

var b = 0;

class n132_Dialog_RC extends n6_RC {
	static defaultProps = {
		header: "",
		content: "",
		type: "confirm",
		inputType: "text",
		inputMode: "",
		ok: "",
		cancel: "",
		onOk: null,
		onBack: null,
		onCancel: null,
		translated: false,
		buttons: [],
		showCheckbox: false,
		checkboxCheckedByDefault: false,
		checkboxMessage: "",
		placeholder: "",
		initialValue: "",
		maxLength: 100,
		progressValue: "",
		progressMax: "",
		noClose: false,
		noFocus: false,
		hideCancel: false,
	};
	static propTypes = {
		header: React.PropTypes.string,
		content: React.PropTypes.string,
		type: React.PropTypes.string,
		inputType: React.PropTypes.string,
		inputMode: React.PropTypes.string,
		ok: React.PropTypes.string,
		cancel: React.PropTypes.string,
		onOk: React.PropTypes.func,
		onBack: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		translated: React.PropTypes.bool,
		buttons: React.PropTypes.array,
		showCheckbox: React.PropTypes.bool,
		checkboxCheckedByDefault: React.PropTypes.bool,
		checkboxMessage: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		initialValue: React.PropTypes.string,
		maxLength: React.PropTypes.number,
		progressValue: React.PropTypes.string,
		progressMax: React.PropTypes.string,
	};

	constructor() {
		super(...arguments);
		this.name = "Dialog";
	}

	componentDidUpdate() {
		"prompt" === this.props.type && (ReactDOM.findDOMNode(this.refs.input).value = this.props.initialValue || "");
	}
	componentDidMount() {
		(this.element = ReactDOM.findDOMNode(this)),
			(this.content = this.element.querySelector(".content")),
			"prompt" === this.props.type && ReactDOM.findDOMNode(this.refs.input).setAttribute("x-inputmode", this.props.inputMode),
			n5_Service.register("show", this),
			n5_Service.register("hide", this),
			this.updateSoftKeys();
	}
	scrollContent(e) {
		if (this.content) {
			var t = this.content.scrollHeight - this.content.clientHeight;
			if ((0 == this.content.scrollTop && e < 0) || (this.content.scrollTop == t && e > 0)) return false;
			var n,
				r = this.content.clientHeight - 41;
			return e > 0 ? (n = this.content.scrollTop + r) : e < 0 && (n = this.content.scrollTop - r), n < 0 ? (n = 0) : n > t && (n = t), this.content.scrollTo(0, n), true;
		}
	}
	updateSoftKeys() {
		if ("custom" !== this.props.type)
			"alert" === this.props.type
				? n16_SoftKeyStore.register({ left: "", center: "ok", right: "" }, ReactDOM.findDOMNode(this))
				: "progress" === this.props.type
				? n16_SoftKeyStore.register({ left: this.props.hideCancel ? "" : this.props.cancel || "cancel", center: "", right: "" }, ReactDOM.findDOMNode(this))
				: n16_SoftKeyStore.register({ left: this.props.cancel || "cancel", center: "", right: this.props.ok || "ok" }, ReactDOM.findDOMNode(this));
		else {
			var e = this.props.buttons;
			3 === e.length
				? "alert" !== this.props.type
					? n16_SoftKeyStore.register({ left: e[0].message, center: e[1].message, right: e[2].message }, ReactDOM.findDOMNode(this))
					: n16_SoftKeyStore.register({ left: "", center: "ok", right: "" }, ReactDOM.findDOMNode(this))
				: 2 === e.length
				? (n16_SoftKeyStore.register({ left: e[0].message, center: "", right: e[1].message }, ReactDOM.findDOMNode(this)),
				  ReactDOM.findDOMNode(this.refs.checkbox) &&
						n16_SoftKeyStore.register(
							{ center: "check-on" === ReactDOM.findDOMNode(this.refs.checkbox).dataset.icon ? "off" : "on" },
							ReactDOM.findDOMNode(this.refs.checkboxContainer)
						))
				: 1 === e.length && n16_SoftKeyStore.register({ left: "", center: e[0].message, right: "" }, ReactDOM.findDOMNode(this));
		}
	}
	focus() {
		this.focusIfPossible(), this.updateSoftKeys();
	}
	focusIfPossible() {
		this.isHidden() ||
			("custom" === this.props.type && this.refs.checkboxContainer
				? ReactDOM.findDOMNode(this.refs.checkboxContainer).focus()
				: "prompt" === this.props.type
				? ReactDOM.findDOMNode(this.refs.input).focus()
				: this.props.noFocus || (this.refs.content ? ReactDOM.findDOMNode(this.refs.content).focus() : this.element.focus()));
	}
	hide() {
		"prompt" === this.props.type && (ReactDOM.findDOMNode(this.refs.input).value = this.props.initialValue || "");
		super.hide();
	}
	getInstanceID() {
		return this._id || ((this._id = b), b++), this._id;
	}
	onKeyDown(e) {
		var t = (e.target, e.key);
		switch (t) {
			case "ArrowDown":
				e.stopPropagation(), e.preventDefault(), this.scrollContent(1);
				break;
			case "ArrowUp":
				e.stopPropagation(), e.preventDefault(), this.scrollContent(-1);
				break;
			case "Enter":
				if ((e.stopPropagation(), e.preventDefault(), "custom" === this.props.type)) {
					if (3 === this.props.buttons.length) {
						var n = { selectedButton: 1 };
						if (this.props.showCheckbox) {
							var r = ReactDOM.findDOMNode(this.refs.checkbox).dataset.icon;
							n.checked = "check-on" === r;
						}
						this.props.onOk && this.props.onOk(n), this.props.noClose || this.hide();
					} else if (this.props.showCheckbox && document.activeElement === ReactDOM.findDOMNode(this.refs.checkboxContainer)) {
						var r = ReactDOM.findDOMNode(this.refs.checkbox).dataset.icon;
						(ReactDOM.findDOMNode(this.refs.checkbox).dataset.icon = "check-on" === r ? "check-off" : "check-on"), this.updateSoftKeys();
					}
				} else "alert" === this.props.type && (this.props.onOk && this.props.onOk(), this.props.noClose || this.hide());
				break;
			case "F1":
			case "SoftLeft":
				if ((e.stopPropagation(), e.preventDefault(), "custom" === this.props.type)) {
					var n = { selectedButton: 0 };
					this.props.showCheckbox && (n.checked = "check-on" === ReactDOM.findDOMNode(this.refs.checkbox).dataset.icon), this.props.onOk && this.props.onOk(n);
				} else if ("alert" !== this.props.type) {
					if (this.props.hideCancel) return;
					this.props.onCancel && this.props.onCancel();
				}
				"alert" !== this.props.type && this.hide();
				break;
			case "F2":
			case "SoftRight":
				if ((e.stopPropagation(), e.preventDefault(), this.props.hideCancel)) return;
				if ("custom" === this.props.type) {
					var n = { selectedButton: 3 === this.props.buttons.length ? 2 : 1 };
					this.props.showCheckbox && (n.checked = ReactDOM.findDOMNode(this.refs.checkbox).checked), this.props.onOk && this.props.onOk(n);
				} else
					"prompt" === this.props.type
						? this.props.onOk && this.props.onOk(ReactDOM.findDOMNode(this.refs.input).value)
						: "confirm" === this.props.type && this.props.onOk && this.props.onOk();
				this.props.noClose || "alert" === this.props.type || this.hide();
				break;
			case "BrowserBack":
			case "Backspace":
			case "EndCall":
				if ("INPUT" === document.activeElement.tagName && document.activeElement.value) return;
				if ((e.stopPropagation(), e.preventDefault(), this.props.hideCancel)) return;
				this.props.onBack && this.props.onBack(), this.hide();
		}
	}
	render() {
		var e = this,
			t = "";
		return (
			this.props.header &&
				(t = this.props.translated
					? React.createElement("div", { className: "header h1", key: "no-translated-header", id: "dialog-header-" + this.getInstanceID() }, this.props.header)
					: React.createElement("div", {
							className: "header h1",
							key: "translated-header",
							"data-l10n-id": this.props.header,
							id: "dialog-header-" + this.getInstanceID(),
					  })),
			React.createElement(
				"div",
				{
					className: "dialog-container",
					tabIndex: "-1",
					onKeyDown: function (t) {
						return e.onKeyDown(t);
					},
				},
				React.createElement(
					"div",
					{ role: "heading", className: "dialog", "aria-labelledby": "dialog-header-" + this.getInstanceID() },
					t,
					this.props.children ||
						React.createElement(
							"div",
							{ className: "content p-ul", ref: "content", tabIndex: "-1" },
							this.props.translated ? this.props.content : React.createElement("div", { "data-l10n-id": this.props.content }),
							"prompt" === this.props.type
								? React.createElement("input", {
										ref: "input",
										type: this.props.inputType,
										className: "primary",
										placeholder: this.props.placeholder,
										defaultValue: this.props.initialValue,
										maxLength: this.props.maxLength,
								  })
								: "",
							"custom" === this.props.type && this.props.showCheckbox
								? React.createElement(
										"div",
										{ tabIndex: "-1", ref: "checkboxContainer" },
										React.createElement("i", { ref: "checkbox", "data-icon": this.props.checkboxCheckedByDefault ? "check-on" : "check-off" }),
										React.createElement("span", null, this.props.checkboxMessage)
								  )
								: "",
							"progress" === this.props.type
								? React.createElement(
										"div",
										null,
										React.createElement("p", null, this.props.progressValue, "/", this.props.progressMax),
										React.createElement("progress", { value: this.props.progressValue, max: this.props.progressMax })
								  )
								: ""
						)
				)
			)
		);
	}
}

export default n132_Dialog_RC;
