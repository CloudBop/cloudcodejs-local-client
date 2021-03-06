import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
const CellList: React.FC = () => {
  // const cells= useTypedSelector((state) => state);
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  // fun hack for fooling react to rerender last element as new
  // renderCells.push(
  //   <AddCell
  //     key={Math.random()}
  //     forceVisible={cells.length === 0}
  //     nextCellId={null}
  //   />
  // );

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderCells}
    </div>
  );
};

export default CellList;
