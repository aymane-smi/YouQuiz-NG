import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { MainModule } from './main/main.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { levelReducer } from 'src/ngrx/reducers/level.reducer';
import { QuizMainComponent } from './quiz-main/quiz-main.component';
import { QuizMainModule } from './quiz-main/quiz-main-module.module';
import { QuizComponent } from './quiz/quiz.component';
import { quizReducer } from 'src/ngrx/reducers/quiz.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NotFoundComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopBarComponent,
    FontAwesomeModule,
    HttpClientModule,
    MainModule,
    BrowserAnimationsModule,
    MaterialModule,
    QuizMainModule,
    StoreModule.forRoot({
      quiz: quizReducer,
      router: routerReducer,
    },{
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
