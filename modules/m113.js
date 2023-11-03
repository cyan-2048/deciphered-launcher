import React from "react";
import ReactDOM from "react-dom";
import n6_RC from "./m6";

class n113_RC extends n6_RC {
	constructor(props) {
		super(props);
		this.state = { popup: null };
	}

	componentDidMount() {}

	focus() {
		ReactDOM.findDOMNode(this.refs.composed).focus();
	}
	open(e) {
		this.refs.popup && this.refs.popup.open(e);
	}
	componentDidUpdate() {
		var e = this;
		this.refs.popup &&
			(this.refs.popup.open("bottom-to-up"),
			(this.refs.popup.refs.composed.close = this.close.bind(this)),
			this.refs.popup.refs.composing.on("closing", function () {
				e.setState({ popup: null });
			}));
	}
	render() {
		var e = this.state.popup ? React.cloneElement(this.state.popup, { ref: "popup" }) : null;
		return React.createElement("div", { className: "popup" }, e);
	}
}

export default n113_RC;
