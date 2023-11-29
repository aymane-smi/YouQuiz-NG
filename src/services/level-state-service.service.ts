import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelStateService {
  private DialogRef$: BehaviorSubject<any>;
  constructor() {
    this.DialogRef$ = new BehaviorSubject<any>(null);
  }

  getState(): any{
    console.log("get value");
    return this.DialogRef$.getValue();
  }

  setState(ref: any): void{
    console.log("set value");
    this.DialogRef$.next(ref);

  }

}
