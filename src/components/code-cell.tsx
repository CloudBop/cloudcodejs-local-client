import { useState, useEffect } from "react";
import bundle from "../bundler";
import { useBoundActions } from "../hooks/use-bound-action";
import { Cell } from "../reduxStore";
import CodeEditor from "./code-editor";
import Preview from "./code-preview";
import Resizable from "./resizable";

interface ICodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const { updateCell } = useBoundActions();
  // const [input, setInput] = useState("");

  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  // const onClick = async () => {
  //   const output = await bundle(input);
  //   setCode(output);
  // };

  useEffect(() => {
    let timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      // offMount|rerender
      clearTimeout(timer);
    };
  }, [cell.content]);

  console.log(`err`, err);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          // minus .add-cell ui margin
          height: "calc(100% - 10px)",
          // width: "100%",
          display: "flex",
          flexDirection: "row",
          minWidth: "300px",
        }}
      >
        <Resizable direction={"horizontal"}>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
