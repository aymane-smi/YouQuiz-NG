import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LevelResponse } from 'src/interfaces/LevelResponse';
import { Observable, tap } from 'rxjs';

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
      console.log(response);
    }));
  }


}
