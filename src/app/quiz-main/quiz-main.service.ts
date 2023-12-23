import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/interfaces/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizMainService {

  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  createQuizzes(quiz:Quiz):Observable<Quiz>{
    return this.http.post<Quiz>(`${this.url}/quiz`, quiz, this.httpOptions);
  }

  getQuizzes():Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.url}/quiz`);
  }


}
