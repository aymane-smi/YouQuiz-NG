import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { AddLevelResponse } from 'src/app/models/interfaces/AddLevelResponse';
import { AddSubjectResponse } from 'src/app/models/interfaces/AddSubjectResponse';
import { LevelResponse } from 'src/app/models/interfaces/LevelResponse';
import { Subject } from 'src/app/models/interfaces/Subject';
import { SubjectResponse } from 'src/app/models/interfaces/SubjectResponse';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private subjects: Subject[] = [];
  private subject: Subject| null = null;
  constructor(private http:HttpClient) { }

  addSubject(subject:Subject): Observable<AddSubjectResponse>{
    return this.http.post<AddSubjectResponse>(`${this.url}/subject`, subject, this.httpOptions);
  }

  getSubject():Observable<SubjectResponse>{
    return this.http.get<SubjectResponse>(`${this.url}/subject`).pipe(tap((response : any) =>{
      this.subjects = response.subjects;
      console.log(response.message);
    }));
  }

  getSubjects():Observable<SubjectResponse>{
    return this.http.get<SubjectResponse>(`${this.url}/subject`);
  }

  editSubject(id: number, subject:Subject):Observable<Subject>{
    return this.http.put<Subject>(`${this.url}/subject/${id}`, subject, this.httpOptions).pipe(tap((response : any) =>{
      this.subjects = response.subjects;
      console.log(response.message);
    }));
  }

  getSubjectById(id: number){
    return this.http.get<Subject>(`${this.url}/subject/${id}`).pipe(tap((response : any) =>{
      this.subjects = response.subject;
      console.log(response.message);
    }));
  }
}
