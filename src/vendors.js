window.__vendor = function (e) {
	if (e === "app") {
		import("./app.js");
	}
	if (e === "dial-activity") {
		import("./dial-activity.js");
	}
};
