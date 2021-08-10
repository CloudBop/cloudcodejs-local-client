import { useEffect, useState } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      // our binary lives here
      wasmURL: "/esbuild.wasm",
    });
    // access wasm API
    console.log(service);
  };

  const onClick = (): void => {
    console.log(`input`, input);
  };

  useEffect(() => {
    //
    startService();
    //
    // return () => {
    // }
  }, []);

  return (
    <div>
      <textarea
        name=""
        id=""
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        // htmlCols="30" htmlRows="10"
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
