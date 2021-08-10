import { useState } from "react";

import ReactDOM from "react-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = (): void => {
    console.log(`input`, input);
  };

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
