import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './level-create-dialog/dialog.component';
import { DialogComponent as SubjectDialog} from './subject-create-dialog/subject-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SubjectDialogUpdateComponent } from './subject-update-dialog/subject-dialog-update.component';
import { QuizDialogComponent } from './quiz-create-dialog/dialog.component';
import { MediaDialogComponent } from './media-dialog/media-dialog.component';
import { AssignDialogComponent } from './assign-dialog/assign-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    DialogComponent,
    SubjectDialog,
    SubjectDialogUpdateComponent,
    QuizDialogComponent,
    MediaDialogComponent,
    AssignDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
