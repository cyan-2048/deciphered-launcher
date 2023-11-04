import * as esbuild from "esbuild";

console.log(
	await esbuild.build({
		entryPoints: ["modules/app.js"],
		bundle: true,
		minify: true,
		target: "es6",
		treeShaking: true,
		define: {
			"process.env.NODE_ENV": '"production"',
		},
		outfile: "dist/app.bundle.js",
	})
);
