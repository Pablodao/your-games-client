import "./App.css";
//? Packages
import { Routes, Route } from "react-router-dom";
//? Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import GamesGallery from "./pages/games/GamesGallery";
import GameDetails from "./pages/games/GameDetails";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/games" element={<GamesGallery />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
      </Routes>
    </div>
  );
}

export default App;
