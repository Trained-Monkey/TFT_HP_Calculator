import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ModifierBase } from './modifier-base';
import { ModifierControlService } from '../../services/modifier-control.service';

//  Actual overall form component
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './modifier-dynamic-form.component.html',
  providers: [ ModifierControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: ModifierBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: ModifierControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as ModifierBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
