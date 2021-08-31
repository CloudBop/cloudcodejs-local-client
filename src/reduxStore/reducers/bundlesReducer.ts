import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundleState = {};

const bundleReducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    return state;
  }
);
