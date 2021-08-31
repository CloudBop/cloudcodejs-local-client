import { useBoundActions } from "../hooks/use-bound-action";

interface ICellActionBarProps {
  id: string;
}

const CellActionBar: React.FC<ICellActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useBoundActions();

  // todo - refactored into ActionButton({variant: arrow-down})
  return (
    <div>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        onClick={() => moveCell(id, "down")}
        className="button is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        onClick={() => deleteCell(id)}
        className="button is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default CellActionBar;
