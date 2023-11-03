function unescapeNumericHTMLEntities(e) {
	return e.replace(numericEntityRegExp, function (e, t) {
		return "x" === t.charAt(0).toLowerCase() ? String.fromCharCode(parseInt(t.substring(1), 16)) : String.fromCharCode(parseInt(t.substring(0), 10));
	});
}

var numericEntityRegExp = /&#([a-z0-9]+);/gi;

export { numericEntityRegExp, unescapeNumericHTMLEntities };
