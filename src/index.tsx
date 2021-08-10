import { useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const refWasm = useRef<any>();

  const startService = async () => {
    refWasm.current = await esbuild.startService({
      worker: true,
      // our binary lives here
      wasmURL: "/esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!refWasm.current) return; // escape
    // access wasm API
    const result = await refWasm.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    }); // {code, map, error:[]}
    // console.log(`result`, result);
    setCode(result.code);
  };

  useEffect(() => {
    startService();
    // return () => {} //cleanup
  }, []);

  return (
    <div>
      <textarea
        name=""
        id=""
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        // htmlCols="30" htmlRows="10"
        style={{ maxWidth: "99%", height: "99%" }}
      ></textarea>
      <div>
        <button
          onClick={() => {
            onClick();
            setCode(input);
          }}
        >
          Transpile
        </button>
      </div>

      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
