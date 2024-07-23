import {
  calculateTotalPoints,
  validateAttributes,
} from "../utils/attributeUtils";
import { initialAttributes, raceAttributeRanges } from "../constants/constants";
import { Race, Attribute, Abbreviation } from "../interfaces/Character";

describe("Attribute Utils", () => {
  it("should calculate total points correctly", () => {
    const totalPoints = calculateTotalPoints(initialAttributes);
    expect(totalPoints).toBe(60);
  });

  it("should validate attributes correctly for Human", () => {
    const errors = validateAttributes(initialAttributes, "Human" as Race);
    expect(errors.every((error) => error === "")).toBe(true);
  });

  it("should validate attributes correctly for Elf", () => {
    const elfAttributes: Attribute[] = [
      {
        name: "Strength",
        abbreviation: "str" as Abbreviation,
        value: 10,
        modifier: 0,
      },
      {
        name: "Dexterity",
        abbreviation: "dex" as Abbreviation,
        value: 20,
        modifier: 5,
      },
      {
        name: "Constitution",
        abbreviation: "con" as Abbreviation,
        value: 8,
        modifier: -1,
      },
      {
        name: "Wisdom",
        abbreviation: "wis" as Abbreviation,
        value: 15,
        modifier: 2,
      },
      {
        name: "Intelligence",
        abbreviation: "int" as Abbreviation,
        value: 12,
        modifier: 1,
      },
      {
        name: "Charisma",
        abbreviation: "cha" as Abbreviation,
        value: 14,
        modifier: 2,
      },
    ];
    const errors = validateAttributes(elfAttributes, "Elf" as Race);
    expect(errors.every((error) => error === "")).toBe(true);
  });

  it("should validate attributes correctly for Dwarf", () => {
    const dwarfAttributes: Attribute[] = [
      {
        name: "Strength",
        abbreviation: "str" as Abbreviation,
        value: 10,
        modifier: 0,
      },
      {
        name: "Dexterity",
        abbreviation: "dex" as Abbreviation,
        value: 16,
        modifier: 3,
      },
      {
        name: "Constitution",
        abbreviation: "con" as Abbreviation,
        value: 20,
        modifier: 5,
      },
      {
        name: "Wisdom",
        abbreviation: "wis" as Abbreviation,
        value: 15,
        modifier: 2,
      },
      {
        name: "Intelligence",
        abbreviation: "int" as Abbreviation,
        value: 12,
        modifier: 1,
      },
      {
        name: "Charisma",
        abbreviation: "cha" as Abbreviation,
        value: 14,
        modifier: 2,
      },
    ];
    const errors = validateAttributes(dwarfAttributes, "Dwarf" as Race);
    expect(errors.every((error) => error === "")).toBe(true);
  });

  it("should return errors for invalid attributes", () => {
    const invalidAttributes: Attribute[] = [
      {
        name: "Strength",
        abbreviation: "str" as Abbreviation,
        value: 5,
        modifier: -3,
      },
      {
        name: "Dexterity",
        abbreviation: "dex" as Abbreviation,
        value: 25,
        modifier: 7,
      },
      {
        name: "Constitution",
        abbreviation: "con" as Abbreviation,
        value: 3,
        modifier: -4,
      },
      {
        name: "Wisdom",
        abbreviation: "wis" as Abbreviation,
        value: 22,
        modifier: 6,
      },
      {
        name: "Intelligence",
        abbreviation: "int" as Abbreviation,
        value: 7,
        modifier: -2,
      },
      {
        name: "Charisma",
        abbreviation: "cha" as Abbreviation,
        value: 19,
        modifier: 4,
      },
    ];
    const errors = validateAttributes(invalidAttributes, "Human" as Race);
    expect(errors.some((error) => error !== "")).toBe(true);
  });
});
