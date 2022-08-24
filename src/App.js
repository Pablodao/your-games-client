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
import MyProfile from "./pages/user/MyProfile";
import IsPrivate from "./components/IsPrivate";
function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/games"
          element={
            <IsPrivate>
              <GamesGallery />
            </IsPrivate>
          }
        />
        <Route
          path="/games/:gameId"
          element={
            <IsPrivate>
              <GameDetails />
            </IsPrivate>
          }
        />

        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              <MyProfile />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
