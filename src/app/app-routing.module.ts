import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizpageComponent } from './quizpage/quizpage.component';


const routes: Routes = [
  {path: '', redirectTo:'/user', pathMatch:'full' },

  {path : "user", component: QuizpageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
