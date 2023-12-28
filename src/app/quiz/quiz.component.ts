import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faBookmark, faCheck, faClock, faFontAwesome, faLayerGroup, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { questionType } from '../models/enums/questionType';
import { Subject } from '../models/interfaces/Subject';
import { Level } from '../models/interfaces/Level';
import { SubjectService } from 'src/services/subject.service';
import { LevelService } from 'src/services/level.service';
import { Response } from '../models/interfaces/Response';
import { QuestionService } from 'src/services/question.service';
import { QuizService } from 'src/services/quiz.service';
import { QuestionResponse } from '../models/interfaces/QuestionResponse';
import { ActivatedRoute } from '@angular/router';

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
  id:Number|null = 0;
  isImportedFromBack = false;
  questions:QuestionResponse[] = [{
    id:0,
    responseNbr: 0,
    correctResponseNbr: 0,
    questionText: "",
    questiontype: questionType.SINGLE,
    totalScore: 0,
    subject_id: 0,
    level_id: 0,
    duration: 0,
    quiz_id: <Number> <unknown>this.router.snapshot.paramMap.get("id"),
    medias: [],
    isCreated: false,
    responses: []
  }];
  subjects:Subject[] = [];
  levels:Level[] = [];

  form!: FormGroup;
  formQuestion!: FormGroup;
  inputkeysLock = [false, false, false, false];
  pointskeysLock = [false, false, false, false];

  constructor(private subjectservice:SubjectService,
    private levelService:LevelService,
    private questionService:QuestionService,
    private quizService:QuizService,
    private router: ActivatedRoute){}

  ngOnInit(){
    this.id = <Number|null>this.router.snapshot.paramMap.get("id");
    this.quizService.getQuestionByQuiz(<Number>this.id).subscribe(response => {
      if(response.length > 0){
        this.isImportedFromBack = true;
        response = response.map(item => {
          item = {
            ...item,
            isCreated: true
          };
          this.questionService.getQuestionResponse(item.id).subscribe(response => {
            item.responses = response;
          });
          return item;
        })
        this.questions = response;
      }

    });
    this.form = new FormGroup({
      questionText: new FormControl<String>(''),
      responseNbr: new FormControl<Number>(0),
      correctResponseNbr: new FormControl<Number>(0),
      type: new FormControl<questionType>(questionType.SINGLE),
      totalScore: new FormControl<Number>(0),
      subject_id: new FormControl<Number>(0),
      level_id: new FormControl<Number>(0),
      duration: new FormControl<Number>(0),
      medias: new FormControl<Object[]>([])
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
      if(value > 0 && this.pointskeysLock[0] == false){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
        this.pointskeysLock[0] = true
      }
      else if(value == 0 && this.pointskeysLock[0] == true){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
        this.pointskeysLock[0] = false;
      }
    });

    this.formQuestion.controls['point2'].valueChanges.subscribe(value => {
      if(value > 0 && this.pointskeysLock[1] == false){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
        this.pointskeysLock[1] = true;
      }
      else if(value == 0 && this.pointskeysLock[1] == true){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
        this.pointskeysLock[1] = false;
      }
    });

    this.formQuestion.controls['point3'].valueChanges.subscribe(value => {
      if(value > 0 && this.pointskeysLock[2] == false){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
        this.pointskeysLock[2] = true;
      }
      else if(value == 0 && this.pointskeysLock[2] == true){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
        this.pointskeysLock[2] = false;
      }
    });

    this.formQuestion.controls['point4'].valueChanges.subscribe(value => {
      if(value > 0 && this.pointskeysLock[3] == false){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value + 1
        );
        this.pointskeysLock[3] = true;
      }
      else if(value == 0 && this.pointskeysLock[1] == true){
        this.form.controls['correctResponseNbr'].setValue(
          this.form.controls['correctResponseNbr'].value - 1
        );
        this.pointskeysLock[3] = false;
      }
    });
    // listening to point changes to calculate responseNbr
    this.formQuestion.controls['response1'].valueChanges.subscribe(value => {
      if(value != "" && this.inputkeysLock[0] == false){
        console.log("inside the first input if");
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
        this.inputkeysLock[0] = true;
      }
      else if(value == "" && this.inputkeysLock[0] == true){
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
        this.inputkeysLock[0] = false;
      }
    });

    this.formQuestion.controls['response2'].valueChanges.subscribe(value => {
      if(value != "" && this.inputkeysLock[1] == false){
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
        this.inputkeysLock[1] = true;
      }
      else if(value == "" && this.inputkeysLock[1] == true){
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
        this.inputkeysLock[1] = false;
      }
    });

    this.formQuestion.controls['response3'].valueChanges.subscribe(value => {
      if(value != "" && this.inputkeysLock[2] == false){
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
        this.inputkeysLock[2] = true;
      }
      else if(value == "" && this.inputkeysLock[2] == true){
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
        this.inputkeysLock[2] = false;
      }
    });

    this.formQuestion.controls['response4'].valueChanges.subscribe(value => {
      if(value != "" && this.inputkeysLock[3] == false){
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value + 1
        );
        this.inputkeysLock[3] = true;
      }
      else if(value == "" && this.inputkeysLock[3] == true){
        this.form.controls['responseNbr'].setValue(
          this.form.controls['responseNbr'].value - 1
        );
        this.inputkeysLock[3] = false;
      }
    });
  }
  addNewQuestion(){
    this.questions.push({
      id:0,
      responseNbr: 0,
      correctResponseNbr: 0,
      questionText: "",
      questiontype: questionType.SINGLE,
      totalScore: 0,
      subject_id: 0,
      level_id: 0,
      quiz_id: <Number> <unknown>this.router.snapshot.paramMap.get("id"),
      medias: [],
      isCreated: false,
    });
  }

  deletOneQuestion(){
    if(this.questions.length > 1){
      this.questions.pop();
      this.selectedId = this.questions.length-1;
    }
  }

  selectedQuestion(id:number){
    this.selectedId = id;
    //change forgroup after each selection
    Object.keys(this.questions[this.selectedId]).map((key:String) => {
      if(key != "responses" || key != "isCreated")
        this.form.controls[key].setValue(this.questions[this.selectedId][key]);
    });
  }

  onSubmit(){
    this.questionService.createQuestion({...this.form.getRawValue(), quiz_id: this.id}).subscribe(response => {
      console.log(response);
      this.questions.push({...this.form.getRawValue(), quiz_id: this.id});
    });
  }

  onChange(){
    this.questionService.updateQuiz(this.questions[this.selectedId].id, this.questions[this.selectedId]).subscribe(response => {
      this.questionService.updateQuestionDuration(this.questions[this.selectedId].id, {
        quiz_id: <Number>this.id,
        question_id: this.questions[this.selectedId].id,
        duration: this.form.controls["duration"].value
      }).subscribe(result => {
        response.duration = result.duration;
        response.isCreated = true;
        this.questions = this.questions.map(item =>{
          if(item.id == response.id)
            return response;
          return item;
        });
      });
    });
  }

}
