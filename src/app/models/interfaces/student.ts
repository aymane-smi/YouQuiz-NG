import { User } from "./User";

export interface Student extends User{
  id?: Number,
  dateOfInscription: Date
}
