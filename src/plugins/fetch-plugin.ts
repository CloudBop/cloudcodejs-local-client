import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      //build
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            // contents: `
            //   import message from 'tiny-test-pkg';
            //   console.log(message);
            // `,
            contents: inputCode,
          };
        } else {
          // check cache for this file
          const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
            args.path
          );
          if (cachedResult) return cachedResult;
          //
          const { data, request } = await axios.get(args.path);

          // match.regex file suffix is .css
          const fileType = args.path.match(/.css$/) ? "css" : "jsx";

          //sanitise css - breaks on fontfiles, @import, url(). good enough for app purposes
          const escaped = data
            // remove newlines
            .replace(/\n/g, "")
            // escape dble quotes
            .replace(/"/g, '\\"')
            // escape single quotes
            .replace(/'/g, "\\'");

          const contents = // if css then append the string via JSDOM
            // hacky way to get around that esbuild doesn't account for wasm in browser for css loaders
            // but it works!
            fileType === "css"
              ? `
              const style = document.createElement('style');
              style.innerText = '${escaped}';
              document.head.appendChild(style);
            `
              : data;

          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents: contents,
            resolveDir: new URL(
              // chops off the /.index.js
              "./",
              //pathname to last file eg. some-library-url/src/
              request.responseURL
            ).pathname,
          };

          await fileCache.setItem(args.path, result);
          return result;
        }
      });
    },
  };
};
