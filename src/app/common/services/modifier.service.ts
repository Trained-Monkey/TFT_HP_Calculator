import { Injectable } from '@angular/core';

import { ModifierBase } from '../component/modifiers/modifier-base';
import { RadioModifier } from '../component/modifiers/modifier-radio';

import { of } from 'rxjs';
import { Champion, Item } from '../interfaces/interfaces';
import { ItemDataService } from './itemData.service';
import { TextboxModifier } from '../component/modifiers/modifier-textbox';

// Service to retrieve actual list of possible modifiers, determines modifiers to show/return
// by being notified.
@Injectable()
export class ModifierService {
  baseQuestions: ModifierBase<string>[];
  updatedQuestions: ModifierBase<string>[];

  getQuestions() {
    this.baseQuestions = [

      new RadioModifier({
        key: 'star',
        label: 'Star Level: ',
        options: [
          {key: '1',  value: '1'},
          {key: '2',  value: '2'},
          {key: '3',  value: '3'}
        ],
        order: 3
      }),

      new RadioModifier({
        key: 'defender',
        label: 'Defender: ',
        options: [
          {key: '0',  value: '0'},
          {key: '2',  value: '2'},
          {key: '4',  value: '4'},
          {key: '6',  value: '6'}
        ],
        order: 3
      }),

      new RadioModifier({
        key: 'aegis',
        label: 'Aegis: ',
        options: [
          {key: '0',  value: '0'},
          {key: '2',  value: '2'},
          {key: '4',  value: '4'},
          {key: '6',  value: '6'}
        ],
        order: 3
      }),
    ];

    return of(this.baseQuestions.sort((a, b) => a.order - b.order));
  }

  // Take in champion and items
  // Give out updates list of modifiers
  getNewQuestions(champ: Champion, item: Item[]) {
    // Reset updated questions
    this.updatedQuestions = [
      new RadioModifier({
        key: 'star',
        label: 'Star Level: ',
        options: [
          {key: '1',  value: '1'},
          {key: '2',  value: '2'},
          {key: '3',  value: '3'}
        ],
        order: 3
      }),

      new RadioModifier({
        key: 'defender',
        label: 'Defender: ',
        options: [
          {key: '0',  value: '0'},
          {key: '2',  value: '2'},
          {key: '4',  value: '4'},
          {key: '6',  value: '6'}
        ],
        order: 3
      }),

      new RadioModifier({
        key: 'aegis',
        label: 'Aegis: ',
        options: [
          {key: '0',  value: '0'},
          {key: '2',  value: '2'},
          {key: '4',  value: '4'},
          {key: '6',  value: '6'}
        ],
        order: 3
      }),
    ];

    // Anima
    if (true){
      this.updatedQuestions.push(
        new TextboxModifier({
          key: 'anima',
          label: 'Anima: ',
          order: 3
        })
      )


    }

    // Mech

    // Brawler

    return of(this.updatedQuestions.sort((a, b) => a.order - b.order));
  }
}
