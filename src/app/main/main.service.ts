import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LevelResponse } from 'src/app/models/interfaces/LevelResponse';
import { Observable, tap } from 'rxjs';
import { SubjectResponse } from 'src/app/models/interfaces/SubjectResponse';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  getLevels():Observable<LevelResponse>{
    return this.http.get<LevelResponse>(`${this.url}/level`).pipe(tap(response =>{
      console.log(response.message);
    }));
  }

  getSubjects(): Observable<SubjectResponse>{
    return this.http.get<SubjectResponse>(`${this.url}/subject`).pipe(
      tap(subject => {
        console.log(subject.message);
      })
    );
  }

  deleteLevel(id: number): void{
    this.http.delete(`${this.url}/level/${id}`).subscribe();
  }

  deleteSubject(id: number): void{
    this.http.delete(`${this.url}/subject/${id}`).subscribe();
  }

}
