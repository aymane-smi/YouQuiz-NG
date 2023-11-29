import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: "trainer", component: MainComponent, data: {title: "Dashboard"}, pathMatch: "full"},
  {path: "", redirectTo: "/trainer", pathMatch: "full"},
  {path: "**", component: NotFoundComponent, data: {title: "Not Found"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
