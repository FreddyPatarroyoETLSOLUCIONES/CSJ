import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecaptchaComponent } from './recaptcha/recaptcha.component'; // ->  imported directive

const routes: Routes = [
  {
    path: 'recaptcha',
    component: RecaptchaComponent
  }
  //,
  // {
  //   path: 'searchForm',
  //   component: RecaptchaComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
