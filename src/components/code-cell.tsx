import { useEffect } from "react";
// import bundle from "../bundler";
import { useBoundActions } from "../hooks/use-bound-action";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Cell } from "../reduxStore";
import CodeEditor from "./code-editor";
import Preview from "./code-preview";
import Resizable from "./resizable";

interface ICodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useBoundActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  // const [code, setCode] = useState("");
  // const [err, setErr] = useState("");
  console.log(bundle);
  useEffect(() => {
    let timer = setTimeout(async () => {
      // thunk fires async actions
      await createBundle(cell.id, cell.content);
    }, 1000);

    return () => {
      // offMount|rerender
      clearTimeout(timer);
    };
    // if in render phase or as props
  }, [cell.id, cell.content]);

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
        {bundle && <Preview code={bundle.code} bundlingError={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
