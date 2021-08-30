import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsReducerState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsReducerState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce(
  // immer allows 'mutable' state syntax
  (
    state: CellsReducerState = initialState,
    action: Action
  ): CellsReducerState | void => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        //using immer, return can be undefined
        //...but TS will typecheck state as [ ... | undefined ]
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        //...but TS will typecheck state as [ ... | undefined ]
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        //
        const idx = state.order.findIndex((id) => id === action.payload.id);
        const targetIdx = direction === "up" ? idx - 1 : idx + 1;
        const oobound = targetIdx < 0 || targetIdx > state.order.length - 1;
        if (oobound)
          //...but TS will typecheck state as [ ... | undefined ]
          return state;
        //swap cells
        state.order[idx] = state.order[targetIdx];
        state.order[targetIdx] = action.payload.id;
        //...but TS will typecheck state as [ ... | undefined ]
        return state;
      case ActionType.INSERT_CELL_BEFORE: {
        const newCell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: "",
        };
        state.data[newCell.id] = newCell;
        const idx = state.order.findIndex((id) => id === action.payload.id);
        if (idx < 0) state.order.push(newCell.id);
        else state.order.splice(idx, 0, newCell.id);
        //...but TS will typecheck state as [ ... | undefined ]
        return state;
      }
      default:
        return state;
    }
  }
);

//
const randomId = () => Math.random().toString(36).substr(2, 5);

export default cellsReducer;
