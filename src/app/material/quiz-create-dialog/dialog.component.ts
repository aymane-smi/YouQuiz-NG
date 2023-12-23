import { Component } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuizMainService } from 'src/app/quiz-main/quiz-main.service';
import { Quiz } from 'src/app/models/interfaces/Quiz';
import { Subject } from 'src/app/models/interfaces/Subject';
import { Trainer } from 'src/app/models/interfaces/Trainer';
import { createQuiz } from 'src/ngrx/actions/quiz.action';
import { stateInterface } from 'src/ngrx/reducers/quiz.reducer';
import { SubjectService } from 'src/services/subject.service';
import { TrainerService } from 'src/services/trainer.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class QuizDialogComponent {
  constructor(private quizService: QuizMainService,
    private subjectService: SubjectService,
    private trainerService: TrainerService,
    private store: Store<{quiz: stateInterface}>){
      this.quiz$ = this.store.select('quiz');
    }
  form = new FormGroup({
    score: new FormControl(),
    showAnswers: new FormControl(),
    showFinalResults: new FormControl(),
    chanceNbr: new FormControl(),
    durationInMinutes: new FormControl(),
    remark: new FormControl(),
    trainer_id: new FormControl(1),
    subject_id: new FormControl(),
  });
  Subjects: Subject[] = [];
  Trainers: Trainer[] = [];
  quiz$: Observable<stateInterface>;

  ngOnInit(){
    this.subjectService.getSubject().subscribe(subjects => this.Subjects = subjects.subjects);
    this.trainerService.getTrainers().subscribe(trainers => this.Trainers = trainers);
  }
  onSubmit(): void{
    this.quizService.createQuizzes(<Quiz>this.form.getRawValue()).subscribe(quiz => {
      this.quiz$.subscribe(state => {
        // console.log("subscribe to quiz state");
        // console.table(state);
        //unsubscribe to fix the bug
        state.dialogRef.close();
      }).unsubscribe();
      this.store.dispatch(createQuiz({quiz}));
    });
  }
}
