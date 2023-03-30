import { Injectable } from "@angular/core";
import { Stats, Champion, Item, Modifiers} from "../interfaces/interfaces";
import { Class } from "../interfaces/interfaces";
import { Subject } from "rxjs";
import { ModifierCalculator } from "./modifierCalculator.service";


@Injectable({
  providedIn: 'root'
})

// Used to determine the final stats after looking at the selected champion, items and modifiers
export class StatCalculatorService {
  aegisMap = new Map();

  finalisedStats = new Subject<Stats>();

  constructor(private modifierCalculator: ModifierCalculator) {
  }

  calculateStats(champion: Champion, items: Item[], modifiers: Modifiers) : Stats {
    let result: Stats = {
      health: 0,
      armour: 0,
      magicResist: 0,
      PHP: 0,
      PHPGrowthArmour: 0,
      PHPGrowthHealth: 0,
      MHP: 0,
      MHPGrowthResist: 0,
      MHPGrowthHealth: 0
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

    this.finalisedStats.next(this.calculateGrowth(result));

    return result;
  }

  private addChampionStat(curr: Stats, champ: Champion, star: number = 1) : Stats {
    if (champ) {
      // Might need special cases here to account for those that gain extra stats
      // when levelling up
      curr.health += champ.health * Math.pow(1.8, star - 1);
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

  private calculateGrowth(stat: Stats): Stats {
    var result: Stats = {
      health: stat.health,
      magicResist: stat.magicResist,
      armour: stat.armour,

      PHP: stat.health * (1 + stat.armour/100),
      PHPGrowthArmour: stat.health/100,
      PHPGrowthHealth: 1 + stat.armour/100,

      MHP: stat.health * (1 + stat.magicResist/100),
      MHPGrowthResist: stat.health/100,
      MHPGrowthHealth: 1 + stat.magicResist / 100
    }

    return result;
  }
}
