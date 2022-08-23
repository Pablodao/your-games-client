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
import { gameDetailsService } from "../../services/game.services";

function GameDetails() {
  const { gameId } = useParams();
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    getApiInfo();
    getGameInfo();
    getGameComments();
  }, []);

  //* Fetch info
  const [gameInfo, setGameInfo] = useState(null);
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

  const getGameInfo = async () => {
    try {
      const response = await gameDetailsService(gameId);

      setGameInfo(response.data);
      setIsFetching(false);
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
      game: gameId,
    };

    try {
      await newCommentService(newComment, gameId);
      setCommentTitle("");
      setComment("");
      getGameComments();
    } catch (error) {
      // navigate("/error");
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
