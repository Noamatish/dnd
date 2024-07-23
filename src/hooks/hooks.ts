// hooks/hooks.ts
import { useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";

export const useCharacterState = () => {
  const { state } = useContext(CharacterContext);
  return state;
};

export const useCharacterDispatch = () => {
  const { dispatch } = useContext(CharacterContext);
  return dispatch;
};
