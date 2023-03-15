import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  }

  ngOnChanges(){
    this.form = this.qcs.toFormGroup(this.questions as ModifierBase<string>[]);
    this.form.valueChanges.subscribe(x => {
      this.onSubmit();
    })
  }

  onSubmit() {
    // Emit result to parent through output
    this.formSubmit.emit(this.form);
  }
}
