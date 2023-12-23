export interface CostumeQuiz{
  id?: number,
  score:number,
  showAnswers: boolean,
  showFinalResults: boolean,
  chanceNbr: number,
  durationInMinutes: number,
  remark: string,
  trainer_id?: number,
  subject_id?: number,
  color: string
};
