import { ActionType } from "../action-types";
import {
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";

export const updateCell = (): UpdateCellAction => ({});
export const deleteCell = (): DeleteCellAction => ({});
export const insertCellBefore = (): InsertCellBeforeAction => ({});
export const moveCell = (): MoveCellAction => ({});
