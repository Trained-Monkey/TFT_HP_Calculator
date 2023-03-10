import { Injectable } from "@angular/core";
import { Champion, Stats, Item, Class, Modifiers } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

export class ModifierCalculator {
  modifiers = [new Defender(), new Aegis(), new Anima(), new Brawler(), new Ionic(), new LastWhisper()];

  calculateStats(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats, ):Stats {

    var results: Stats = curr;

    for (var i = 0; i < this.modifiers.length; i++){
      results = this.modifiers[i].calculateStat(champion, items, modifiers, results);
    }

    return results;
  }
}

class Defender {
  defenderMap = new Map();

  constructor(){
    this.defenderMap.set(0,[0, 0]);
    this.defenderMap.set(2,[30, 60]);
    this.defenderMap.set(4,[50, 80]);
    this.defenderMap.set(6,[180, 400]);
  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    var defender: number = modifiers.defender;

    var index = this.checkDefender(champion, items);

    curr.armour += this.defenderMap.get(defender)[index];

    return curr;
  }

  checkDefender(champion: Champion, items: Item[]): number{
    if (champion.class.includes(Class.Defender)) return 1;
    for (var i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == "DefenderEmblemItem"){
        return 1;
      }
    }
    return 0;
  }
}

class Anima {
  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    curr.health += 5 * modifiers.anima;

    return curr;
  }

}

class Aegis {
  aegisMap = new Map();

  constructor(){
    this.aegisMap.set(0,[0, 0]);
    this.aegisMap.set(2,[30, 60]);
    this.aegisMap.set(4,[50, 80]);
    this.aegisMap.set(6,[180, 400]);
  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    var aegis: number = modifiers.aegis;

    var index = this.checkAegis(champion, items);

    curr.magicResist += this.aegisMap.get(aegis)[index];

    return curr;
  }

  checkAegis(champion: Champion, items: Item[]): number{
    if (champion.class.includes(Class.Aegis)) return 1;
    for (var i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == "AegisEmblemItem"){
        return 1;
      }
    }
    return 0;
  }

}

class Brawler {
  brawlerMap = new Map();

  constructor(){
    this.brawlerMap.set(0,[1, 1]);
    this.brawlerMap.set(2,[1, 1.2]);
    this.brawlerMap.set(4,[1, 1.5]);
    this.brawlerMap.set(6,[1, 1.7]);
    this.brawlerMap.set(8,[1, 1.9]);

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    var brawler: number = modifiers.brawler;

    var index = this.checkBrawler(champion, items);

    curr.health *= this.brawlerMap.get(brawler)[index];

    return curr;
  }

  checkBrawler(champion: Champion, items: Item[]): number{
    if (champion.class.includes(Class.Brawler)) return 1;
    for (var i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == "BrawlerEmblemItem"){
        return 1;
      }
    }
    return 0;
  }

}

class Mech {
  constructor(){

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    // Check if mech

    // Apply stat calculations
    return curr;
  }
}

class Ionic {
  constructor(){

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    // Check if ionic is set correctly
    curr.magicResist *= 0.6;

    return curr;
  }
}

class LastWhisper {
  constructor(){

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    // Check if last whisper is set correctly
    curr.armour *= 0.6;

    return curr;
  }
}

// May need one for morgana in the future.
