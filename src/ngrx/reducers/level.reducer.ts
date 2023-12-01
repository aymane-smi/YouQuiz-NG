import { createReducer, on } from "@ngrx/store";
import { addLevel, initLevels } from "../actions/level.action";
import { Level } from "src/interfaces/Level";

export const initialState:Level[] = [];

export const levelReducer = createReducer(
  initialState,
  on(addLevel, (state, {payload}) => {
    state.push(payload)
    return state;
  }),
  on(initLevels, (state, {payload})=> payload)
);
