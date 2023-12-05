import { createReducer, on } from "@ngrx/store"
import { Quiz } from "src/interfaces/Quiz"
import { createQuiz, initDialog } from "../actions/quiz.action"

export interface stateInterface{
  quiz: Quiz|null,
  dialogRef: any
}

export const initialState:{
  quiz: Quiz|null,
  dialogRef: any
} = {
  quiz: null,
  dialogRef: null
}

export const quizReducer = createReducer(initialState,
  on(createQuiz, (state: stateInterface, {quiz}) => ({dialogRef: null, quiz})),
  on(initDialog, (state: stateInterface, {dialogRef}) => {
    console.log(dialogRef);
    return {quiz: null, dialogRef}
  })
);
