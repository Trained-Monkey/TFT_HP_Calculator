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
  // Prankster,
  // Mascot,
  // Hacker,
  // Spellslinger,
  // Renegade
}

export enum EmblemItem {
  Anima = "AnimaEmblemItem",
  Brawler = "BrawlerEmblemItem",
  Mech = "MechEmblemItem",
  OxForce = "OxForceEmblemItem",
  Defender = "DefenderEmblemItem",
  Aegis = "AegisEmblemItem"

}
