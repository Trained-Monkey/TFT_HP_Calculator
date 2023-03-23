import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

import { ModifierBase } from './modifier-base';
import { ModifierControlService } from '../../services/modifier-control.service';

//  Actual overall form component
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './modifier-dynamic-form.component.html',
  providers: [ ModifierControlService ]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() questions: ModifierBase<string>[] | null = [];
  @Output() formSubmit = new EventEmitter<FormGroup>();
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: ModifierControlService) {}

  ngOnInit() {
    // Rerun this line of code when something changes in the form group
    this.form = this.qcs.toFormGroup(this.questions as ModifierBase<string>[]);
    this.form.valueChanges.subscribe(x => {
      this.onSubmit();
    })
    this.formSubmit.next(this.form);
  }

  // We want this to run every time a new modifier is changed, not when a new value is changed
  ngOnChanges(){

    let newForm = this.qcs.toFormGroup(this.questions as ModifierBase<string>[]);

    if (this.detectChange(this.form, newForm)){
      this.form = newForm;

      this.onSubmit();
    }
  }

  onSubmit() {
    // Emit result to parent through output
    this.formSubmit.emit(this.form);
  }

  // Check if change is a result of change in list or result of change in number of questions
  detectChange(oldForm: FormGroup, newForm: FormGroup) : boolean {
    var oldSet = new Set(Object.keys(oldForm.getRawValue()));
    var newSet = new Set(Object.keys(newForm.getRawValue()));
    const setComparator = (xs, ys) => xs.size == ys.size && [...xs].every((x) => ys.has(x));
    return !setComparator(oldSet, newSet);
  }

  trackByFn(index, item) {
    return index;
  }

}
