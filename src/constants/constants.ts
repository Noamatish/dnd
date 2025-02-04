// constants/constants.ts
import { Race, Attribute, AttributeRanges } from "../interfaces/Character";

export const fallbackNames = [
  "Aragorn",
  "Legolas",
  "Gimli",
  "Frodo",
  "Samwise",
  "Gandalf",
  "Boromir",
  "Elrond",
  "Galadriel",
  "Arwen",
  "Eowyn",
  "Theoden",
  "Faramir",
  "Bilbo",
  "Thorin",
  "Dain",
  "Balin",
  "Bard",
  "Radagast",
  "Celeborn",
  "Glorfindel",
  "Haldir",
  "Luthien",
  "Finrod",
  "Thingol",
  "Earendil",
  "Eomer",
  "Isildur",
  "Denethor",
  "Cirdan",
  "Erestor",
  "Beleg",
  "Gwindor",
  "Glaurung",
  "Melian",
  "Nienor",
  "Morwen",
  "Turin",
  "Tuor",
  "Idril",
  "Maedhros",
  "Maglor",
  "Aredhel",
  "Maeglin",
  "Turgon",
  "Eol",
  "Gothmog",
  "Ancalagon",
  "Ungoliant",
];

export const initialAttributes: Attribute[] = [
  { name: "Strength", abbreviation: "str", value: 10, modifier: 0 },
  { name: "Dexterity", abbreviation: "dex", value: 10, modifier: 0 },
  { name: "Constitution", abbreviation: "con", value: 10, modifier: 0 },
  { name: "Wisdom", abbreviation: "wis", value: 10, modifier: 0 },
  { name: "Intelligence", abbreviation: "int", value: 10, modifier: 0 },
  { name: "Charisma", abbreviation: "cha", value: 10, modifier: 0 },
];

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
