import React from "react";
import ReactDOM from "react-dom";
import ComponentBase from "./ComponentBase";
import Service from "./Service";

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

class Popup extends ComponentBase {
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

// made this up I have no idea how to name this
var animateComponent = function (el, openAnimation, closeAnimation) {
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
				React.createElement(Popup, { ref: "popup" })
			);
		}
	};
};

export default animateComponent;
