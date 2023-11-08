/**
 * @module ManifestHelper
 * @description seems to be taken from
 * @link https://github.com/mozilla-b2g/gaia/blob/450c7a0f88d3511df0aa9c086a20994a813e3b4e/shared/js/manifest_helper.js
 */

// warning: this seems to be different compared to the link above
// helper function, bound to manifest and property name in constructor
function ManifestHelper_get(prop) {
	var manifest = this,
		value = manifest[prop],
		lang = navigator.mozL10n.language.code || "",
		defaultLang = manifest.default_locale || "";

	if (lang in navigator.mozL10n.qps && ("name" === prop || "description" === prop || "short_name" === prop)) {
		value = navigator.mozL10n.qps[navigator.language].translate(value);
	} else if (manifest.locales) {
		[lang, lang.substr(0, lang.indexOf("-")), defaultLang, defaultLang.substr(0, lang.indexOf("-"))].some(function (lang) {
			// this === manifest.locales
			if (this[lang] && this[lang][prop]) {
				value = this[lang][prop];
				// aborts [].some
				return true;
			}
		}, manifest.locales);
	}

	"object" !== ("undefined" == typeof value ? "undefined" : a(value)) || value instanceof Array || (value = new ManifestHelper(value));

	return value;
}

/**
 * Helper object to access manifest information with locale support.
 *
 * @constructor
 * @param {Object} manifest The app manifest.
 */
function ManifestHelper(manifest) {
	// Bind getters for the localized property values.
	for (var prop in manifest) {
		Object.defineProperty(this, prop, {
			get: ManifestHelper_get.bind(manifest, prop),
			enumerable: true,
		});
	}
}

var a =
	"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
		? function (e) {
				return typeof e;
		  }
		: function (e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		  };

Object.defineProperty(ManifestHelper.prototype, "displayName", {
	get: function () {
		return this.short_name || this.name;
	},
});

export default ManifestHelper;
