import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ModifierBase } from './modifier-base';

@Component({
  selector: 'app-question',
  templateUrl: './modifier-form.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question!: ModifierBase<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
