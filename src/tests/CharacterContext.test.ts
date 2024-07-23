import { initialState, reducer, Action } from "../context/CharacterContext";
import { Race, Attribute } from "../interfaces/Character";

describe("CharacterContext Reducer", () => {
  it("should set player name", () => {
    const action: Action = { type: "SET_PLAYER_NAME", payload: "John Doe" };
    const newState = reducer(initialState, action);
    expect(newState.playerName).toBe("John Doe");
  });

  it("should set character name", () => {
    const action: Action = { type: "SET_CHARACTER_NAME", payload: "Aragorn" };
    const newState = reducer(initialState, action);
    expect(newState.characterName).toBe("Aragorn");
  });

  it("should set race", () => {
    const action: Action = { type: "SET_RACE", payload: "Elf" as Race };
    const newState = reducer(initialState, action);
    expect(newState.race).toBe("Elf");
  });

  it("should set attributes", () => {
    const newAttributes: Attribute[] = [
      { name: "Strength", abbreviation: "str", value: 12, modifier: 1 },
      { name: "Dexterity", abbreviation: "dex", value: 14, modifier: 2 },
      { name: "Constitution", abbreviation: "con", value: 13, modifier: 1 },
      { name: "Wisdom", abbreviation: "wis", value: 15, modifier: 2 },
      { name: "Intelligence", abbreviation: "int", value: 16, modifier: 3 },
      { name: "Charisma", abbreviation: "cha", value: 17, modifier: 3 },
    ];
    const action: Action = { type: "SET_ATTRIBUTES", payload: newAttributes };
    const newState = reducer(initialState, action);
    expect(newState.attributes).toEqual(newAttributes);
  });

  it("should set total points", () => {
    const action: Action = { type: "SET_TOTAL_POINTS", payload: 80 };
    const newState = reducer(initialState, action);
    expect(newState.totalPoints).toBe(80);
  });

  it("should set error message", () => {
    const action: Action = { type: "SET_ERROR_MESSAGE", payload: "Error" };
    const newState = reducer(initialState, action);
    expect(newState.errorMessage).toBe("Error");
  });

  it("should set attribute errors", () => {
    const errors = ["Error1", "Error2"];
    const action: Action = { type: "SET_ATTRIBUTE_ERRORS", payload: errors };
    const newState = reducer(initialState, action);
    expect(newState.attributeErrors).toEqual(errors);
  });
});
