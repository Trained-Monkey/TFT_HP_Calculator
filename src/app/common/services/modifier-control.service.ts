import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModifierBase } from '../component/modifiers/modifier-base';

//  TUrns a list of questions into the form group
@Injectable()
export class ModifierControlService {
  toFormGroup(questions: ModifierBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
