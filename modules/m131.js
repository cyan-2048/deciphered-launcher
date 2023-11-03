import React from "react";

class n131_RC extends React.Component {
	// odd?
	static defaultProps = { transition: "", animation: "" };
	static propTypes = { transition: React.PropTypes.string.isRequired, animation: React.PropTypes.string.isRequired };

	isOpening(e) {
		var t = e || this.props;
		return "opening" === t.transition || ("opened" === t.transition && "immediate" === t.animation);
	}
	isClosed(e) {
		return "closed" === (e || this.props).transition;
	}
	shouldComponentUpdate(e, t) {
		return !!this.isOpening(e);
	}
	render() {
		return React.createElement("div", { className: "shadow-window" }, this.props.children);
	}
}

export default n131_RC;
