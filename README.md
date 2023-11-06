# deciphered-launcher

- attempt to deobfuscate/debundle the 8110 launcher
- I manually rewrote the code to become es6

## How to use

1. run `build.js` or use the already made bundles found in `/dist`
2. in your launcher's `application.zip`, replace the files inside launcher's `/dist` folder with the files in the repo

## What can be done

1. find open-source versions of the code
2. use the code as a reference for creating Launcher apps
3. use the code as a reference for using KaiOS APIs
4. Optimize the Launcher app with ease
5. prettify the code even more, use proper filenames and folders
6. try making @preact/legacy-compat work (spoiler alert: the preact compat layers for React v15 doesn't work very well? it just does not want to work, string refs become buggy)

## Comparison

- Original File Size: 354.9kB
- Deciphered Version: 292.1kB
