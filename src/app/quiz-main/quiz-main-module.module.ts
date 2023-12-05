import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizMainComponent } from './quiz-main.component';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [QuizMainComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    RouterModule
  ]
})
export class QuizMainModule { }
