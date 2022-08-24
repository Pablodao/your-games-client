import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
import { favouriteGameService } from "../../services/user.services";

function GameDetails() {
  const { gameId } = useParams();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getApiInfo();
    getGameValoration();
    getGameComments();
  }, []);

  //* Fetch info

  const [apiInfo, setApiInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const getApiInfo = async () => {
    try {
      const response = await axios(
        `https://api.rawg.io/api/games/${gameId}?key=848748eade3647ecbf3ac299d1c7b50c`
      );
      setApiInfo(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  //* Game Valoration

  const [gameValoration, setGamegameValoration] = useState(0);
  const [newGameValoration, setNewGameValoration] = useState(0);
  const [hasValoration, setHasValoration] = useState(false);

  const getGameValoration = async () => {
    try {
      const response = await userGameValorationService(gameId);
      setGamegameValoration(response.data);
      !response.data ? setHasValoration(false) : setHasValoration(true);
      console.log(hasValoration);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleOnChangeValoration = (event) => {
    event.preventDefault();
    setNewGameValoration(event.target.value);
  };

  const handleValoration = async (gameId, event) => {
    event.preventDefault();
    const newValoration = {
      valoration: newGameValoration,
      gameId: gameId,
    };
    try {
      await newGameValorationService(gameId, newValoration);
      setHasValoration(true);
      console.log(newValoration);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleEditValoration = async (gameId, event) => {
    event.preventDefault();
    const editedValoration = {
      valoration: newGameValoration,
    };
    try {
      await editGameValorationService(gameId, editedValoration);
      console.log("valoration edited");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFavourite = async (gameId) => {
    try {
      await favouriteGameService(gameId);
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
    <div>
      <h1>Detalles del Juego</h1>
      <div>
        <h2>{apiInfo?.name}</h2>
        <img src={apiInfo?.background_image} alt="game" />
        <p>{apiInfo?.description_raw}</p>
        <a href={apiInfo?.website}>Website</a>
        <button className="button" onClick={() => handleFavourite(gameId)}>
          Add to Favourite
        </button>

        <form
          onSubmit={() => {
            hasValoration
              ? handleEditValoration(gameId)
              : handleValoration(gameId);
          }}
        >
          <input
            value={newGameValoration}
            type="number"
            onChange={handleOnChangeValoration}
          />
          <button type="submit">Valoration</button>
        </form>
      </div>

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
  );
}

export default GameDetails;
