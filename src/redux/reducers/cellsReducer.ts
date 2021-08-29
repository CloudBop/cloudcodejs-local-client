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

export function cellsReducer(
  state: CellsReducerState,
  action: Action
): CellsReducerState {
  return state;
}

export default cellsReducer;
