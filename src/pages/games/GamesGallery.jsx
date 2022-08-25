import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { gameListService } from "../../services/api.services";

function GamesGallery() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasPrevious, setHasPrevious] = useState("");
  const [hasNext, setHasNext] = useState("");

  const getGames = async () => {
    try {
      const response = await gameListService(page);
      
      setGames(response.data.results);
      setHasNext(response.data.next);
      setHasPrevious(response.data.previous);
    } catch (error) {
      setGames([]);
    }
  };

  useEffect(() => {
    getGames();
  }, [page]);

  const handleNextPage = () => {
    setPage((previousValue) => previousValue + 1);
  };

  const handlePreviousPage = () => {
    setPage((previousValue) => previousValue - 1);
  };

  return (
    <div className="wrapper">
      <div className="grid">
        {games.map((eachGame) => {
          return (
            <Link
              className="grid-element"
              key={eachGame.id}
              to={`/games/${eachGame.id}`}
            >
              <div>
                <h2>{eachGame.name}</h2>
                <img src={eachGame.background_image} height="200px" alt="" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pagination">
        <button
          className="button"
          disabled={!hasPrevious}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <button className="button" disabled={!hasNext} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default GamesGallery;
