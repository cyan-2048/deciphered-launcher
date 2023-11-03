function getThumbnail(e) {
	return o(e, "begin");
}
function getFullResolution(e) {
	return o(e, "end");
}
function o(e, t) {
	if (!e || !e.photo || !e.photo.length) return null;
	if (1 === e.photo.length) return e.photo[0];
	var n = e.photo,
		r = e.category;
	return Array.isArray(r) && r.indexOf("fb_linked") !== -1 ? (n.length >= 4 ? n["begin" === t ? 1 : 0] : n[0]) : ((n = i(e)), n["begin" === t ? 0 : n.length - 1]);
}
function i(e) {
	var t = e.photo.slice(0);
	return (
		t.sort(function (e, t) {
			return a(e) < a(t) ? -1 : a(e) > a(t) ? 1 : 0;
		}),
		t
	);
}
function a(e) {
	return "string" == typeof e ? e.length : e.size;
}
function getPhotoHeader(e, t) {
	if (e && e.photo && e.photo.length) {
		return c(getThumbnail(e));
	}
	return l(e, t);
}
function u() {
	return "";
}
function l(e, t) {
	var n = document.createElement("span");
	n.classList.add("defaultPicture"), n.classList.add("contactHeaderImage"), n.setAttribute("style", "");
	var r = ["top", "center", "bottom"],
		o = ["left", "center", "right"],
		i = o[Math.floor(Math.random() * o.length)],
		a = r[Math.floor(Math.random() * r.length)],
		s = i + " " + a;
	return (n.dataset.group = u(e, t)), (n.style.backgroundPosition = s), n;
}
function c(e) {
	var t = document.createElement("span");
	t.classList.add("contactHeaderImage");
	try {
		return (t.dataset.src = window.URL.createObjectURL(e)), t.setAttribute("style", "background-image:url(" + t.dataset.src + ")"), t;
	} catch (n) {}
}

var p = { getThumbnail, getFullResolution, getPhotoHeader };

export default p;
