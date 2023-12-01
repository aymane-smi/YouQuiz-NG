export interface Subject{
  id: number,
  title: string,
  parent_id?: number
  childs?: Subject[],
  parent?: Subject,
  subject?: Subject
}
