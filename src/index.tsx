import { useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const refWasm = useRef<any>();
  const refIframe = useRef<any>();

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
    // setCode(result.outputFiles[0].text);
    // console.log(refIframe.current);
    refIframe.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      // allow commincation from outter sources
      "*"
    );
  };

  useEffect(() => {
    startService();
    // return () => {} //cleanup
  }, []);

  const html = `
    <html>
      <head> </head>
      <body>
        <div id="root"> </div>
        <script>
        window.addEventListener('message', (event)=>{
          console.log(event)
          eval(event.data);
        }, false);
        </script>
      </body>
    </html>
  `;

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
            // setCode(input);
          }}
        >
          Transpile
        </button>
      </div>

      <pre>{code}</pre>

      <iframe
        ref={refIframe}
        // allows = "allow-same-origin" || "" | false - sandboxes from other JS scopes
        sandbox="allow-scripts"
        title="myiframe-example"
        srcDoc={html}
        // src="test.html"
        // frameBorder="0"
      ></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
