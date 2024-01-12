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
import { ResponseService } from 'src/services/response.service';
import { QuizResponse } from '../models/interfaces/QuizResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: ActivatedRoute,
    private responseService: ResponseService,
    private snackBar: MatSnackBar){}

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
          return item;
        })
        this.questions = response;
        this.selectedQuestion(0);
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
      position1: new FormControl<Number>(1),
      id1: new FormControl<Number>(0),
      point1: new FormControl<Number>(0),
      response2: new FormControl<String>(''),
      position2: new FormControl<Number>(2),
      id2: new FormControl<Number>(0),
      point2: new FormControl<Number>(0),
      response3: new FormControl<String>(''),
      position3: new FormControl<Number>(3),
      id3: new FormControl<Number>(0),
      point3: new FormControl<Number>(0),
      response4: new FormControl<String>(''),
      position4: new FormControl<Number>(4),
      id4: new FormControl<Number>(0),
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
        this.pointskeysLock[0] = true;
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
  //delete to be handled later
  deletOneQuestion(){
    if(this.questions.length > 1){
      this.questions.pop();
      this.selectedId = this.questions.length-1;
    }
  }

  selectedQuestion(id:number){
    this.selectedId = id;
    if(this.questions[this.selectedId].isCreated){
      //change formgroup after each selection
    let keysToSkip = ["responses", "isCreated", "id", "subject", "level"];
    Object.keys(this.questions[this.selectedId]).map((key:string) => {
      if(!keysToSkip.includes(key)){
        this.form.controls[key as keyof QuestionResponse].setValue(this.questions[this.selectedId][key as keyof QuestionResponse]);
      }
      if(key == "subject")
        this.form.controls["subject_id"].setValue(this.questions[this.selectedId].subject?.id);
      if(key == "level")
        this.form.controls["level_id"].setValue(this.questions[this.selectedId].level?.id);
        //this.getResponse();
    });
    }
    this.getResponse();

  }

  getResponse(){
    console.log("select==>", this.questions[this.selectedId].id);
    if(this.questions[this.selectedId].id == 0){
      [1,2,3,4].forEach((index) => {
        this.formQuestion.controls["id"+index].setValue(
          0
        );
        this.formQuestion.controls["point"+index].setValue(
          0
        );
        this.formQuestion.controls["response"+index].setValue(
          ""
        );
      });
    }else
      this.questionService.getQuestionResponse(this.questions[this.selectedId].id).subscribe(response => {
        for(let element of response.responses){
          let index = element.position;
          ["position", "id", "point", "response"].forEach((key:string) => {
            this.formQuestion.controls[key+index].setValue(
              element[key as keyof QuizResponse]
            )
          });
        }
      });
  }

  onSubmit(e:any){
    e.preventDefault();
    this.questionService.createQuestion({...this.form.getRawValue(), quiz_id: this.id}).subscribe(response => {
      console.log("created response:",response.question.id);
      this.questions.unshift({...this.form.getRawValue(), quiz_id: this.id, id: response.question.id, isCreated: true});
      this.responseService.handleResponse(this.formQuestion, this.questions[this.selectedId].id).forEach(element => {
        try{
          Object.keys(element).forEach((key:string) => this.formQuestion.controls[key].setValue(
            element[key as keyof QuizResponse]
          ));
        }catch(e:any){
          this.snackBar.open(e.message, "", {
            verticalPosition: 'bottom',
            horizontalPosition: "right",
            panelClass: ['bg-[#E91E62]']
          })
        }
      });
    }, err =>{
      this.snackBar.open(err.message, "", {
        verticalPosition: 'bottom',
        horizontalPosition: "right",
        panelClass: ['bg-[#E91E62]']
      })
    });
  }

  onChange(e:any){
    e.preventDefault();
    let key = false;
    this.questionService.updateQuiz(this.questions[this.selectedId].id, this.form.getRawValue()).subscribe(response => {
      this.questionService.updateQuestionDuration(this.questions[this.selectedId].id, {
        quiz_id: <Number>this.id,
        question_id: this.questions[this.selectedId].id,
        duration: this.form.controls["duration"].value
      }).subscribe(result => {
        key = true;
        response.duration = result.duration;
        response.isCreated = true;
        this.questions = [...this.questions.map(item =>{
          if(item.id == response.id)
            return response;
          return item;
        })]
      })
    }, err =>{
      console.log("inside the error in onchange")
      this.snackBar.open(err.message, "", {
        verticalPosition: 'bottom',
        horizontalPosition: "right",
        panelClass: ['bg-[#E91E62]']
      })
    });
    this.responseService.handleResponse(this.formQuestion, this.questions[this.selectedId].id).forEach(element => {
      Object.keys(element).forEach((key:string) => this.formQuestion.controls[key].setValue(
        element[key as keyof QuizResponse]
      ));
    });
    if(!key)
      this.snackBar.open("question updated", "", {
        verticalPosition: "bottom",
        horizontalPosition: "right",
        duration: 1000
      });
  }

  onDelete(){
    let id = this.questions[this.selectedId].id;
    this.questionService.deleteQuestion(id).subscribe(response => {
      let index = this.questions.findIndex(question => question.id === id);
      this.questions = this.questions.filter(question => question.id !== id);
      if(this.questions.length === 0)
        this.addNewQuestion();
      if(index > 0)
        this.selectedQuestion(index-1);
      else
        this.selectedQuestion(0);
      this.snackBar.open("question deleted", "", {
        duration: 1000,
        verticalPosition: "bottom",
        horizontalPosition: "right"
      })
    })
  }

}
