import { Component, Inject } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import {Subject} from '../../models/interfaces/Subject';
import { SubjectService } from 'src/services/subject.service';
import { SubjectStateService } from 'src/services/subject-state-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-subject-dialog',
  templateUrl: './subject-dialog-update.component.html',
  styleUrls: ['./subject-dialog.component.scss'],
})
export class SubjectDialogUpdateComponent {
  subject: Subject|undefined;
  constructor(private subjectService: SubjectService,
    private subjectState: SubjectStateService,
    @Inject(MAT_DIALOG_DATA) public data: any){}
  form = new FormGroup({
    id: new FormControl(
      this.data.id
    ),
    title : new FormControl<string>(''),
    parent_id: new FormControl<number>(0),
  });
  ngOnInit(){
    this.subjectService.getSubjectById(this.data.id).subscribe(subject => {
      this.subject = subject.subject
      this.form.controls["title"].setValue(subject.subject.title);
    })
  }
  onSubmit(): void{
    this.subjectService.editSubject(<number>this.form.controls["id"].value, <Subject>this.form.getRawValue()).subscribe(subject => {

      this.subjectState.getState().close({
        data: subject
      });
    });
  }
}
