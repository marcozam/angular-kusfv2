import { Component } from '@angular/core';

import { StudentsDataService } from './students-data.service';
import { Student, CRUDAction } from '../models';

const newStudent = { id: 0, name: '', therapies: [] };

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: [ './students.component.css' ]
})
export class StudentsComponent  {
  students: Student[] = StudentsDataService.generate(100);
  therapies = StudentsDataService.therapies;
  action = CRUDAction.New;

  currentStudent: Student = newStudent;
  formVisible = false;

  onSave(event: { value?: Student, action: CRUDAction}) {
    switch(event.action) {
      case CRUDAction.Update:
        const idx = this.students.findIndex((std: Student) => std.id === event.value.id);
        // This should'n be this way to use change detection on push
        this.students[idx] = event.value;
        break;
      case CRUDAction.Delete:
        this.students = this.students.filter((std: Student) => std.id !== event.value.id);
        break;
      case CRUDAction.New:
        event.value.id = this.students.length + 1;
        this.students = [ ...this.students, event.value ];
        break;
    }
    this.formVisible = false;
  }

  onChange(event: { value?: Student, action: CRUDAction}) {
    if(event.value) { this.currentStudent = event.value; }
    if(this.action === CRUDAction.New) { this.currentStudent = newStudent; }
    this.action = event.action;
    this.formVisible = true;
  }
}