import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/services/user.service';
import { Student } from 'src/app/models/interfaces/student';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-dialog',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss'],
  providers: []
})
export class AssignDialogComponent {
  students:Student[] = [];
  form!:FormGroup;
  constructor(private userService:UserService){}

  ngOnInit(){
    this.form = new FormGroup({
      ids: new FormControl(""),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
    this.userService.getStudents().subscribe(result => this.students = result);
  }

  onSubmit(){

  }

}
