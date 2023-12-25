import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faBookmark, faCheck, faClock, faFontAwesome, faLayerGroup, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { questionType } from '../models/enums/questionType';
import { Subject } from '../models/interfaces/Subject';
import { Level } from '../models/interfaces/Level';
import { SubjectService } from 'src/services/subject.service';
import { LevelService } from 'src/services/level.service';
import { Response } from '../models/interfaces/Response';

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
  faStar = faStar;
  faBookMark = faBookmark;
  faLayerGroup = faLayerGroup;
  selectedId = 0;
  questions = [1];
  subjects:Subject[] = [];
  levels:Level[] = [];

  form!: FormGroup;
  formQuestion!: FormGroup;

  constructor(private subjectservice:SubjectService, private levelService:LevelService){}

  ngOnInit(){
    this.form = new FormGroup({
      questionText: new FormControl<String>(''),
      //not done
      responseNbr: new FormControl<Number>(0),
      //not done
      correctResponseNbr: new FormControl<Number>(0),
      type: new FormControl<questionType>(questionType.SINGLE),
      totalScore: new FormControl<Number>(0),
      subject_id: new FormControl<Number>(0),
      level_id: new FormControl<Number>(0),
      duration: new FormControl<Number>(0)
    });
    this.formQuestion = new FormGroup({
      response1: new FormControl<String>(''),
      point1: new FormControl<Number>(0),
      response2: new FormControl<String>(''),
      point2: new FormControl<Number>(0),
      response3: new FormControl<String>(''),
      point3: new FormControl<Number>(0),
      response4: new FormControl<String>(''),
      point4: new FormControl<Number>(0),
    });
    this.subjectservice.getSubjects().subscribe(response => {
      this.subjects = response.subjects;
    });
    this.levelService.getLevels().subscribe(response => {
      this.levels = response.levels;
    });
    // listening to point changes to calculate correctResponseNbr
    this.formQuestion.controls['point1'].valueChanges.subscribe(value => {
      if(value > 0)
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
      else
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
    });

    this.formQuestion.controls['point2'].valueChanges.subscribe(value => {
      if(value > 0)
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
      else
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
    });

    this.formQuestion.controls['point3'].valueChanges.subscribe(value => {
      if(value > 0)
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
      else
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
    });

    this.formQuestion.controls['point4'].valueChanges.subscribe(value => {
      if(value > 0)
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
      else
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
    });
    // listening to point changes to calculate correctResponseNbr
    this.formQuestion.controls['response1'].valueChanges.subscribe(value => {
      if(value != '')
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
      else
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
    });

    this.formQuestion.controls['response2'].valueChanges.subscribe(value => {
      if(value != '')
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
      else
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
    });

    this.formQuestion.controls['response3'].valueChanges.subscribe(value => {
      if(value != '')
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
      else
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
    });

    this.formQuestion.controls['response4'].valueChanges.subscribe(value => {
      if(value != '')
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
      else
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
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
