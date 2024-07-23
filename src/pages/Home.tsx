import React from "react";
import clsx from "clsx";
import { useTheme } from "../context/ThemeContext";
import CharacterSheet from "../components/CharacterSheet";

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={clsx("app-container", {
        "dark-theme": isDarkMode,
        "light-theme": !isDarkMode,
      })}
    >
      <CharacterSheet />
    </div>
  );
};

export default Home;
