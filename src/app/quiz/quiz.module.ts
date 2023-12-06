import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [QuestionComponent, QuizComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class QuizModule { }
