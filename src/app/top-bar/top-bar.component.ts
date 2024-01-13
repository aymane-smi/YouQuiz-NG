import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faCircleArrowUp, faFolderTree, faFileCircleQuestion, faPersonCirclePlus, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../material/level-create-dialog/dialog.component';
import { DialogComponent as  subjectDialog} from '../material/subject-create-dialog/subject-dialog.component';
import { LevelStateService } from 'src/services/level-state-service.service';
import { AppService } from 'src/services/app-service.service';
import { SubjectStateService } from 'src/services/subject-state-service.service';
import { QuizDialogComponent } from '../material/quiz-create-dialog/dialog.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { stateInterface } from 'src/ngrx/reducers/quiz.reducer';
import { Store } from '@ngrx/store';
import { initDialog } from 'src/ngrx/actions/quiz.action';
import { AssignDialogComponent } from '../material/assign-dialog/assign-dialog.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  faUp = faCircleArrowUp;
  faFolder = faFolderTree;
  faQuestion = faFileCircleQuestion;
  faPerson = faPersonCirclePlus;
  faCircle = faCircleInfo;
  menuToggle: Boolean = false;
  showQuizz: Boolean = false;
  quizBtn: Number = 1;

  constructor(public dialog: MatDialog,
    private levelState: LevelStateService,
    private subjectState: SubjectStateService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router:Router,
    private store: Store<{quiz: stateInterface}>){}
  toggle(): void{
    this.menuToggle = !this.menuToggle;
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if(this.getPageTitle() === 'Quiz Dashboard')
        this.quizBtn = 2;
      else if(this.getPageTitle() === 'Quiz')
        this.quizBtn = 3;
      else
        this.quizBtn = 1;
      console.log(this.quizBtn, this.getPageTitle());

    });
  }

  getPageTitle(): string {
    let currentRoute = this.route;

    while (currentRoute.children.length > 0) {
      currentRoute = currentRoute.children[0];
    }

    const pageTitle = currentRoute.snapshot.data['title'];
    return pageTitle;
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false	});
    this.levelState.setState(dialogRef);
    dialogRef.afterClosed().subscribe(data => this.appService.level(data.data));
  }

  openDialogSubject(){
    let dialogRef = this.dialog.open(subjectDialog, {enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false	});
    this.subjectState.setState(dialogRef);
    dialogRef.afterClosed().subscribe(data => this.appService.subject("create", data.data));
  }

  openDialogQuiz(){
    let dialogRef = this.dialog.open(QuizDialogComponent, {enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false	});
    this.store.dispatch(initDialog({dialogRef}));
  }
  openAssignDialog(){
    let dialogRef = this.dialog.open(AssignDialogComponent, {enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false	});
  }
  openInfoSheet(){}
}
