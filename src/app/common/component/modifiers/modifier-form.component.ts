import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

import { ModifierBase } from './modifier-base';

@Component({
  selector: 'app-question',
  templateUrl: './modifier-form.component.html',
  styleUrls: ['../../../calculator/calculator.component.css']
})
export class DynamicFormQuestionComponent {
  @Input() question!: ModifierBase<string>;
  @Input() form!: FormGroup;
  @Output() formUpdate = new EventEmitter<void>();

  get isValid() { return this.form.controls[this.question.key].valid; }

  callParent(): void {
    this.formUpdate.next();
  }
}
