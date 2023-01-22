import { Injectable } from "@angular/core";
import { Stats, Champion, Item, Modifiers } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

// Used to determine the final stats after looking at the selected champion, items and modifiers
export class StatCalculatorService {
  defenderMap = new Map();
  aegisMap = new Map();

  constructor() {
    // Maybe move this out and export as a constant?
    this.defenderMap.set(0,[0, 0]);
    this.defenderMap.set(2,[30, 60]);
    this.defenderMap.set(4,[50, 80]);
    this.defenderMap.set(6,[400, 600]);
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

    result = this.addModifierStat(result, modifiers);


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

  private addModifierStat(curr: Stats, modifiers: Modifiers): Stats{
    // Defender
    var defender = modifiers.defender;

    curr.armour += this.defenderMap.get(defender)[0];

    // Aegis
    var aegis = modifiers.aegis;

    curr.magicResist += aegis * 30;
    // Anima


    // Brawler
    return curr;
  }
}
