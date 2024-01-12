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
    return this.http.post<QuizResponse>(`${this.url}`, response, this.httpOptions);
  }

  updateResponse(id:Number, response:QuizResponse):Observable<QuizResponse>{
    return this.http.put<QuizResponse>(`${this.url}/${id}`, response, this.httpOptions);
  }
  DeleteResponse(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  handleResponse(form: FormGroup, questionId:Number):QuizResponse[]{
    const responses:QuizResponse[] = [];
    for(let index of [1,2,3,4]){
      let key:string = "response"+index;
      if(form.controls[key].value !== ""){
        let obj:QuizResponse = {
          question_id: questionId,
          point: form.controls["point"+index].value,
          position: form.controls["position"+index].value,
          response: form.controls["response"+index].value,
        }
        if(form.controls["id"+index].value == 0){
          console.log("add response");
          this.createResponse(obj).subscribe(result => {
            form.controls["id"+index].setValue(result.response.id);
          }, err => {
            throw new Error(err.error.error)
          });
        }
        else if(form.controls["response"+index].value !== ""){
          console.log("update response");
          obj.id = form.controls["id"+index].value
          this.updateResponse(form.controls["id"+index].value, obj).subscribe(result => {
            console.log("warah drt update");
            // responses.map( response =>{
            //   if(response.id === result.id)
            //     return result;
            //   return response;
            // }
          }, err =>{
            throw new Error(err.error.error)
          });
        }

      }else if(form.controls["id"+index].value != 0 && form.controls["response"+index].value == ""){
          console.log("delete response");
          this.DeleteResponse(form.controls["id"+index].value).subscribe(result => {
            form.controls["id"+index].setValue(0);
            form.controls["point"+index].setValue(0);
            form.controls["response"+index].setValue('');
          }, err =>{
            console.log(err.error);
            throw new Error(err.error.error)
          });
        }
    }
    return responses;
  }
}
