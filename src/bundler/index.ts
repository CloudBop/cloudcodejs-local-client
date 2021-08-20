import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

// type
let service: esbuild.Service;

export default async function esbuildAbstract(rawCodeInput: string) {
  if (!service) {
    await esbuild.startService({
      worker: true,
      // our binary lives here
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  // access wasm API
  // const result = await refWasm.current.transform(input, {
  //   loader: "jsx",
  //   target: "es2015",
  // }); // {code, map, error:[]}

  const result = await service.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCodeInput)],
    define: {
      "process.env.NODE_ENV": '"production"',
      // webpack also does something similar, setting global
      global: "window",
    },
  });

  return result.outputFiles[0].text;
}
