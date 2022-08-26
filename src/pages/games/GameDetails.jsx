import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";
import { AuthContext } from "../../context/auth.context";
import {
  findCommentService,
  newCommentService,
  deleteCommentService,
  likeCommentService,
  dislikeCommentService,
} from "../../services/comment.services";
import {
  newGameValorationService,
  userGameValorationService,
  allGameValorationService,
  editGameValorationService,
} from "../../services/game.services";
import {
  favouriteGameService,
  userFavouriteGames,
} from "../../services/user.services";
import StarRating from "../../components/StarRating";
import { gameDetailsService } from "../../services/api.services";

function GameDetails() {
  const { gameId } = useParams();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getApiInfo();
    getGameValorations();
    getUserGameValoration();
    getGameComments();
    getUserFavourites();
  }, []);

  //* Fetch info

  const [apiInfo, setApiInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const getApiInfo = async () => {
    if (!apiInfo) {
      try {
        const response = await gameDetailsService(gameId);
        setApiInfo(response.data);
      } catch (error) {
        navigate("/error");
      }
    }
  };

  //* Game Valoration
  const [gameValorations, setGameValorations] = useState(0);
  const [userGameValoration, setUserGameValoration] = useState(0);
  const [hasValoration, setHasValoration] = useState(false);

  const getGameValorations = async () => {
    try {
      const response = await allGameValorationService(gameId);
      let sum = 0;
      response.data.forEach((eachValoration) => {
        sum = sum + eachValoration.valoration;
      });

      const mean = sum > 0 ? sum / response.data.length : 0;

      setGameValorations(mean.toFixed(1));
    } catch (error) {
      navigate("/error");
    }
  };

  const getUserGameValoration = async () => {
    try {
      const response = await userGameValorationService(gameId);
      setUserGameValoration(response.data?.valoration);
      !response.data ? setHasValoration(false) : setHasValoration(true);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleValoration = async (valoration) => {
    const newValoration = {
      valoration: valoration,
      gameId: gameId,
    };
    try {
      await newGameValorationService(gameId, newValoration);
      setHasValoration(true);
      setUserGameValoration(valoration);
      getGameValorations();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleEditValoration = async (valoration) => {
    const editedValoration = {
      valoration: valoration,
    };
    try {
      await editGameValorationService(gameId, editedValoration);
      setUserGameValoration(valoration);
      getGameValorations();
    } catch (error) {
      navigate("/error");
    }
  };

  //* Favourites
  const [userFavourites, setUserFavourites] = useState([]);

  const getUserFavourites = async () => {
    try {
      const response = await userFavouriteGames();
      setUserFavourites(response.data.favourites);
    } catch (error) {
      navigate("/error");
    }
  };
  const handleFavourite = async (gameId) => {
    const gameInfo = {
      gameName: apiInfo?.name,
      gameImg: apiInfo?.background_image,
    };
    try {
      await favouriteGameService(gameId, gameInfo);
      getUserFavourites();
    } catch (error) {
      navigate("/error");
    }
  };

  //* Comment

  // Create
  const [commentTitle, setCommentTitle] = useState("");
  const [isCommentTitleValid, setIsCommentTitleValid] = useState(true);
  const [comment, setComment] = useState("");
  const [isCommentValid, setIsCommentValid] = useState(true);

  const handleCommentTitleChange = (event) => {
    event.preventDefault();
    setIsCommentTitleValid(true);
    return setCommentTitle(event.target.value);
  };

  const handleCommentChange = (event) => {
    event.preventDefault();
    setIsCommentValid(true);
    return setComment(event.target.value);
  };

  const handlePostComment = async () => {
    const newComment = {
      title: commentTitle,
      content: comment,
      game: gameId,
    };
    try {
      await newCommentService(newComment, gameId);
      setCommentTitle("");
      setComment("");
      getGameComments();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!commentTitle) {
      setIsCommentTitleValid(false);
    }
    if (!comment) {
      setIsCommentValid(false);
    }

    if (commentTitle && comment) {
      handlePostComment();
    }
  };

  // Get
  const [comments, setComments] = useState([]);

  const getGameComments = async () => {
    try {
      const response = await findCommentService(gameId);

      setComments(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  // Like & Dislike

  const handleLike = async (id) => {
    try {
      await likeCommentService(id);
      getGameComments();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDislike = async (id) => {
    try {
      await dislikeCommentService(id);
      getGameComments();
    } catch (error) {
      navigate("/error");
    }
  };

  // Delete
  const handleDelete = (id) => {
    deleteCommentService(id);
    getGameComments();
  };

  //* Error handle
  const navigate = useNavigate();

  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }

  return (
    <div className="wrapper">
      <div className="flex">
        <h1 style={{ marginBottom: "32px" }} className="title">
          {apiInfo?.name}
        </h1>

        <img className="image" src={apiInfo?.background_image} alt="game" />
        <div className="row" style={{ marginBottom: "32px" }}>
          <StarRating
            handleSelect={
              hasValoration ? handleEditValoration : handleValoration
            }
            userGameValoration={userGameValoration}
          />
          <button
            style={{ marginLeft: "16px" }}
            className="icon-btn"
            onClick={() => handleFavourite(gameId)}
          >
            {userFavourites.filter(
              (eachFavourite) => eachFavourite.gameId === gameId
            ).length === 0 ? (
              <img
                className="icon"
                src="/images/heart-regular.svg"
                alt="empty heart"
              />
            ) : (
              <img
                className="icon"
                src="/images/heart-solid.svg"
                alt="empty heart"
              />
            )}
          </button>

          <p className="row" style={{ marginLeft: "16px" }}>
            <img
              className="icon"
              src="/images/star-solid.svg"
              alt="Valoration: "
            />
            {gameValorations}
          </p>
          <a
            className="link"
            style={{ marginLeft: "16px" }}
            href={apiInfo?.website}
          >
            Website
          </a>
        </div>

        <p style={{ maxWidth: "600px", textAlign: "justify" }}>
          {apiInfo?.description_raw}
        </p>

        <CommentInput
          commentTitle={commentTitle}
          isCommentTitleValid={isCommentTitleValid}
          onChangeTitle={handleCommentTitleChange}
          comment={comment}
          isCommentValid={isCommentValid}
          onChangeComment={handleCommentChange}
          handleCommentSubmit={handleCommentSubmit}
        />

        {comments.map((eachComment) => (
          <Comment
            userId={user._id}
            key={eachComment._id}
            eachComment={eachComment}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleDislike={handleDislike}
            getGameComments={getGameComments}
          />
        ))}
      </div>
    </div>
  );
}

export default GameDetails;
