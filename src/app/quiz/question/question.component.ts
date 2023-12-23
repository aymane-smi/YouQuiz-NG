import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faImage, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  faTrash = faTrashCan;
  faImage_ = faImage;
  @Output() deleteQuestion = new EventEmitter<void>();
  @Input() index: Number = 0;
  @Output() selectQuestion = new EventEmitter<Number>();

  delete(){
    this.deleteQuestion.emit();
  }

  select(){
    this.selectQuestion.emit(this.index);
  }
}
