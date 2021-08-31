import { useEffect } from "react";
// import bundle from "../bundler";
import { useBoundActions } from "../hooks/use-bound-action";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Cell } from "../reduxStore";
import CodeEditor from "./code-editor";
import Preview from "./code-preview";
import Resizable from "./resizable";
import "./code-cell.css";
interface ICodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useBoundActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const cumulativeCode = [
      // global - bundle _React - esbuild will tree shake out duplicate react imports
      `
      import _React from 'react'
      import _ReactDOM from 'react-dom'
        const show = (value)=>{
          const root = document.querySelector('#root')

          if(typeof value === "object"){

            if(value.$$typeof&& value.props){
              _ReactDOM.render(value, root)
            } else {
              root.innerHTML = JSON.stringify(value)
            }

          } else{
            root.innerHTML = value;
          }
        }
      `,
    ];

    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      //
      if (c.id === cell.id) break;
    }
    return cumulativeCode;
  });

  useEffect(() => {
    // including [bundle] will cause infinite loop... ignore exhastive deps
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      // on inital load ignore first setTimeout.
      return;
    }

    let timer = setTimeout(async () => {
      // thunk fires async actions
      await createBundle(cell.id, cumulativeCode.join("\n"));
    }, 1000);

    return () => {
      // offMount|rerender
      clearTimeout(timer);
    };
    // if in render phase or as props - ensure createBundle is memoed or will cause useEffect to fire every pass
    // eslint-disable-next-line
  }, [cell.id, cell.content, createBundle, cumulativeCode.join("\n")]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingError={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
