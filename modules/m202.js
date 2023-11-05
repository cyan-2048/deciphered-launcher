function getThumbnail(config) {
	return o(config, "begin");
}

function getFullResolution(config) {
	return o(config, "end");
}

function o(config, position) {
	if (!config || !config.photo || !config.photo.length) return null;
	if (1 === config.photo.length) return config.photo[0];
	var photo = config.photo,
		category = config.category;

	if (Array.isArray(category) && category.indexOf("fb_linked") !== -1) {
		if (photo.length >= 4) {
			return photo["begin" === position ? 1 : 0];
		}
		return photo[0];
	} else {
		photo = i(config);
		return photo["begin" === position ? 0 : photo.length - 1];
	}
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

function getPhotoHeader(config, t) {
	if (config && config.photo && config.photo.length) {
		return c(getThumbnail(config));
	}
	return l(config, t);
}

// wtf???
function u() {
	return "";
}

function l(config, t) {
	var spanEl = document.createElement("span");
	spanEl.classList.add("defaultPicture");
	spanEl.classList.add("contactHeaderImage");
	spanEl.setAttribute("style", "");

	var r = ["top", "center", "bottom"],
		o = ["left", "center", "right"],
		i = o[Math.floor(Math.random() * o.length)],
		a = r[Math.floor(Math.random() * r.length)],
		s = i + " " + a;

	spanEl.dataset.group = u(config, t);
	spanEl.style.backgroundPosition = s;

	return spanEl;
}

function c(e) {
	var spanEl = document.createElement("span");
	spanEl.classList.add("contactHeaderImage");
	try {
		spanEl.dataset.src = window.URL.createObjectURL(e);
		spanEl.setAttribute("style", "background-image:url(" + spanEl.dataset.src + ")");
		return spanEl;
	} catch (n) {}
}

var p = { getThumbnail, getFullResolution, getPhotoHeader };

export default p;
