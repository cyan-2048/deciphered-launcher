# deciphered-launcher

attempt to deobfuscate/debundle the 8110 launche
I manually rewrote the code to es6

## How to use

1. run `build.js` or use the bundles found in `/dist`
2. in your launcher `application.zip`, replace `/dist/app.bundle.js`
3. in the launcher's `/index.html` get rid of the line `<script defer="" src="dist/vendors.js"></script>`

the 3rd option is currently temporary, the `vendors.js` file will no longer be needed once we complete the deobfuscating/debundling/demangling/prettifying of the `dial-activity.js` file.

## What can be done

1. find open-source versions of the code
2. use the code as a reference for creating Launcher apps
3. use the code as a reference for using KaiOS APIs
4. Optimize the Launcher app with ease
5. prettify the code even more, use proper filenames and folders
6. try making @preact/legacy-compat work (spoiler alert: the preact compat layers for React v15 doesn't work very well? it just does not want to work, string refs become buggy)
