import React from "react";
import ReactDOM from "react-dom";
import ComponentBase from "./ComponentBase";
import Service from "./Service";
import n130_RC from "./m130";
import n113_RC from "./m113";

var n26 = function (el, openAnimation, closeAnimation) {
	return class extends ComponentBase {
		constructor(props) {
			super(props);
			this.state = { popup: null };
		}

		componentDidMount() {
			var e = this;
			(this.refs.composed.open = this.refs.composing.open.bind(this.refs.composing)),
				(this.refs.composed.close = this.refs.composing.close.bind(this.refs.composing)),
				Service.register("open", this.refs.composed),
				Service.register("close", this.refs.composed),
				(this.refs.composed.isActive = this.refs.composing.isActive.bind(this.refs.composing)),
				this.refs.composing.on("closed", function () {
					e.refs.composed.emit("closed"), e.emit("closed");
				}),
				this.refs.composing.on("opened", function () {
					e.refs.composed.emit("opened"), e.emit("opened");
				});
		}
		open(e) {
			this.refs.composing.open(e);
		}
		focus() {
			var e = ReactDOM.findDOMNode(this.refs.composed);
			e.activeElement ? (e.activeElement.focus(), document.activeElement === document.body && e.focus()) : e.focus();
		}
		close(e) {
			this.refs.composing.close(e);
		}
		isClosed() {
			return "closed" === this.refs.composing.state.transition;
		}
		isTransitioning() {
			return this.refs.composing.isTransitioning();
		}
		getTopMost() {
			return this.refs.popup.refs.popup ? this.refs.popup.refs.popup.getTopMost() : this;
		}
		openPopup(e) {
			this.refs.popup.setState({ popup: e });
		}
		componentDidUpdate() {
			this.refs.popup && this.refs.popup.open();
		}
		render() {
			return React.createElement(
				n130_RC,
				{ ref: "composing", openAnimation: openAnimation, closeAnimation: closeAnimation },
				React.createElement(el, Object.assign({ ref: "composed" }, this.props)),
				React.createElement(n113_RC, { ref: "popup" })
			);
		}
	};
};

export default n26;
