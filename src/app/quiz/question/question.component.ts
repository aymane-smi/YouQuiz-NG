import { Component } from '@angular/core';
import { faImage, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  faTrash = faTrashCan;
  faImage_ = faImage;
}
