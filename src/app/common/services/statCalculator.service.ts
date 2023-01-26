import { Injectable } from "@angular/core";
import { Stats, Champion, Item, Modifiers, Origin } from "../interfaces/interfaces";
import { Class } from "../interfaces/interfaces";
import { Subject } from "rxjs";
import { ModifierCalculator } from "./modifierCalculator.service";


@Injectable({
  providedIn: 'root'
})

// Used to determine the final stats after looking at the selected champion, items and modifiers
export class StatCalculatorService {
  aegisMap = new Map();

  PHPGrowth = new Subject<Stats>();
  MHPGrowth = new Subject<Stats>();

  constructor(private modifierCalculator: ModifierCalculator) {
  }

  calculateStats(champion: Champion, items: Item[], modifiers: Modifiers) : Stats {
    let result: Stats = {
      health: 0,
      armour: 0,
      magicResist: 0
    }

    result = this.addChampionStat(result, champion, modifiers.star);

    for (let i = 0; i < items.length; i++){
      let item = items[i];
      result = this.addItemStat(result, item);
    }

    // Handle modifiers
    if (champion)
    {
      result = this.modifierCalculator.calculateStats(champion, items, modifiers, result);
    }

    this.PHPGrowth.next(this.calculatePHPGrowth(result));
    this.MHPGrowth.next(this.calculateMHPGrowth(result));

    return result;
  }

  private addChampionStat(curr: Stats, champ: Champion, star: number = 1) : Stats {
    if (champ) {
      curr.health += champ.health * Math.pow(1.5, star - 1);
      curr.armour += champ.armour;
      curr.magicResist += champ.magicResist;
    }
    return curr;
  }

  private addItemStat(curr: Stats, item: Item): Stats {
    if (item) {
      curr.health += item.health;
      curr.armour += item.armour;
      curr.magicResist += item.magicResist;
    }

    return curr;
  }

  private calculatePHPGrowth(stat: Stats): Stats {
    var result: Stats = {
      health: 1 + stat.armour/100,
      armour: stat.health/100,
      magicResist: 0
    }

    return result;
  }

  private calculateMHPGrowth(stat: Stats): Stats {
    var result: Stats = {
      health: 1 + stat.magicResist/100,
      armour: 0,
      magicResist: stat.health/100
    }

    return result;
  }
}
