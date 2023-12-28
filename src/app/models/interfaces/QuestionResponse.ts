import { questionType } from "../enums/questionType";
import { Response } from "./Response";

export interface QuestionResponse{
  id:Number,
  responseNbr: Number,
  correctResponseNbr: Number,
  questionText: String,
  questiontype: questionType,
  totalScore: Number,
  subject_id: Number,
  level_id: Number,
  quiz_id: Number,
  duration?: Number,
  medias: Object[],
  isCreated?: Boolean,
  responses?: Response[]
}
