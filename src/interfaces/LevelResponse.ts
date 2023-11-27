export interface LevelResponse {
  levels: {
    id: number,
  description: string,
  maxScore: number,
  minScore: number
  }[],
  message: string
}
