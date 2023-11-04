import React from "react";
import ReactDOM from "react-dom";
import ComponentBase from "./ComponentBase";
import n131_RC from "./m131";

class n130_RC extends ComponentBase {
	static defaultProps = { openAnimation: "immediate", closeAnimation: "immediate", noFocus: false };
	static propTypes = { openAnimation: React.PropTypes.string, closeAnimation: React.PropTypes.string, noFocus: React.PropTypes.bool };

	constructor(props) {
		super(props);
		this.state = { transition: "closed", animation: "immediate" };
	}

	isHidden() {
		return "opened" !== this.state.transition;
	}

	isActive() {
		return "opened" === this.state.transition || "opening" === this.state.transition;
	}
	isTransitioning() {
		return "opening" === this.state.transition || "closing" === this.state.transition;
	}
	onAnimationEnd(e) {
		if (e.target === ReactDOM.findDOMNode(this))
			switch (this.state.transition) {
				case "opening":
					this.setState({ transition: "opened", animation: "" });
					break;
				case "closing":
					this.setState({ transition: "closed", animation: "" });
			}
	}
	componentDidMount() {
		ReactDOM.findDOMNode(this).addEventListener("animationend", this.onAnimationEnd.bind(this), false);
	}
	getActivatedState() {
		switch (this.state.transition) {
			case "opening":
				return "-activating";
			case "closing":
				return "-deactivating";
			case "opened":
				return "-activated";
			case "closed":
				return "-deactivated";
		}
	}
	componentDidUpdate() {
		this.emit(this.state.transition), this.publish(this.getActivatedState());
		var e = (React.Children.toArray(this.props.children)[0], ReactDOM.findDOMNode(this.refs.shadow).firstChild);
		if (!e) return void this.debug("no content");
		if ("opened" === this.state.transition) {
			if ((this.debug("focusing inner content"), this.props.noFocus)) return;
			e.activeElement ? e.activeElement.focus() : e.focus();
		} else "closing" === this.state.transition && e.blur();
	}
	shouldComponentUpdate(e, t) {
		return t.transition !== this.state.transition || t.animation !== this.state.animation;
	}
	open(e) {
		switch (((e = e || this.props.openAnimation), this.state.transition)) {
			case "opened":
				break;
			case "opening":
			case "closing":
			case "closed":
				"immediate" !== e && e ? this.setState({ transition: "opening", animation: e }) : this.setState({ transition: "opened", animation: "" });
		}
	}
	focus() {
		var e = ReactDOM.findDOMNode(this.refs.shadow).firstChild;
		e && e.focus();
	}
	close(e) {
		switch (((e = e || this.props.closeAnimation), this.state.transition)) {
			case "closed":
				break;
			case "opening":
			case "closing":
			case "opened":
				"immediate" !== e && e ? this.setState({ transition: "closing", animation: e }) : this.setState({ transition: "closed", animation: "" });
		}
	}
	render() {
		return React.createElement(
			"div",
			{
				tabIndex: "-1",
				className: "x-window " + this.state.animation,
				"aria-hidden": "opened" === this.state.transition ? "false" : "true",
				"data-transition-state": this.state.transition,
			},
			React.createElement(n131_RC, { ref: "shadow", transition: this.state.transition, animation: this.state.animation }, this.props.children)
		);
	}
}

export default n130_RC;
