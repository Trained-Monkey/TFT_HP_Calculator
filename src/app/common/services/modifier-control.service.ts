import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModifierBase } from '../component/modifiers/modifier-base';

//  TUrns a list of questions into the form group
@Injectable()
export class ModifierControlService {
  toFormGroup(questions: ModifierBase<string>[] ) {
    const group: any = {};
    console.log(questions)
    questions.forEach(question => {
      group[question.key] = question.value == undefined ? new FormControl(question.default || '')
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  toFormGroupPreserveValues(form, questions) {
    const group: any = {};
    questions.forEach(question => {
      group[question.key] = question.value == undefined ? new FormControl(question.default || '')
                                              : new FormControl(question.value || '');
    });

    if (form != undefined){
      let oldValues = form.getRawValue();
      for (var prop in oldValues) {
        console.log(prop);
      }
    }

    return new FormGroup(group);
  }
}
