import { Component } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import {Subject} from '../../../interfaces/Subject';
import { SubjectService } from 'src/services/subject.service';
import { SubjectStateService } from 'src/services/subject-state-service.service';

@Component({
  selector: 'app-create-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss'],
})
export class DialogComponent {
  subjects: Subject[] = [];
  constructor(private subjectService: SubjectService,
    private subjectState: SubjectStateService){}
  form = new FormGroup({
    title : new FormControl<string>(''),
    parent_id: new FormControl<number|null>(null),
  });
  ngOnInit(){
    this.subjectService.getSubject().subscribe(subjects => this.subjects = subjects.subjects)
  }
  onSubmit(): void{
    this.subjectService.addSubject(<Subject>this.form.getRawValue()).subscribe(subject => {

      this.subjectState.getState().close({
        data: subject.subject
      });
    });
  }
}
