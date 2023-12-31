import { Component } from '@angular/core';
import { Quiz } from 'src/app/models/interfaces/Quiz';
import { QuizMainService } from './quiz-main.service';
import { CostumeQuiz } from 'src/app/models/interfaces/CostumeQuiz';
import { stateInterface } from 'src/ngrx/reducers/quiz.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-main',
  templateUrl: './quiz-main.component.html',
  styleUrls: ['./quiz-main.component.scss']
})
export class QuizMainComponent {

  quizzes: CostumeQuiz[] = [];
  quiz$: Observable<stateInterface>;

  constructor(private quizService: QuizMainService, private store: Store<{quiz: stateInterface}>){
    this.quiz$ = this.store.select('quiz');
    this.quiz$.subscribe((quiz)=>{
      if(quiz.quiz != null){
        const randomHex = `#${[...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        let costumeQuiz:any = {...quiz.quiz, color: randomHex};
        this.quizzes.push(costumeQuiz);
      }
    });
  }

  ngOnInit(){
    this.quizService.getQuizzes().subscribe(quizzes => {
      console.log("quizzes length:"+quizzes.length);
      for(let quiz of quizzes){
        const randomHex = `#${[...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        this.quizzes.push(<CostumeQuiz>{...quiz, color: randomHex})
      }
    });
  }

}
