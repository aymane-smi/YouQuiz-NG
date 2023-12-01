import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { AddLevelResponse } from 'src/interfaces/AddLevelResponse';
import { Level } from 'src/interfaces/Level';
import { LevelResponse } from 'src/interfaces/LevelResponse';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private levels: Level[] = [];
  constructor(private http:HttpClient) { }

  addLevel(level:Level): Observable<AddLevelResponse>{
    return this.http.post<AddLevelResponse>(`${this.url}/level`, level, this.httpOptions);
  }

  getLevels():Observable<LevelResponse>{
    return this.http.get<LevelResponse>(`${this.url}/level`).pipe(tap((response : any) =>{
      this.levels = response.levels;
      console.log(response.message);
    }));
  }
}
