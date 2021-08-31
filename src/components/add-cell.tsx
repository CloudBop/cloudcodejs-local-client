import { useBoundActions } from "../hooks/use-bound-action";
import "./add-cell.css";

interface IAddCellProps {
  nextCellId: string | null;
  // default to false
  forceVisible?: boolean;
}

const AddCell: React.FC<IAddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellAfter } = useBoundActions();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-btns">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(nextCellId, "code")}
        >
          <span className="icon is-smaall">
            <i className="fas fa-plus"></i>
          </span>
          <span>Add Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(nextCellId, "text")}
        >
          <span className="icon is-smaall">
            <i className="fas fa-plus"></i>
          </span>
          <span>Add Markdown</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
