import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function GameDetails() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getGameInfo();
  }, []);

  const getGameInfo = async () => {
    try {
      const response = await axios(
        `https://api.rawg.io/api/games/${gameId}?key=848748eade3647ecbf3ac299d1c7b50c`
      );
      console.log(response);
      setGameInfo(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }

  console.log("gameInfo", gameInfo);
  const { name, background_image, description_raw, website } = gameInfo;
  return (
    <div>
      <h1>Detalles del Juego</h1>
      <div>
        <h2>{name}</h2>
        <img src={background_image} alt="game" />
        <p>{description_raw}</p>
        <a href={website}>Website</a>
      </div>
    </div>
  );
}

export default GameDetails;
