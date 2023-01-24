import { Injectable } from "@angular/core";
import { Stats, Champion, Item, Modifiers, Origin } from "../interfaces/interfaces";
import { Class } from "../interfaces/interfaces";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

// Used to determine the final stats after looking at the selected champion, items and modifiers
export class StatCalculatorService {
  defenderMap = new Map();
  aegisMap = new Map();
  brawlerMap = new Map();

  PHPGrowth = new Subject<Stats>();
  MHPGrowth = new Subject<Stats>();

  constructor() {
    // Maybe move this out and export as a constant?
    this.defenderMap.set(0,[0, 0]);
    this.defenderMap.set(2,[30, 60]);
    this.defenderMap.set(4,[50, 80]);
    this.defenderMap.set(6,[180, 400]);

    this.aegisMap.set(0,[0, 0]);
    this.aegisMap.set(2,[30, 60]);
    this.aegisMap.set(4,[50, 80]);
    this.aegisMap.set(6,[180, 400]);

    this.brawlerMap.set(0,[0, 0]);
    this.brawlerMap.set(2,[30, 60]);
    this.brawlerMap.set(4,[50, 80]);
    this.brawlerMap.set(6,[180, 400]);

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
      result = this.addModifierStat(result, champion, modifiers);
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

  private addModifierStat(curr: Stats, champion: Champion, modifiers: Modifiers): Stats{
    // Defender
    var defender = modifiers.defender;

    var index = champion.class.includes(Class.Defender) ? 1 : 0
    curr.armour += this.defenderMap.get(defender)[index];

    // Aegis
    var aegis = modifiers.aegis;
    index = champion.class.includes(Class.Aegis) ? 1 : 0;

    curr.magicResist += this.aegisMap.get(aegis)[index];
    // Anima

    if (champion.class.includes(Origin.AnimaSquad)) {
      curr.health += modifiers.anima * 5;
    }

    // Brawler
    if (champion.class.includes(Class.Brawler)) {
      var brawler = modifiers.brawler;
      curr.health = curr.health * this.brawlerMap.get(brawler)
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
