import React, { useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import "../styles/index.css";

import { useCharacterState, useCharacterDispatch } from "../hooks/hooks";
import {
  setPlayerName,
  setCharacterName,
  setRace,
  setAttributes,
  setTotalPoints,
  setErrorMessage,
  setAttributeErrors,
} from "../context/actions";
import {
  validateAttributes,
  calculateTotalPoints,
  handleAttributeChange,
} from "../utils/attributeUtils";
import {
  initialAttributes,
  races,
  fallbackNames,
  raceAttributeRanges,
} from "../constants/constants";
import AttributeRow from "../components/AttributeRow";
import { Race } from "../interfaces/Character";

const CharacterSheet: React.FC = () => {
  const state = useCharacterState();
  const dispatch = useCharacterDispatch();

  useEffect(() => {
    const total = calculateTotalPoints(state.attributes);
    setTotalPoints(dispatch, total);
  }, [state.attributes, dispatch]);

  useEffect(() => {
    const timeoutIds = state.attributeErrors.map((error, index) => {
      if (error !== "") {
        return setTimeout(() => {
          const newErrors = [...state.attributeErrors];
          newErrors[index] = "";
          setAttributeErrors(dispatch, newErrors);
        }, 5000);
      }
      return null;
    });
    return () => {
      timeoutIds.forEach((id) => {
        if (id !== null) {
          clearTimeout(id);
        }
      });
    };
  }, [state.attributeErrors, dispatch]);

  const validate = (): boolean => {
    const errors = validateAttributes(state.attributes, state.race);
    setAttributeErrors(dispatch, errors);

    if (errors.some((error) => error !== "")) {
      setErrorMessage(
        dispatch,
        "One or more attributes are out of the valid range."
      );
      return false;
    }

    if (state.totalPoints > 83) {
      setErrorMessage(dispatch, "Total points must not exceed 83.");
      return false;
    }

    setErrorMessage(dispatch, null);
    return true;
  };

  const handleAttributeChangeWrapper = (index: number, delta: number) => {
    const newAttributes = handleAttributeChange(
      state.attributes,
      index,
      delta,
      state.race,
      state.attributeErrors,
      (errors) => setAttributeErrors(dispatch, errors),
      state.totalPoints
    );

    if (!newAttributes) return;

    setAttributes(dispatch, newAttributes);
    validate();
  };

  const handleInputChangeWrapper = (index: number, value: string) => {
    const newValue = parseInt(value, 10);
    const newAttributes = [...state.attributes];
    const [min, max] =
      raceAttributeRanges[state.race][newAttributes[index].abbreviation];
    if (isNaN(newValue) || newValue < min || newValue > max) {
      const newErrors = [...state.attributeErrors];
      newErrors[index] = `Value must be between ${min} and ${max}.`;
      setAttributeErrors(dispatch, newErrors);
      newAttributes[index].value = newValue;
      setAttributes(dispatch, newAttributes);
      return;
    }

    newAttributes[index].value = newValue;
    newAttributes[index].modifier = Math.floor((newValue - 10) / 2);

    const total = calculateTotalPoints(newAttributes);
    if (total > 83) {
      setErrorMessage(dispatch, "Total points must not exceed 83.");
      return;
    }

    setAttributes(dispatch, newAttributes);
    validate();
  };

  const handleRaceChange = (newRace: Race) => {
    setRace(dispatch, newRace);

    const newAttributes = initialAttributes.map((attr) => ({
      ...attr,
      value: 10,
      modifier: Math.floor((10 - 10) / 2),
    }));

    setAttributes(dispatch, newAttributes);
    setTotalPoints(dispatch, 60);
    setAttributeErrors(
      dispatch,
      newAttributes.map(() => "")
    );
    validate();
  };

  const fetchRandomName = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const name = `${data.results[0].name.first} ${data.results[0].name.last}`;
      setCharacterName(dispatch, name);
    } catch (error) {
      console.error("Error fetching random name:", error);
      const fallbackName =
        fallbackNames[Math.floor(Math.random() * fallbackNames.length)];
      setCharacterName(dispatch, fallbackName);
    }
  };

  const pointsLeft = 83 - state.totalPoints;

  return (
    <Box p={3} className="character-sheet" maxWidth={600} mx="auto">
      <Typography variant="h4" gutterBottom>
        D&D Character Sheet
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            label="Player Name"
            value={state.playerName}
            onChange={(e) => setPlayerName(dispatch, e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Character Name"
            value={state.characterName}
            onChange={(e) => setCharacterName(dispatch, e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="random-button"
                    color="primary"
                    onClick={fetchRandomName}
                    edge="end"
                  >
                    Random
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            value={state.race}
            onChange={(e) => handleRaceChange(e.target.value as Race)}
            fullWidth
          >
            {races.map((race) => (
              <MenuItem key={race} value={race}>
                {race}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography>Points allocated: {state.totalPoints} / 83</Typography>
          <LinearProgress
            variant="determinate"
            value={(state.totalPoints / 83) * 100}
          />
          <Typography color={pointsLeft < 0 ? "error" : "textPrimary"}>
            {pointsLeft < 0 ? "Overallocated!" : `Points left: ${pointsLeft}`}
          </Typography>
        </Grid>
        {state.attributes.map((attr, index) => (
          <AttributeRow
            key={attr.abbreviation}
            attr={attr}
            index={index}
            handleChange={handleAttributeChangeWrapper}
            handleInputChange={handleInputChangeWrapper}
            error={state.attributeErrors[index]}
          />
        ))}
      </Grid>
      {state.errorMessage && (
        <Typography color="error" variant="body1" align="center" mt={2}>
          {state.errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default CharacterSheet;
