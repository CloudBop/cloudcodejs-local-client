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
