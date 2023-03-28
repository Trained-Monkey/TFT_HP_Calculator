import { Injectable } from '@angular/core';

import { ModifierBase } from '../component/modifiers/modifier-base';
import { RadioModifier } from '../component/modifiers/modifier-radio';

import { of } from 'rxjs';
import { Champion, Class, EmblemItem, Item } from '../interfaces/interfaces';
import { ItemDataService } from './itemData.service';
import { TextboxModifier } from '../component/modifiers/modifier-textbox';
import { CheckboxModifier } from '../component/modifiers/modifier-checkbox';
import { FormGroup } from '@angular/forms';
import { UnitSelectorModifier } from '../component/modifiers/modifier-unitSelector';

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
        order: 3,
        default: '1'
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
        order: 3,
        default: '0'
      }),

      new RadioModifier({
        key: 'aegis',
        label: 'Aegis: ',
        options: [
          {key: '0',  value: '0'},
          {key: '2',  value: '2'},
          {key: '3',  value: '3'},
          {key: '4',  value: '4'},
          {key: '5',  value: '5'}
        ],
        order: 3,
        default: '0'
      }),

      new CheckboxModifier({
        key: 'ionic',
        label: 'Ionic: ',
        options: [
          {key: '0',  value: 'true'},
        ],
        order: 3,
      }),

      new CheckboxModifier({
        key: 'lastWhisper',
        label: 'Last Whisper: ',
        options: [
          {key: '0',  value: 'true'},
        ],
        order: 3,
      }),
    ];

    return of(this.baseQuestions.sort((a, b) => a.order - b.order));
  }

  // Take in champion and items
  // Give out updates list of modifiers
  // Need to also receive modifiers to get updated values
  getNewQuestions(champ: Champion, items: Item[], modifiers: FormGroup) {
    // Reset updated questions
    this.updatedQuestions = [
      new RadioModifier({
        value: modifiers.value.star,
        key: 'star',
        label: 'Star Level: ',
        options: [
          {key: '1',  value: '1'},
          {key: '2',  value: '2'},
          {key: '3',  value: '3'}
        ],
        order: 3,
        default: '1'
      }),

      new RadioModifier({
        value: modifiers.value.defender,
        key: 'defender',
        label: 'Defender: ',
        options: [
          {key: '0',  value: '0'},
          {key: '2',  value: '2'},
          {key: '4',  value: '4'},
          {key: '6',  value: '6'}
        ],
        order: 3,
        default: '0'
      }),

      new RadioModifier({
        value: modifiers.value.aegis,
        key: 'aegis',
        label: 'Aegis: ',
        options: [
          {key: '0',  value: '0'},
          {key: '2',  value: '2'},
          {key: '3',  value: '3'},
          {key: '4',  value: '4'},
          {key: '5',  value: '5'}
        ],
        order: 3,
        default: '0'
      }),

      new CheckboxModifier({
        value: modifiers.value.ionic,
        key: 'ionic',
        label: 'Ionic: ',
        options: [
          {key: '0',  value: 'true'},
        ],
        order: 3,
      }),

      new CheckboxModifier({
        value: modifiers.value.lastWhisper,
        key: 'lastWhisper',
        label: 'Last Whisper: ',
        options: [
          {key: '0',  value: 'true'},
        ],
        order: 3,
      }),
    ];

    if (this.isOxForce(champ, items)){
      this.updatedQuestions.push(
        new RadioModifier({
          value: modifiers.value.oxforce,
          key: 'oxforce',
          label: 'OxForce: ',
          options: [
            {key: '0',  value: '0'},
            {key: '2',  value: '2'},
            {key: '4',  value: '4'},
            {key: '6',  value: '6'},
          ],
          order: 3,
          default: '0'
        })
      )
    }

    // Brawler
    if (this.isBrawler(champ, items)){
      this.updatedQuestions.push(
        new RadioModifier({
          value: modifiers.value.brawler,
          key: 'brawler',
          label: 'Brawler: ',
          options: [
            {key: '0',  value: '0'},
            {key: '2',  value: '2'},
            {key: '4',  value: '4'},
            {key: '6',  value: '6'},
            {key: '8',  value: '8'}
          ],
          order: 3,
          default: '0'
        })
      )
    }

    // Anima
    if (this.isAnima(champ, items)){
      this.updatedQuestions.push(
        new TextboxModifier({
          value: modifiers.value.anima,
          key: 'anima',
          label: 'Anima: ',
          order: 3,
          default: '0'
        })
      )
    }

    // Gargoyle
    if (this.isGargoyle(champ, items)){
      this.updatedQuestions.push(
        new TextboxModifier({
          value: modifiers.value.gargoyle,
          key: 'gargoyle',
          label: 'Gargoyle Targets: ',
          order: 3,
          default: '0'
        })
      )
    }

    // Mech
    if (this.isMech(champ, items)){
      this.updatedQuestions.push(
        new UnitSelectorModifier({
          value: modifiers.value.mech,
          key: 'mech',
          label: 'Units eaten: ',
          order: 3,
          child: [],
          options: [
            {key: 'Jax',  value: 'Jax'},
            {key: 'Draven',  value: 'Draven'},
            {key: 'Leona',  value: 'Leona'},
            {key: 'Wukong',  value: 'Wukong'}
          ],
          default: 'Jax'
        })
      )
    }
    return of(this.updatedQuestions.sort((a, b) => a.order - b.order));
  }

  isOxForce(champ: Champion, items: Item[]): boolean {
    // Check champ
    if (champ != null){
      for (let i = 0; i < champ.class.length; i++){
        if (champ.class[i].includes(Class.OxForce)){
          return true;
        }
      }
    }

    return this.containsItem(items, EmblemItem.OxForce);
  }

  isBrawler(champ: Champion, items: Item[]): boolean {
    // Check champ
    if (champ != null){
      for (let i = 0; i < champ.class.length; i++){
        if (champ.class[i].includes(Class.Brawler)){
          return true;
        }
      }
    }

    return this.containsItem(items, EmblemItem.Brawler);
  }

  isAnima(champ: Champion, items: Item[]): boolean {
    // Check champ
    if (champ != null){
      for (let i = 0; i < champ.class.length; i++){
        if (champ.class[i].includes(Class.Anima)){
          return true;
        }
      }
    }

    return this.containsItem(items, EmblemItem.Anima);
  }

  isMech(champ: Champion, items: Item[]): boolean {
    if (champ != null){
      for (let i = 0; i < champ.class.length; i++){
        if (champ.class[i].includes(Class.Mech)){
          return true;
        }
      }
    }
    return this.containsItem(items, EmblemItem.Mech);
  }

  isGargoyle(champ: Champion, items: Item[]): boolean {
    return this.containsItem(items, "Gargoyle Stoneplate");
  }

  containsItem(items: Item[], name: String): boolean {
    for (let i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == name){
        return true;
      }
    }
    return false;
  }
}
