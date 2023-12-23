import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Level } from 'src/app/models/interfaces/Level';
import { Subject as ISubject} from 'src/app/models/interfaces/Subject';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private LevelSource =  new Subject<Level>();
  private SubjectSource = new Subject<{type: string, subject: ISubject}>();

  level$ = this.LevelSource.asObservable();
  subject$ = this.SubjectSource.asObservable();

  level(level: Level){
    this.LevelSource.next(level);
  }

  subject(type: string, subject: ISubject){
    this.SubjectSource.next({type, subject});
  }
}
