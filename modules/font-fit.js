// code probably taken from https://github.com/mozilla-b2g/gaia/blob/975a35c0f5010df341e96d6c5ec60217f5347412/shared/elements/font-fit/font-fit.js
// but was modified to be used on KaiOS

function getTextWidth(e, t) {
	var n = getCanvasContext(t),
		i = n.measureText(e).width;
	return debug("got text width", i), i;
}
function getCanvasContext(e) {
	debug("get canvas context", e);
	var t = cache[e];
	if (t) return t;
	var n = document.createElement("canvas");
	n.setAttribute("moz-opaque", "true"), n.setAttribute("width", "1px"), n.setAttribute("height", "1px"), debug("created canvas", n);
	var i = n.getContext("2d", { willReadFrequently: true });
	return (i.font = e), (cache[e] = i);
}
function trim(e) {
	return e.replace(/\s+/g, " ").trim();
}
var debug = function () {},
	cache = {};

function fontFit(config) {
	debug("font fit", config);
	var textWidth,
		font,
		space = config.space - 0.03 * config.space,
		min = config.min || 16,
		max = config.max || 24,
		text = trim(config.text),
		fontSize = max;
	do {
		font = config.font.replace(/\d+px/, fontSize + "px");
		textWidth = getTextWidth(text, font);
	} while (textWidth > space && fontSize !== min && fontSize--);
	return { textWidth, fontSize, overflowing: textWidth > space };
}

export default fontFit;
