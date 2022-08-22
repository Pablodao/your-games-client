import { useEffect, useState /*useContext*/ } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";
//import { AuthContext } from "../../context/auth.context";
import { newCommentService } from "../../services/comment.services";
import {
  gameDetailsService,
  newGameService,
} from "../../services/game.services";

function GameDetails() {
  //const { user } = useContext(AuthContext);
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [apiInfo, setApiInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [commentTitle, setCommentTitle] = useState("");
  const [isCommentTitleValid, setIsCommentTitleValid] = useState(true);
  const [comment, setComment] = useState("");
  const [isCommentValid, setIsCommentValid] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getApiInfo();
    getGameInfo();
  }, []);

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

  const getGameInfo = async () => {
    try {
      const response = await gameDetailsService(gameId);
      setGameInfo(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleCommentTitleChange = (event) => {
    setIsCommentTitleValid(true);
    return setCommentTitle(event.target.value);
  };

  const handleCommentChange = (event) => {
    setIsCommentValid(true);
    return setComment(event.target.value);
  };
  const handlePostComment = async () => {
    console.log("gameInfo", gameInfo);
    if (!gameInfo) {
      const response = await newGameService(gameId);
      setGameInfo(response.data);
      console.log("RESPONSE", response);

      const newComment = {
        title: commentTitle,
        content: comment,
        game: response.data._id,
      };

      console.log("response", response.data);

      try {
        await newCommentService(newComment, response.data._id);
        setCommentTitle("");
        setComment("");
      } catch (error) {
        // navigate("/error");
        console.log("error 1", error);
      }
    } else {
      const newComment = {
        title: commentTitle,
        content: comment,
        game: gameInfo?._id,
      };

      try {
        await newCommentService(newComment, gameInfo?._id);
        setCommentTitle("");
        setComment("");
      } catch (error) {
        // navigate("/error");
        console.log("error 2", error);
      }
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
      {gameInfo?.comments.length > 0 && (
        <Comment
          id={gameInfo?._id}
          commentTitle={commentTitle}
          comment={comment}
        />
      )}
    </div>
  );
}

export default GameDetails;
