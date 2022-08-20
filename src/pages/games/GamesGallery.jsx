import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

function GamesGallery() {
  const [games, setGames] = useState([]);

  const getGames = async () => {
    try {
      const response = await axios(
        "https://api.rawg.io/api/games?key=848748eade3647ecbf3ac299d1c7b50c&page_size=10"
      );
      console.log("response GamesService", response.data.results);
      setGames(response.data.results);
    } catch (error) {
      setGames([]);
    }
  };
  useEffect(() => {
    getGames();
  }, []);

  return (
    <div>
      {games.map((eachGame) => {
        return (
            //TODO Cambiar key por {eachGame._id}
          <Link key={eachGame.id} to={`/games/${eachGame.id}`}>
            <div  style={{ border: "1px solid black" }}>
              <h2>{eachGame.name}</h2>
              <img src={eachGame.background_image} height="200px" alt="" />
              <p>Rating:5</p>
              <p>Comments: 100</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default GamesGallery;
