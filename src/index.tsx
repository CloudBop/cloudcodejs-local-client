import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import bundle from "./bundler";
import ReactDOM from "react-dom";
import CodeEditor from "./components/code-editor";
import Preview from "./components/code-preview";
const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

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
