import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuizResponse } from 'src/app/models/interfaces/QuizResponse';
import { Response } from 'src/app/models/interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private url = 'http://localhost:8080/api/response';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) {}

  createResponse(response: QuizResponse):Observable<any>{
    console.log("create response");
    return this.http.post<QuizResponse>(`${this.url}`, response, this.httpOptions);
  }

  handleResponse(form: FormGroup, questionId:Number):Response[]{
    const responses:Response[] = [];
    for(let index of [1,2,3,4]){
      let key:string = "response"+index;
      if(form.controls[key].value !== ""){
        let obj:QuizResponse = {
          question_id: questionId,
          point: form.controls["point"+index].value,
          position: form.controls["position"+index].value,
          response: form.controls["response"+index].value,
        }
        this.createResponse(obj).subscribe(result => responses.push(result));
      }
    }
    return responses;
  }
}
