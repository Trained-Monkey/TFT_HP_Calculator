import { Injectable } from "@angular/core";
import { Champion, Stats, Item, Class, Modifiers, EmblemItem } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

export class ModifierCalculator {
  modifiers = [new Defender(), new Aegis(), new Anima(), new Mech(), new Brawler(), new Gargoyle(), new OxForce(), new Ionic(), new LastWhisper()];

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
    this.defenderMap.set('0',[0, 0]);
    this.defenderMap.set('2',[25, 50]);
    this.defenderMap.set('4',[75, 150]);
    this.defenderMap.set('6',[200, 400]);
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
      if (items[i] != null && items[i].name == EmblemItem.Defender){
        return 1;
      }
    }
    return 0;
  }
}

class Anima {
  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    if (modifiers.anima == undefined){
      return curr;
    }
    curr.health += 5 * modifiers.anima;

    return curr;
  }

}

class Aegis {
  aegisMap = new Map();

  constructor(){
    this.aegisMap.set('0',[0, 0]);
    this.aegisMap.set('2',[20, 40]);
    this.aegisMap.set('3',[40, 80]);
    this.aegisMap.set('4',[60, 120]);
    this.aegisMap.set('5',[90, 180]);
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
      if (items[i] != null && items[i].name == EmblemItem.Aegis){
        return 1;
      }
    }
    return 0;
  }

}

class Brawler {
  brawlerMap = new Map();

  constructor(){
    this.brawlerMap.set('0',[1, 1]);
    this.brawlerMap.set('2',[1, 1.2]);
    this.brawlerMap.set('4',[1, 1.45]);
    this.brawlerMap.set('6',[1, 1.7]);
    this.brawlerMap.set('8',[1, 2.0]);

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    if (modifiers.brawler == undefined){
      return curr;
    }

    var brawler: number = modifiers.brawler;

    var index = this.checkBrawler(champion, items);

    curr.health *= this.brawlerMap.get(brawler)[index];

    return curr;
  }

  checkBrawler(champion: Champion, items: Item[]): number{
    if (champion.class.includes(Class.Brawler)) return 1;
    for (var i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == EmblemItem.Brawler){
        return 1;
      }
    }
    return 0;
  }

}

class Mech {
  mechMap = new Map();
  constructor(){
    this.mechMap.set('', 0);
    this.mechMap.set('Jax', 1000);
    this.mechMap.set('Draven', 1000);
    this.mechMap.set('Wukong', 1000);
    this.mechMap.set('Leona', 1000);
  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    // Check if mech
    if (!this.isMech(champion, items)){
      return curr;
    }
    if (modifiers.mech1 == undefined || modifiers.mech2 == undefined){
      return curr;
    }
    curr.health += this.mechMap.get(modifiers.mech1);
    curr.health += this.mechMap.get(modifiers.mech2);

    return curr;
  }

  isMech(champion: Champion, items: Item[]){
    if (champion.class.includes(Class.Mech)) return 1;
    for (var i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == EmblemItem.Mech){
        return 1;
      }
    }

  }
}

class Ionic {
  constructor(){

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    // Check if ionic is set correctly
    if (modifiers.ionic){
      curr.magicResist *= 0.6;
    }

    return curr;
  }
}

class LastWhisper {
  constructor(){

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    // Check if last whisper is set correctly
    if (modifiers.lastWhisper){
      curr.armour *= 0.6;
    }

    return curr;
  }
}

class Gargoyle {
  constructor(){

  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    if (modifiers.gargoyle == undefined){
      return curr;
    }

    let count = 0;

    for (let i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == "Gargoyle Stoneplate"){
        count += 1;
      }
    }

    let amp = modifiers.gargoyle * count * 15;
    curr.armour += amp;
    curr.magicResist += amp;

    return curr;
  }
}

class OxForce{
  oxforceMap = new Map();
  constructor(){
    this.oxforceMap.set('0', [0, 0]);
    this.oxforceMap.set('2', [10, 10]);
    this.oxforceMap.set('4', [40, 40]);
    this.oxforceMap.set('6', [90, 90]);
  }

  calculateStat(champion: Champion, items: Item[], modifiers: Modifiers, curr: Stats):Stats {
    if (modifiers.oxforce == undefined){
      return curr;
    }

    var oxforce: number = modifiers.oxforce;

    var index = this.checkOxForce(champion, items);

    curr.armour += this.oxforceMap.get(oxforce)[index];
    curr.magicResist += this.oxforceMap.get(oxforce)[index];


    return curr;
  }

  checkOxForce(champion: Champion, items: Item[]): number{
    if (champion.class.includes(Class.OxForce)) return 1;
    for (var i = 0; i < items.length; i++){
      if (items[i] != null && items[i].name == EmblemItem.OxForce){
        return 1;
      }
    }
    return 0;
  }
}

// May need one for morgana in the future.
