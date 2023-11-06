import * as esbuild from "esbuild";
import * as fs from "fs/promises";

function createBundle(name) {
	return fs.writeFile(`dist/${name}.bundle.js`, `__vendor("${name}")`);
}

await esbuild.build({
	entryPoints: ["src/vendors.js"],
	bundle: true,
	minify: true,
	target: "es6",
	treeShaking: true,
	define: {
		"process.env.NODE_ENV": '"production"',
	},
	outfile: "dist/vendors.js",
});

await Promise.all([createBundle("app"), createBundle("dial-activity")]);

console.log("complete!");
