// context/actions.ts
import { Attribute, Race } from "../interfaces/Character";

export const setPlayerName = (dispatch: React.Dispatch<any>, name: string) => {
  dispatch({ type: "SET_PLAYER_NAME", payload: name });
};

export const setCharacterName = (
  dispatch: React.Dispatch<any>,
  name: string
) => {
  dispatch({ type: "SET_CHARACTER_NAME", payload: name });
};

export const setRace = (dispatch: React.Dispatch<any>, race: Race) => {
  dispatch({ type: "SET_RACE", payload: race });
};

export const setAttributes = (
  dispatch: React.Dispatch<any>,
  attributes: Attribute[]
) => {
  dispatch({ type: "SET_ATTRIBUTES", payload: attributes });
};

export const setTotalPoints = (
  dispatch: React.Dispatch<any>,
  totalPoints: number
) => {
  dispatch({ type: "SET_TOTAL_POINTS", payload: totalPoints });
};

export const setErrorMessage = (
  dispatch: React.Dispatch<any>,
  message: string | null
) => {
  dispatch({ type: "SET_ERROR_MESSAGE", payload: message });
};

export const setAttributeErrors = (
  dispatch: React.Dispatch<any>,
  errors: string[]
) => {
  dispatch({ type: "SET_ATTRIBUTE_ERRORS", payload: errors });
};
