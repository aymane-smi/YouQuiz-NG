import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/interfaces/Question';
import { QuestionResponse } from 'src/app/models/interfaces/QuestionResponse';
import { QuizResponse } from 'src/app/models/interfaces/QuizResponse';
import { Response } from 'src/app/models/interfaces/Response';
import { TempoQuiz } from 'src/app/models/interfaces/TempoQuiz';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = 'http://localhost:8080/api/question';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  createQuestion(question: any):Observable<any>{
    return this.http.post<any>(`${this.url}`, question, this.httpOptions);
  }

  assignToQuiz(tempoQuiz:TempoQuiz):Observable<Object>{
    return this.http.post<TempoQuiz>(`${this.url}/${tempoQuiz.question_id}`, tempoQuiz, this.httpOptions);
  }

  getQuestionResponse(id:Number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/${id}/responses`);
  }

  updateQuiz(id:Number, question:QuestionResponse):Observable<QuestionResponse>{
    return this.http.put<QuestionResponse>(`${this.url}/${id}`, question, this.httpOptions);
  }

  updateQuestionDuration(id:Number, tempo:TempoQuiz):Observable<TempoQuiz>{
    return this.http.patch<TempoQuiz>(`${this.url}/${id}/editTime`, tempo, this.httpOptions);
  }

  deleteQuestion(id:Number):Observable<Object>{
    return this.http.delete(`${this.url}/${id}`);
  }

}
