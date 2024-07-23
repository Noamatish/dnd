import React from "react";
import { Grid, Typography, Button, TextField, Tooltip } from "@mui/material";
import { Attribute } from "../interfaces/Character";

interface AttributeRowProps {
  attr: Attribute;
  index: number;
  handleChange: (index: number, delta: number) => void;
  handleInputChange: (index: number, value: string) => void;
  error: string;
}

const AttributeRow: React.FC<AttributeRowProps> = ({
  attr,
  index,
  handleChange,
  handleInputChange,
  error,
}) => (
  <Grid item xs={12} container alignItems="center" spacing={1}>
    <Grid item xs={3}>
      <Typography>
        {attr.name} ({attr.abbreviation})
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Tooltip title="Decrease">
        <Button
          variant="outlined"
          onClick={() => handleChange(index, -1)}
          fullWidth
        >
          -
        </Button>
      </Tooltip>
    </Grid>
    <Grid item xs={3}>
      <Tooltip title={error} arrow placement="top">
        <TextField
          className={`attribute-value ${error ? "error" : ""}`}
          type="number"
          value={attr.value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          error={!!error}
          fullWidth
          inputProps={{ style: { textAlign: "center" } }}
        />
      </Tooltip>
    </Grid>
    <Grid item xs={2}>
      <Tooltip title="Increase">
        <Button
          variant="outlined"
          onClick={() => handleChange(index, 1)}
          fullWidth
        >
          +
        </Button>
      </Tooltip>
    </Grid>
    <Grid item xs={2}>
      <Typography align="center">
        {attr.modifier >= 0 ? `+${attr.modifier}` : `${attr.modifier}`}
      </Typography>
    </Grid>
  </Grid>
);

export default AttributeRow;
