import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCheck, faClock, faFontAwesome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { questionType } from '../models/enums/questionType';
import { Subject } from '../models/interfaces/Subject';
import { Level } from '../models/interfaces/Level';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  faPlus_ = faPlus;
  faFont = faFontAwesome;
  faClock = faClock;
  faCheck = faCheck;
  selectedId = 0;
  questions = [1];

  form!: FormGroup;

  ngOnInit(){
    this.form = new FormGroup({
      questionText: new FormControl<String>(''),
      responseNbr: new FormControl<Number>(0),
      correctResponseNbr: new FormControl<Number>(0),
      type: new FormControl<questionType>(questionType.SINGLE),
      totalScore: new FormControl<Number>(0),
      subject: new FormControl<Subject|null>(null),
      level: new FormControl<Level|null>(null),
      duration: new FormControl<Number>(0)
    });
  }
  addNewQuestion(){
    this.questions.push(1);
  }

  deletOneQuestion(){
    if(this.questions.length > 1){
      this.questions.pop();
      this.selectedId = this.questions.length-1;
    }
  }

  selectedQuestion(id:number){
    this.selectedId = id;
  }

}
