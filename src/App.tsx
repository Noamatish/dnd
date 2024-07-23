import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { CharacterProvider } from "./context/CharacterContext";
import Home from "./pages/Home";

const App = () => (
  <ThemeProvider>
    <CharacterProvider>
      <Navbar />
      <div className="main-container">
        <Home />
      </div>
    </CharacterProvider>
  </ThemeProvider>
);

export default App;
