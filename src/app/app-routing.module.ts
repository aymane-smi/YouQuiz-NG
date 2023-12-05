import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizMainComponent } from './quiz-main/quiz-main.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {path: "trainer", component: MainComponent, title: "Dashbaord",data: {title: "Dashboard"}, pathMatch: "full"},
  {path: "", redirectTo: "/trainer", title: "Trainer", pathMatch: "full"},
  {path: "quiz", component: QuizMainComponent, title: "Quiz Dashbaord", data: {title: "Quiz Dashboard"}, pathMatch: "full"},
  {path: "quiz/:id", component: QuizComponent, title: "Quiz" ,data: {title: "Quiz"}},
  {path: "**", component: NotFoundComponent, title: "Not Found", data: {title: "Not Found"}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
