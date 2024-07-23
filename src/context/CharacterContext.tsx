import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Attribute, Race, AttributeRanges } from "../interfaces/Character";

// Define initial attributes
export const initialAttributes: Attribute[] = [
  { name: "Strength", abbreviation: "str", value: 10, modifier: 0 },
  { name: "Dexterity", abbreviation: "dex", value: 10, modifier: 0 },
  { name: "Constitution", abbreviation: "con", value: 10, modifier: 0 },
  { name: "Wisdom", abbreviation: "wis", value: 10, modifier: 0 },
  { name: "Intelligence", abbreviation: "int", value: 10, modifier: 0 },
  { name: "Charisma", abbreviation: "cha", value: 10, modifier: 0 },
];

// Define races
export const races: Race[] = ["Human", "Elf", "Dwarf"];

// Define initial state
const initialState = {
  playerName: "",
  characterName: "",
  race: "Human" as Race,
  attributes: initialAttributes,
  totalPoints: 60,
  errorMessage: null as string | null,
  attributeErrors: initialAttributes.map(() => ""),
};

// Define actions
type Action =
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_CHARACTER_NAME"; payload: string }
  | { type: "SET_RACE"; payload: Race }
  | { type: "SET_ATTRIBUTES"; payload: Attribute[] }
  | { type: "SET_TOTAL_POINTS"; payload: number }
  | { type: "SET_ERROR_MESSAGE"; payload: string | null }
  | { type: "SET_ATTRIBUTE_ERRORS"; payload: string[] };

// Define reducer
const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.payload };
    case "SET_CHARACTER_NAME":
      return { ...state, characterName: action.payload };
    case "SET_RACE":
      return { ...state, race: action.payload };
    case "SET_ATTRIBUTES":
      return { ...state, attributes: action.payload };
    case "SET_TOTAL_POINTS":
      return { ...state, totalPoints: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload };
    case "SET_ATTRIBUTE_ERRORS":
      return { ...state, attributeErrors: action.payload };
    default:
      return state;
  }
};

// Create context
const CharacterContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create provider
export const CharacterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};

// Create custom hook
export const useCharacter = () => useContext(CharacterContext);
