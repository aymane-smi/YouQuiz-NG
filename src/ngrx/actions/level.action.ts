import { createAction, props } from "@ngrx/store";
import { Level } from "src/app/models/interfaces/Level";

export const addLevel = createAction("[Main Component] add", props<{payload: Level}>());
export const initLevels = createAction("[Main Component] init", props<{payload: Level[]}>());
