import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Student, CRUDAction } from 'src/models';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsListComponent implements OnInit {

  @Input() students: Student[];
  @Input() therapies: string[];
  @Input() itemsPerPage: number = 12;
  @Output() change: EventEmitter<{ value?: Student, action: CRUDAction}> = new EventEmitter();

  pageIndex = 0;

  /*get therapiesCtrl(): FormArray {
    return <FormArray>this.form.get('therapies');
  };*/
  
  get dataView() {
    const s = this.pageIndex * this.itemsPerPage,
      e = s + this.itemsPerPage;
    return this.students.slice(s, e);
  }

  get pages() { return Array(Math.ceil(this.students.length / this.itemsPerPage)); }

  constructor() { }

  ngOnInit() { }

  changePage(page: number) { this.pageIndex = page; }

  search(searchCriteria: { searchName: string }) {
    console.log('Apply search logic here', searchCriteria);
  }

  onEdit(value: Student) {
    this.change.emit({ value, action: CRUDAction.Update });
  }

  onDelete(value: Student) {
    this.change.emit({ value, action: CRUDAction.Delete });
  }

  onCreate() { this.change.emit({ action: CRUDAction.New }); }
}
