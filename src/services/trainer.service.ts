import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Trainer } from "src/app/models/interfaces/Trainer";

@Injectable({
  providedIn: 'root'
})

export class TrainerService{
  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  getTrainers(): Observable<Trainer[]>{
    return this.http.get<Trainer[]>(`${this.url}/trainers`);
  }
}
