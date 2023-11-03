class n62 {
	constructor(selector, element, scrollSelector, initialFocusIndex) {
		this.loopable = !0;
		this.selector = selector;
		this.element = element;
		this.scrollSelector = scrollSelector;
		this.initialFocusIndex = initialFocusIndex || 0;
		this.element.addEventListener("keydown", this);
		this._mutationObserver = new MutationObserver(this.refresh.bind(this));
		this._mutationObserver.observe(this.element, { childList: !0, subtree: !0, attributes: !0 });
		this.element.addEventListener("focus", this);
		this.refresh([]);
	}

	setFocus(e, t) {
		(this._currentFocus = e), (this.element.activeElement = e), t || (this.scrollIntoView(e), this.element.contains(document.activeElement) && e.focus());
	}
	destroy() {
		this.element.removeEventListener("keydown", this),
			this.element.removeEventListener("focus", this),
			(this._candidates = []),
			this._mutationObserver.disconnect(),
			(this._currentFocus = null),
			(this.element.activeElement = null),
			(this.element = null);
	}
	updateCandidates() {
		this._candidates = Array.from(this.element.querySelectorAll(this.selector));
	}
	isAriaHiddenByAncestor() {
		for (var e = !1, t = this.element; t !== document.body; ) {
			if ("true" === t.getAttribute("aria-hidden")) {
				e = !0;
				break;
			}
			t = t.parentNode;
		}
		return e;
	}
	refresh(e) {
		var t = this,
			n = !1;
		if (
			(e.forEach(function (e) {
				[].slice.call(e.removedNodes).forEach(function (e) {
					e.contains(t._currentFocus) && (n = !0);
				});
			}),
			this.updateCandidates(),
			n || ((!this._currentFocus || this._currentFocus === this.element) && this._candidates.length) || this.element === document.activeElement)
		) {
			var r = this.findNext(this._currentFocus);
			r ? ((this._currentFocus = r), (this.element.activeElement = r)) : ((this._currentFocus = this.element), (this.element.activeElement = null));
		}
		this.element.contains(document.activeElement) && this._currentFocus !== document.activeElement && (this.scrollIntoView(this._currentFocus), this._currentFocus.focus());
	}
	handleEvent(e) {
		if ("keydown" === e.type) this.onKeyDown(e);
		else if ("focus" === e.type) {
			if (this._currentFocus && this._currentFocus !== this.element) return this.scrollIntoView(this._currentFocus), void this._currentFocus.focus();
			var t = this.findNext();
			t
				? (this.scrollIntoView(t), t.focus(), (this._currentFocus = t), (this.element.activeElement = t))
				: ((this._currentFocus = this.element), (this.element.activeElement = null));
		}
	}
	onKeyDown(e) {
		var t = null,
			n = !1;
		switch (e.key) {
			case "ArrowDown":
				(n = !0), (t = this.findNext());
				break;
			case "ArrowUp":
				(n = !0), (t = this.findPrev());
		}
		t && (this.scrollIntoView(t), t.focus(), (this._currentFocus = t), (this.element.activeElement = t)), n && (e.stopPropagation(), e.preventDefault());
	}
	scrollIntoView(e) {
		if (this.scrollSelector) {
			for (var t = e, n = !1; t !== document.body; ) {
				if (t.matches(this.scrollSelector)) {
					(n = !0), t.scrollIntoView(!1);
					break;
				}
				t = t.parentNode;
			}
			n || e.scrollIntoView(!1);
		} else e.scrollIntoView(!1);
	}
	getInitialFocus() {
		var e = this._candidates;
		return e.length ? e[this.initialFocusIndex] : null;
	}
	findNext(e) {
		e = e || document.activeElement;
		var t = this._candidates;
		if (!t.length) return null;
		var n = 0;
		return (
			t.some(function (r, o) {
				return r === e && ((n = (o + 1) % t.length), !0);
			}),
			t[n] || this.loopable ? t[n] || t[this.initialFocusIndex] : null
		);
	}
	findPrev(e) {
		var t = this;
		e = e || document.activeElement;
		var n = this._candidates;
		if (!n.length) return null;
		var r = null;
		return (
			n.some(function (o, i) {
				return o === e && ((r = (n.length + i - 1) % n.length), t.loopable || 0 !== i || (r = null), !0);
			}),
			n[r] || this.loopable ? n[r] || n[this.initialFocusIndex] : null
		);
	}
}

export default n62;
