export interface Character {
  playerName: string;
  characterName: string;
  race: string;
  attributes: Attribute[];
}
export type Race = "Human" | "Elf" | "Dwarf";
export type Abbreviation = "str" | "dex" | "con" | "wis" | "int" | "cha";

export interface Attribute {
  name: string;
  abbreviation: Abbreviation;
  value: number;
  modifier: number;
}

export interface AttributeRanges {
  dex: number[];
  str: number[];
  con: number[];
  wis: number[];
  int: number[];
  cha: number[];
}

export const races: Race[] = ["Human", "Elf", "Dwarf"];

export const raceAttributeRanges: Record<Race, AttributeRanges> = {
  Human: {
    dex: [8, 18],
    str: [8, 18],
    con: [8, 18],
    wis: [8, 18],
    int: [8, 18],
    cha: [8, 18],
  },
  Elf: {
    dex: [10, 20],
    str: [6, 16],
    con: [8, 18],
    wis: [8, 18],
    int: [8, 18],
    cha: [8, 18],
  },
  Dwarf: {
    dex: [6, 16],
    str: [8, 18],
    con: [10, 20],
    wis: [8, 18],
    int: [8, 18],
    cha: [8, 18],
  },
};

export const initialAttributes: Attribute[] = [
  { name: "Strength", abbreviation: "str", value: 10, modifier: 0 },
  { name: "Dexterity", abbreviation: "dex", value: 10, modifier: 0 },
  { name: "Constitution", abbreviation: "con", value: 10, modifier: 0 },
  { name: "Wisdom", abbreviation: "wis", value: 10, modifier: 0 },
  { name: "Intelligence", abbreviation: "int", value: 10, modifier: 0 },
  { name: "Charisma", abbreviation: "cha", value: 10, modifier: 0 },
];
