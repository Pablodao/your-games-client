import { useEffect, useState, useContext } from "react";
import { verifyService } from "../../services/auth.services";
import { findOneUserService } from "../../services/user.services";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import {
  findUserCommentsService,
  deleteCommentService,
  likeCommentService,
  dislikeCommentService,
} from "../../services/comment.services";
import Comment from "../../components/Comment";

function MyProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [rank, setRank] = useState("");
  const [accountDate, setAccountDate] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserInfo();
    getUserComments();
  }, [userId]);

  const getUserInfo = async () => {
    try {
      const response = await findOneUserService(userId);

      const {
        avatar,
        createdAt,
        email,
        username,
        description,
        rank,
        favourites,
      } = response.data;

      setUsername(username);
      setAvatar(avatar);
      setDescription(description);
      setRank(rank);
      setAccountDate(createdAt);
      setEmail(email);
      setFavourites(favourites);
    } catch (error) {
      navigate("/error");
    }
  };

  const getUserComments = async () => {
    try {
      const response = await findUserCommentsService(userId);
      setComments(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  // Like & Dislike

  const handleLike = async (id) => {
    try {
      await likeCommentService(id);
      getUserComments();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDislike = async (id) => {
    try {
      await dislikeCommentService(id);
      getUserComments();
    } catch (error) {
      navigate("/error");
    }
  };

  // Delete
  const handleDelete = (id) => {
    deleteCommentService(id);
    getUserComments();
  };

  return (
    <div>
      <p>Nombre del usuario: {username} </p>
      <p>Email: {email}</p>
      <p>Imagen: {avatar}</p>
      <p>Descripcion: {description}</p>
      <p>F.creacion de la cuenta: {accountDate}</p>

      <p>Lista de favoritos: {favourites}</p>
      <p>rango: {rank}</p>

      {comments.map((eachComment) => (
        <Comment
          userId={userId}
          key={eachComment._id}
          eachComment={eachComment}
          handleDelete={handleDelete}
          handleLike={handleLike}
          handleDislike={handleDislike}
          getGameComments={getUserComments}
        />
      ))}
    </div>
  );
}

export default MyProfile;
