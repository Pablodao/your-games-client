import { useEffect, useState, useContext } from "react";
import { verifyService } from "../../services/auth.services";
import {
  editUserService,
  findOneUserService,
} from "../../services/user.services";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import {
  findUserCommentsService,
  deleteCommentService,
  likeCommentService,
  dislikeCommentService,
} from "../../services/comment.services";
import Comment from "../../components/Comment";
import { uploadService } from "../../services/upload.services";
import EditProfileForm from "../../components/EditProfileForm";

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
  //Edit Profile

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

  // Edit profile
  const [imgUrl, setImgUrl] = useState("");
  const [isDescriptiontValid, setIsDescriptionValid] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Avatar change

  const handleAvatarChange = async (event) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    try {
      const response = await uploadService(form);
      console.log(response.data);
      setImgUrl(response.data.imageUrl);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    setIsDescriptionValid(true);
    return setDescription(event.target.value);
  };
  const handleEditProfile = async () => {
    const editedUser = {
      avatar: imgUrl,
      description: description,
    };
    try {
      await editUserService(userId, editedUser);
      getUserInfo()
      setIsEditing(false)
    } catch (error) {
      navigate("error");
    }
  };
  const handleDescriptionSubmit = (event) => {
    event.preventDefault();

    if (!description) {
      setIsDescriptionValid(false);
    } else {
      handleEditProfile();
    }
  };
  return (
    <div>
      <p>Nombre del usuario: {username} </p>
      <p>Email: {email}</p>

      <div>
        <p>Imagen: {avatar}</p>
        {isEditing ? (
          <EditProfileForm
            handleAvatarChange={handleAvatarChange}
            imgUrl={imgUrl}
            handleEditProfile={handleEditProfile}
            description={description}
            onChangeDescription={handleDescriptionChange}
            isDescriptiontValid={isDescriptiontValid}
            handleDescriptionSubmit={handleDescriptionSubmit}
          />
        ) : (
          <div>
            <img src={avatar} alt="" />
            <p>Descripcion: {description}</p>
          </div>
        )}
        <button onClick={handleEdit}>Edit profile</button>
      </div>

      <p>F.creacion de la cuenta: {accountDate}</p>

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
