export interface Champion {
  name: string;
  image: string;

  health: number;
  armour: number;
  magicResist: number;

  class: Class;
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

export enum Class {
  Sureshot,
  Defender,
  Brawler,
  Aegis,
  Prankster,
}

