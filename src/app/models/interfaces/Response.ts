export interface Response {
  responses: {
    id?:Number,
    position:Number,
    response: String,
    question_id: Number,
    point:Number
  }[],
  message: string,
}
