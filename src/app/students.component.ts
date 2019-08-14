import { Component } from '@angular/core';

import { StudentsDataService } from './students-data.service';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: [ './students.component.css' ]
})
export class StudentsComponent  {
  students = StudentsDataService.generate(100);
}