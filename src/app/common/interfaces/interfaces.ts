export interface Champion {
  name: string;
  image: string;

  health: number;
  armour: number;
  magicResist: number;

  class: string[];
  origin: string[];
}

export interface Item {
  name: string;
  image: string;

  health: number;
  armour: number;
  magicResist: number;
}

export interface Stats {
  health: number;
  armour: number;
  magicResist: number;
}

export interface Modifiers {
  star: number;
  defender: number;
  aegis: number;
  brawler: number;
  anima: number;
}


export enum Class {
  Sureshot,
  Defender = "Defender",
  Brawler = "Brawler",
  Aegis = "Aegis",
  // Prankster,
  // Mascot,
  // Hacker,
  // Spellslinger,
  // Renegade
}

export enum Origin {
  Admin,
  OxForce,
  Gadgeteen,
  Civillian,
  Threat,
  AnimaSquad = "AnimaSquad",
}
