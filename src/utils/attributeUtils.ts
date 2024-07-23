// utils/attributeUtils.ts
import { Attribute, Race, raceAttributeRanges } from "../interfaces/Character";

export const validateAttributes = (
  attributes: Attribute[],
  race: Race
): string[] => {
  return attributes.map((attr) => {
    const [min, max] = raceAttributeRanges[race][attr.abbreviation];
    if (attr.value < min || attr.value > max) {
      return `${attr.name} must be between ${min} and ${max}.`;
    }
    return "";
  });
};

export const calculateTotalPoints = (attributes: Attribute[]): number => {
  return attributes.reduce((sum, attr) => sum + attr.value, 0);
};

export const handleAttributeChange = (
  attributes: Attribute[],
  index: number,
  delta: number,
  race: Race,
  attributeErrors: string[],
  setError: (errors: string[]) => void,
  totalPoints: number
): Attribute[] | null => {
  const newAttributes = [...attributes];
  const [min, max] =
    raceAttributeRanges[race][newAttributes[index].abbreviation];
  const newValue = newAttributes[index].value + delta;

  if (newValue < min || newValue > max || totalPoints + delta > 83) {
    const newErrors = [...attributeErrors];
    newErrors[
      index
    ] = `Value must be between ${min} and ${max}. Total points must not exceed 83.`;
    setError(newErrors);
    return null;
  }

  newAttributes[index].value = newValue;
  newAttributes[index].modifier = Math.floor((newValue - 10) / 2);

  return newAttributes;
};
