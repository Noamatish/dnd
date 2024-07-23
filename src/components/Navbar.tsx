import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Switch } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../context/ThemeContext";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <AppBar color="warning" position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          D&D Character Sheet
        </Typography>
        <IconButton edge="end" color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
