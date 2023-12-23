export interface Quiz{
  id?: number,
  score:number|undefined,
  showAnswers: boolean,
  showFinalResults: boolean,
  chanceNbr: number,
  durationInMinutes: number,
  remark: string,
  trainer_id: number,
  subject_id: number
};
