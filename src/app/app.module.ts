import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentFormComponent } from './student-form/student-form.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule 
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    StudentsComponent,
    StudentsListComponent,
    StudentFormComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
