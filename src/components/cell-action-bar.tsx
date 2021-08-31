import { useBoundActions } from "../hooks/use-bound-action";

interface ICellActionBarProps {
  id: string;
}

const CellActionBar: React.FC<ICellActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useBoundActions();
  return (
    <div>
      <button onClick={() => moveCell(id, "up")}>Up</button>
      <button onClick={() => moveCell(id, "down")}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </div>
  );
};

export default CellActionBar;
