import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student, CRUDAction } from 'src/models';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  private _student: Student;

  @Input() 
  get student() { return this._student; };
  set student(value: Student) { 
    this._student =  value;
    if(this.form) { this.form.patchValue(value); }
  };

  @Input() therapies: string[] = [];
  @Input() action: CRUDAction;

  @Output() canceled = new EventEmitter();
  @Output() saved = new EventEmitter();

  form: FormGroup;

  get therapiesCtrl(): FormArray {
    return <FormArray>this.form.get('therapies');
  };

  get saveLabel() {
    switch(this.action) {
      case CRUDAction.New:
        return 'Add';
      case CRUDAction.Update:
        return 'Update';
      case CRUDAction.Delete:
        return 'Delete';
    }
    return 'Save';
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() { 
    this.form = this.fb.group({
      name: ['', Validators.required ],
      therapies: this.buildTherapies()
    });
    if(this.student) { this.form.patchValue(this.student); }
  }

  getTherapiesValues() {
    return this.therapies.map(therapy => this.student.therapies.includes(therapy));
  }

  buildTherapies() {
    // const arr = this.getTherapiesValues().map(value => this.fb.control(value));
    const arr = this.therapies.map(therapy => {
      return this.fb.control(this.student.therapies.includes(therapy));
    });
    return this.fb.array(arr);
  }

  save() {
    if(this.form.valid) {
      const therapies = this.form.value.therapies
        .map((therapy, idx) => therapy ? this.therapies[idx] : therapy)
        .filter(therapy => therapy);
      this.saved.emit({ value: { ...this.student, ...this.form.value, therapies }, action: this.action });
    }
  }

  cancel() { this.canceled.emit(); }
}
