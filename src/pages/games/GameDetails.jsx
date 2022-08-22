import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";
import { AuthContext } from "../../context/auth.context";
import { newCommentService } from "../../services/comment.services";
import { gameDetailsService } from "../../services/game.services";

function GameDetails() {
  const { user } = useContext(AuthContext);
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  //TODO Comentarios
  const [commentTitle, setCommentTitle] = useState("");
  const [isCommentTitleValid, setIsCommentTitleValid] = useState(true);
  const [comment, setComment] = useState("");
  const [isCommentValid, setIsCommentValid] = useState(true);
  const [id, setId] = useState("");
  //TODO Comentarios

  const navigate = useNavigate();

  useEffect(() => {
    getGameInfo();
  }, []);

  const getGameInfo = async () => {
    try {
      const gameInfo = await gameDetailsService(gameId);
      setId(gameInfo.data._id);
      const response = await axios(
        `https://api.rawg.io/api/games/${gameId}?key=848748eade3647ecbf3ac299d1c7b50c`
      );
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
    const newComment = {
      title: commentTitle,
      content: comment,
      game: id,
    };
    console.log(newComment);
    try {
      await newCommentService(newComment, id);
      setCommentTitle("");
      setComment("");
    } catch (error) {
      console.log(error);
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

      <CommentInput
        commentTitle={commentTitle}
        isCommentTitleValid={isCommentTitleValid}
        onChangeTitle={handleCommentTitleChange}
        comment={comment}
        isCommentValid={isCommentValid}
        onChangeComment={handleCommentChange}
        handleCommentSubmit={handleCommentSubmit}
      />
      <Comment id={id} />
    </div>
  );
}

export default GameDetails;
