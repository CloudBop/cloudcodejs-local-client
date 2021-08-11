import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});
//
// (async () => {
//   await fileCache.setItem("color", "red");
//   const color = await fileCache.getItem("color");
//   console.log(`color`, color);
// })();

/**
 * Overrule esbuild when it tries to resolve/load npm libs
 * @returns {
 *   warnings: [],
 *   outputfiles:[{
 *     contents: Uint8Array(n) […]
 *     path: "<stdout>"
 *     text: "escaped? /nJS"
 *     get_text();
 *   }]
 * }
 */
export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // override esbuilds default resolver. - typically local fs
      build.onResolve(
        {
          // regex against current filename (all)
          filter: /.*/,
        },
        //
        async (args: any) => {
          console.log("onResolve", args);
          if (args.path === "index.js") {
            return { path: args.path, namespace: "a" };
          }

          if (args.path.includes("./") || args.path.includes("../")) {
            return {
              namespace: "a",
              path: new URL(
                // ./utils || ../utils
                args.path,
                // relative path for current import
                // eg: https://unpkg.com/library-currently-build/src
                "https://unpkg.com" + args.resolveDir + "/"
              ).href, // trailling slash is super important!
              /**
               * without trail it will create url from root rootdomain/utils
               * as opposed to rootdomain/name-of-library/utils
               * ...try below
               * tiny-test-pkg | medium-test-pkg | nested-test-pkg
               */
            };
          }

          return {
            namespace: "a",
            path: `https://unpkg.com/${args.path}`,
          };
        }
      );
      //
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

          const { data, request } = await axios.get(args.path);
          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents: data,
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
