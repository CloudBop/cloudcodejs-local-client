import { Cell } from "../reduxStore";
import CellActionBar from "./cell-action-bar";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") child = <CodeCell cell={cell} />;
  else child = <TextEditor cell={cell} />;

  return (
    <div className="cell-list-item">
      {child}
      <CellActionBar id={cell.id} />
    </div>
  );
};

export default CellListItem;
