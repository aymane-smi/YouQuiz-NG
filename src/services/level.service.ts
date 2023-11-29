import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Level } from 'src/interfaces/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  addLevel(level:Level): Observable<Level>{
    return this.http.post<Level>(`${this.url}/level`, level, this.httpOptions,);
  }
}
