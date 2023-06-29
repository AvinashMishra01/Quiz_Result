import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QuizpageComponent } from './quizpage/quizpage.component';
import { QuizServiceService } from './services/quiz-service.service';
import { FormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MatPaginatorModule } from '@angular/material/paginator';
// import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
// import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
   QuizpageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
  BrowserAnimationsModule


  ],
  providers: [QuizServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
