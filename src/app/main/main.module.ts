import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    MainComponent
  ]
})
export class MainModule { }
