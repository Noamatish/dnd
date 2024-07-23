import React from "react";
import { Box, Typography } from "@mui/material";
import { Attribute, Race } from "../interfaces/Character";

interface GeneratedCharacterProps {
  characterName: string;
  playerName: string;
  race: Race;
  attributes: Attribute[];
}

const GeneratedCharacter: React.FC<GeneratedCharacterProps> = ({
  characterName,
  playerName,
  race,
  attributes,
}) => {
  return (
    <Box mt={3} textAlign="center">
      <img
        src={`/images/${race.toLowerCase()}.png`}
        alt={race}
        style={{ maxWidth: "200px", marginBottom: "10px" }}
      />
      <Typography variant="h6">
        {characterName} the {race}
      </Typography>
      <Box mt={2} p={2} className="character-data">
        <Typography variant="subtitle1" gutterBottom>
          Player: {playerName}
        </Typography>
        {attributes.map((attr) => (
          <Typography key={attr.abbreviation} variant="subtitle1" gutterBottom>
            {attr.name}: {attr.value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default GeneratedCharacter;
