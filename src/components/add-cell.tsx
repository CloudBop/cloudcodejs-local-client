import { useBoundActions } from "../hooks/use-bound-action";
import "./add-cell.css";

interface IAddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<IAddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useBoundActions();
  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, "code")}>
        Add Code
      </button>
      <button onClick={() => insertCellBefore(nextCellId, "text")}>
        Add MD
      </button>
    </div>
  );
};

export default AddCell;
