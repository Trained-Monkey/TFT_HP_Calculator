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
  PHP: number;
  PHPGrowthArmour: number;
  PHPGrowthHealth: number;
  MHP: number;
  MHPGrowthResist: number;
  MHPGrowthHealth: number;
}

export interface Modifiers {
  star: number;
  defender: number;
  aegis: number;
  brawler?: number;
  anima?: number;
  ionic?: boolean;
  lastWhisper?: boolean;
  gargoyle?: number;
  oxforce?: number;
  mech1?: string;
  mech2?: string;
}

export enum Class {
  Sureshot,
  Defender = "Defender",
  Brawler = "Brawler",
  Aegis = "Aegis",
  Mech = "Mech",
  Anima = "Anima",
  OxForce = "OxForce"
}

export enum EmblemItem {
  Anima = "Anima Squad Spat",
  Brawler = "Brawler Spat",
  Mech = "Mech Prime Spat",
  OxForce = "OxForce Spat",
  Defender = "Defender Spat",
  Aegis = "Aegis Spat"
}
