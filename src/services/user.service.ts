import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //used for both student and trainer

  private urlStudent = 'http://localhost:8080/api/student';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  public getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(`${this.urlStudent}`);
  }

}
