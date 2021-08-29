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
        return;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return;
      case ActionType.MOVE_CELL:
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        return state;

      default:
        return state;
    }
  }
);

export default cellsReducer;
