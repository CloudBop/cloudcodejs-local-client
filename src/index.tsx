import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";
import Preview from "./components/code-preview";
const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const refWasm = useRef<any>();

  const startService = async () => {
    refWasm.current = await esbuild.startService({
      worker: true,
      // our binary lives here
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!refWasm.current) return; // escape
    // access wasm API
    // const result = await refWasm.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // }); // {code, map, error:[]}

    const result = await refWasm.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        // webpack also does something similar, setting global
        global: "window",
      },
    });

    // interesting results here
    // console.log(`result`, result);
    setCode(result.outputFiles[0].text);
  };

  useEffect(() => {
    startService();
    // return () => {} //cleanup
  }, []);

  return (
    <div>
      <CodeEditor
        initialValue={"const a = 1;"}
        onChange={(value): void => setInput(value)}
      />
      <div>
        <button
          onClick={() => {
            onClick();
            // setCode(input);
          }}
        >
          Transpile
        </button>
        <pre>{code}</pre>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
