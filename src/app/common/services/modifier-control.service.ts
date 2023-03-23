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
      if(question.key == "mech"){
        let mechGroup: any = {};

        let mech1 = undefined;
        let mech2 = undefined;

        if (question.value != undefined){
          // Any type cast to remove undefined "mech1" on string
          let value:any = question.value;
          mech1 = value.mech1;
          mech2 = value.mech2;
        }

        mechGroup["mech1"] = mech1 == undefined ? new FormControl(question.default || '') : new FormControl(mech1 || '');
        mechGroup["mech2"] = mech2 == undefined ? new FormControl(question.default || '') : new FormControl(mech2 || '');
        // mechGroup["name"] = "mech";
        console.log(mech1, mech2);

        group[question.key] = new FormGroup(mechGroup);
      }
      else {
        group[question.key] = question.value == undefined ? new FormControl(question.default || '')
        : new FormControl(question.value || '');
      };
    });

    let result = new FormGroup(group);

    console.log(result);
    return result;
  }
}
