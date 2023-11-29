import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
  ],
  exports:[
    MainComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class MainModule { }
