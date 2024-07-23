import React, { useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import "../styles/index.css";

import { useCharacter } from "../context/CharacterContext";
import { Race, raceAttributeRanges, Attribute } from "../interfaces/Character";
import { initialAttributes, races } from "../context/CharacterContext"; //
import { fallbackNames } from "../constants/constants";

const CharacterSheet: React.FC = () => {
  const { state, dispatch } = useCharacter();

  useEffect(() => {
    const total = state.attributes.reduce((sum, attr) => sum + attr.value, 0);
    dispatch({ type: "SET_TOTAL_POINTS", payload: total });
  }, [state.attributes, dispatch]);

  useEffect(() => {
    const timeoutIds = state.attributeErrors.map((error, index) => {
      if (error !== "") {
        // Clear error message after 5 seconds
        return setTimeout(() => {
          const newErrors = [...state.attributeErrors];
          newErrors[index] = "";
          dispatch({ type: "SET_ATTRIBUTE_ERRORS", payload: newErrors });
        }, 5000);
      }
      return null;
    });
    return () => {
      // Clear all timeouts when component unmounts
      timeoutIds.forEach((id) => {
        if (id !== null) {
          clearTimeout(id);
        }
      });
    };
  }, [state.attributeErrors, dispatch]);

  const validateAttributes = (): boolean => {
    // Check if any attribute is out of range
    const errors = state.attributes.map((attr) => {
      const [min, max] = raceAttributeRanges[state.race][attr.abbreviation];
      if (attr.value < min || attr.value > max) {
        return `${attr.name} must be between ${min} and ${max}.`;
      }
      return "";
    });

    dispatch({ type: "SET_ATTRIBUTE_ERRORS", payload: errors });

    if (errors.some((error) => error !== "")) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "One or more attributes are out of the valid range.",
      });
      return false;
    }

    if (state.totalPoints > 83) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "Total points must not exceed 83.",
      });
      return false;
    }

    dispatch({ type: "SET_ERROR_MESSAGE", payload: null });
    return true;
  };

  const handleAttributeChange = (index: number, delta: number) => {
    // Update attribute value and modifier
    const newAttributes = [...state.attributes];
    const [min, max] =
      raceAttributeRanges[state.race][newAttributes[index].abbreviation];
    const newValue = newAttributes[index].value + delta;
    if (newValue < min || newValue > max) {
      const newErrors = [...state.attributeErrors];
      newErrors[index] = `Value must be between ${min} and ${max}.`;
      dispatch({ type: "SET_ATTRIBUTE_ERRORS", payload: newErrors });
      return;
    }

    const total = newAttributes.reduce((sum, attr) => sum + attr.value, 0);
    if (total + delta > 83) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "Total points must not exceed 83.",
      });
      return;
    }

    newAttributes[index].value = newValue;
    newAttributes[index].modifier = Math.floor((newValue - 10) / 2);
    dispatch({ type: "SET_ATTRIBUTES", payload: newAttributes });
    dispatch({
      type: "SET_ATTRIBUTE_ERRORS",
      payload: newAttributes.map(() => ""),
    });
    validateAttributes();
  };

  const handleAttributeInputChange = (index: number, value: string) => {
    const newValue = parseInt(value, 10);
    const newAttributes = [...state.attributes];
    const [min, max] =
      raceAttributeRanges[state.race][newAttributes[index].abbreviation];
    if (isNaN(newValue) || newValue < min || newValue > max) {
      const newErrors = [...state.attributeErrors];
      newErrors[index] = `Value must be between ${min} and ${max}.`;
      dispatch({ type: "SET_ATTRIBUTE_ERRORS", payload: newErrors });
      newAttributes[index].value = newValue;
      dispatch({ type: "SET_ATTRIBUTES", payload: newAttributes });
      return;
    }

    newAttributes[index].value = newValue;
    newAttributes[index].modifier = Math.floor((newValue - 10) / 2);

    const total = newAttributes.reduce((sum, attr) => sum + attr.value, 0);
    if (total > 83) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "Total points must not exceed 83.",
      });
      return;
    }

    dispatch({ type: "SET_ATTRIBUTES", payload: newAttributes });
    dispatch({
      type: "SET_ATTRIBUTE_ERRORS",
      payload: newAttributes.map(() => ""),
    });
    validateAttributes();
  };

  const handleRaceChange = (newRace: Race) => {
    dispatch({ type: "SET_RACE", payload: newRace });

    // Reset attribute values based on initial values and new race limits
    const newAttributes = initialAttributes.map((attr: Attribute) => {
      const newValue = 10; // Reset to initial value

      return {
        ...attr,
        value: newValue,
        modifier: Math.floor((newValue - 10) / 2),
      };
    });

    dispatch({ type: "SET_ATTRIBUTES", payload: newAttributes });
    dispatch({
      type: "SET_ATTRIBUTE_ERRORS",
      payload: newAttributes.map(() => ""),
    });
    dispatch({ type: "SET_TOTAL_POINTS", payload: 60 }); // Reset total points
    validateAttributes();
  };

  const fetchRandomName = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const name = `${data.results[0].name.first} ${data.results[0].name.last}`;
      dispatch({ type: "SET_CHARACTER_NAME", payload: name });
    } catch (error) {
      console.error("Error fetching random name:", error);
      // Fallback to a random name from the list
      const fallbackName =
        fallbackNames[Math.floor(Math.random() * fallbackNames.length)];
      dispatch({ type: "SET_CHARACTER_NAME", payload: fallbackName });
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
            onChange={(e) =>
              dispatch({ type: "SET_PLAYER_NAME", payload: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Character Name"
            value={state.characterName}
            onChange={(e) =>
              dispatch({ type: "SET_CHARACTER_NAME", payload: e.target.value })
            }
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
            {races.map((race: Race) => (
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
          <Grid
            item
            xs={12}
            key={attr.abbreviation}
            container
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={3}>
              <Typography>
                {attr.name} ({attr.abbreviation})
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Decrease">
                <Button
                  variant="outlined"
                  onClick={() => handleAttributeChange(index, -1)}
                  fullWidth
                >
                  -
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Tooltip
                title={state.attributeErrors[index]}
                arrow
                placement="top"
              >
                <TextField
                  className={`attribute-value ${
                    state.attributeErrors[index] ? "error" : ""
                  }`}
                  type="number"
                  value={attr.value}
                  onChange={(e) =>
                    handleAttributeInputChange(index, e.target.value)
                  }
                  error={!!state.attributeErrors[index]}
                  fullWidth
                  inputProps={{ style: { textAlign: "center" } }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Increase">
                <Button
                  variant="outlined"
                  onClick={() => handleAttributeChange(index, 1)}
                  fullWidth
                >
                  +
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={2}>
              <Typography align="center">
                {attr.modifier > 0 ? `+${attr.modifier}` : `${attr.modifier}`}
              </Typography>
            </Grid>
          </Grid>
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
