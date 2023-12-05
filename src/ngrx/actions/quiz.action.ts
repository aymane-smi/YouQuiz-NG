import { createAction, props } from "@ngrx/store";
import { Quiz } from "src/interfaces/Quiz";

export const createQuiz = createAction("[quiz component] create quiz", props<{quiz:Quiz}>());
export const initDialog = createAction("[quiz component] init dialogRef", props<{dialogRef: any}>());
