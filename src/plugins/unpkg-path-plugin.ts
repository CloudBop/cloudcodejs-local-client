import * as esbuild from "esbuild-wasm";
import axios from "axios";
/**
 * Overrule esbuild when it tries to resolve/load npm libs
 * @returns {
 *    warnings: [],
 *    outputfiles:[{
 *      contents: Uint8Array(n) […]
 *      path: "<stdout>"
 *      text: "escaped? /nJS"
 *      get_text();
 *     }]
 * }
 */
export const unpkgPathPlugin = () => {
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
          } else if (args.path === "tiny-test-pkg") {
            // find the lib
            return {
              path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js",
              namespace: "a",
            };
          }
        }
      );
      //
      //transpile
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        } else {
          const { data } = await axios.get(args.path);
          return {
            loader: "jsx",
            contents: data,
          };
        }
      });
    },
  };
};
