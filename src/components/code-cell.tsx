import { useState, useEffect } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./code-preview";
import Resizable from "./resizable";
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  // const onClick = async () => {
  //   const output = await bundle(input);
  //   setCode(output);
  // };

  useEffect(() => {
    let timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      // offMount|rerender
      clearTimeout(timer);
    };
  }, [input]);

  console.log(`err`, err);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "100%",
          // width: "100%",
          display: "flex",
          flexDirection: "row",
          minWidth: "300px",
        }}
      >
        <Resizable direction={"horizontal"}>
          <CodeEditor
            initialValue={"const a = 1;"}
            onChange={(value): void => setInput(value)}
          />
        </Resizable>
        <Preview code={code} bundlingError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
