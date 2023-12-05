import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatChipsModule,
    RouterModule
  ],
  exports:[
    MainComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class MainModule { }
