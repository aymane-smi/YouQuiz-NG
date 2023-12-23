import { Component } from '@angular/core';
import { faCircleExclamation, faGear } from '@fortawesome/free-solid-svg-icons';
import { MainService } from './main.service';
import { Level } from 'src/app/models/interfaces/Level';
import { Subject } from 'src/app/models/interfaces/Subject';
import { MatButtonModule } from '@angular/material/button';
import { LevelStateService } from 'src/services/level-state-service.service';
import { AppService } from 'src/services/app-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDialogUpdateComponent } from '../material/subject-update-dialog/subject-dialog-update.component';
import { SubjectStateService } from 'src/services/subject-state-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent{

  constructor(private mainService: MainService,
    private levelStateService:LevelStateService,
    private appService: AppService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private subjectState: SubjectStateService,){
    this.appService.level$.subscribe(level => this.levels.push(level));
    this.appService.subject$.subscribe(response => {
      if(response.type === "create")
        this.subjects.push(response.subject)
      else if(response.type === "update"){
        this.subjects = this.subjects.map(subject => {
          if(subject.id == response.subject.subject?.id)
            subject.title = response.subject.subject?.title;
          return subject;
        });
      }
    });
  }
  faExclamation = faCircleExclamation;
  faGear_ = faGear;
  logoSvg = "https://assets-cdn.kahoot.it/builder/v2/assets/icn-live-game-00869c8b.svg";
  bannerImg = "https://kahoot.com/files/2019/02/KahootPlusPro_MobileChallenges.png";
  levels: Level[] = [];
  subjects: Subject[] = [];

  ngOnInit(): void{
    this.getLevels();
    this.getSubjects();
    //this.levels.push(this.levelStateService.getState());
  }

  getLevels(): void{
    this.mainService.getLevels().subscribe(levels => this.levels = levels.levels);
  }

  getSubjects(): void{
    this.mainService.getSubjects().subscribe(subjects => this.subjects = subjects.subjects);
  }

  deleteLevel(id: number): void{
    this.mainService.deleteLevel(id);
    this.levels = this.levels.filter(level => level.id != id);
    this._snackBar.open("level deleted with success", "close", {duration: 1000})
  }

  deleteSubject(id: number): void{
    this.mainService.deleteSubject(id);
    this.subjects = this.subjects.filter(subject => subject.id != id);
    this._snackBar.open("subject deleted with success", "close", {duration: 1000})
  }

  openSubjectDialog(id:number) {
    let dialogRef = this.dialog.open(SubjectDialogUpdateComponent, {enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false, data: 	{id}});
    this.subjectState.setState(dialogRef);
    dialogRef.afterClosed().subscribe(data => {
      this.appService.subject("update", data.data);
      this._snackBar.open("subject updated with success", "close", {duration: 1000})
    });
  }
}
