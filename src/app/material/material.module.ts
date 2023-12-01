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



@NgModule({
  declarations: [
    DialogComponent,
    SubjectDialog,
    SubjectDialogUpdateComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
