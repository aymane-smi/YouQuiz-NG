export interface AddLevelResponse {
  level: {
    id: number,
    description: string,
    maxScore: number,
    minScore: number
  },
  message: string
}
