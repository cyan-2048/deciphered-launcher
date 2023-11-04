import n202 from "./m202";

function toL10n() {
	var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
		t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
	return "complete" === navigator.mozL10n.readyState && e ? ((e += ""), navigator.mozL10n.get(e, t) || e) : e;
}
function sendNumberToContact() {
	var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
		t = e.name,
		n = void 0 === t ? "new" : t,
		r = e.telNum,
		o = void 0 === r ? "" : r;
	new MozActivity({ name: n, data: { type: "webcontacts/contact", params: { tel: o } } });
}
function getDeepProp(e, t) {
	var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
	return t.split(n).reduce(function (e, t) {
		return e && e[t];
	}, e);
}
function pickContact(e) {
	var t = new MozActivity({ name: "pick", data: { type: "webcontacts/tel", params: { typeOfContact: "device" } } });
	(t.onsuccess = e), (t.onerror = function () {});
}
function simpleClone(e) {
	return JSON.parse(JSON.stringify(e));
}
function clamp(e) {
	var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
		n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
	return e <= t ? t : e >= n ? n : e;
}
function rowColToIndex() {
	var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [0, 0],
		t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
	return e[0] * t + e[1];
}
function indexToRowCol(e) {
	var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
	return [Math.floor(e / t), e % t];
}
function navGrid() {
	var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
		t = e.currentRowCol,
		n = void 0 === t ? [0, 0] : t,
		r = e.dir,
		o = e.col,
		i = void 0 === o ? 3 : o,
		a = e.total,
		s = rowColToIndex(n, i),
		u = Math.ceil(a / i),
		d = u * i,
		f = a - 1;
	switch ((!isRtl() || ("ArrowLeft" !== r && "ArrowRight" !== r) || (r = "ArrowLeft" === r ? "ArrowRight" : "ArrowLeft"), r)) {
		case "ArrowRight":
			s = (a + (s + 1)) % a;
			break;
		case "ArrowLeft":
			s = (a + (s - 1)) % a;
			break;
		case "ArrowUp":
			s = clamp((d + (s - i)) % d, 0, f);
			break;
		case "ArrowDown":
			s = clamp((d + (s + i)) % d, 0, f);
	}
	return indexToRowCol(s, i);
}
function contactNumFilter() {
	var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
		t = e.telNum;
	return new Promise(function (e, n) {
		var r = navigator.mozContacts.find({ filterBy: ["tel"], filterOp: "contains", filterLimit: 10, filterValue: t });
		(r.onsuccess = function (t) {
			e(t.target.result);
		}),
			(r.onerror = n);
	});
}
function getContactDetails(e, t, n) {
	function r(t) {
		var r = void 0,
			i = void 0,
			a = void 0,
			s = void 0,
			u = void 0,
			l = void 0;
		for (r = t.name[0], l = t.org && t.org[0], s = t.tel ? t.tel.length : 0, u = e.length > 7 ? e.substr(-8) : e, a = 0; a < s && t.tel[a].value.indexOf(u) === -1; a++);
		if (((o.isContact = true), n.photoURL)) {
			var c = n202.getThumbnail(t);
			c && (o.photoURL = window.URL.createObjectURL(c));
		}
		(o.name = r), (o.phone = i), (o.org = o.org || l);
	}
	var o = {};
	if (((n = n || {}), !t || (Array.isArray(t) && 0 === t.length))) o.title = "";
	else if (Array.isArray(t)) {
		for (var i = 0, a = t.length; i < a && (r(t[i]), !o.name); i++);
		o.title = o.name || o.org;
	} else r(t), (o.title = o.name || o.org);
	return o;
}
function toggleBletooth(e) {
	if (!navigator.mozBluetooth || !navigator.mozBluetooth.defaultAdapter || !navigator.mozBluetooth.defaultAdapter.state) return Promise.reject("no bluetooth exist");
	var t = navigator.mozBluetooth.defaultAdapter.state,
		n = "enabled" === t;
	return (e = e || (n ? "disable" : "enable")), t.endsWith("ing") ? Promise.reject("bluetooth state is busy: " + t) : navigator.mozBluetooth.defaultAdapter[e]();
}

var isLandscape = screen.orientation.type.startsWith("landscape");

var isRtl = function () {
	return "rtl" === document.dir;
};

var asyncLocalStorage = {
	setItem: function (e, t) {
		return Promise.resolve().then(function () {
			localStorage.setItem(e, t);
		});
	},
	getItem: function (e) {
		return Promise.resolve().then(function () {
			return localStorage.getItem(e);
		});
	},
};

export {
	toL10n,
	sendNumberToContact,
	getDeepProp,
	pickContact,
	simpleClone,
	clamp,
	rowColToIndex,
	indexToRowCol,
	navGrid,
	contactNumFilter,
	getContactDetails,
	toggleBletooth,
	isLandscape,
	isRtl,
	asyncLocalStorage,
};
