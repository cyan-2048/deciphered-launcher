import * as esbuild from "esbuild";

function build(entry, name) {
	return esbuild.build({
		entryPoints: ["modules/" + entry],
		bundle: true,
		minify: true,
		target: "es6",
		treeShaking: true,
		define: {
			"process.env.NODE_ENV": '"production"',
		},
		outfile: "dist/" + name,
	});
}

await Promise.all([build("app.js", "app.bundle.js"), build("dial-activity.js", "dial-activity.bundle.js"), build("vendors.js", "vendors.js")]);
console.log("complete!");
