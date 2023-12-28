import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionResponse } from 'src/app/models/interfaces/QuestionResponse';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  getQuestionByQuiz(id:Number):Observable<QuestionResponse[]>{
    return this.http.get<QuestionResponse[]>(`${this.url}/quiz/${id}/questions`);
  }
}
