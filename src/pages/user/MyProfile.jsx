import { useEffect, useState, useContext } from "react";
import {
  editUserService,
  findOneUserService,
} from "../../services/user.services";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  findUserCommentsService,
  deleteCommentService,
  likeCommentService,
  dislikeCommentService,
} from "../../services/comment.services";
import Comment from "../../components/Comment";
import { uploadService } from "../../services/upload.services";
import EditProfileForm from "../../components/EditProfileForm";
import { parseISO } from "date-fns";

function MyProfile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [rank, setRank] = useState("");
  const [accountDate, setAccountDate] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getUserInfo();
    getUserComments();
  }, [userId]);

  const date = parseISO(accountDate);

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
      getUserInfo();
      setIsEditing(false);
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
    <div className="wrapper">
      <div className="flex">
        <div className="row" style={{ width: "100%" }}>
          {avatar && !isEditing && (
            <img className="profile-avatar" src={avatar} alt="user avatar" />
          )}
          <div>
            {isEditing ? (
              <h1 className="title" style={{ marginBottom: "48px" }}>
                Edit profile
              </h1>
            ) : (
              <h1 className="title" style={{ marginBottom: "16px" }}>
                {username}
              </h1>
            )}
            {user._id === userId && !isEditing && (
              <p style={{ marginBottom: "16px" }}>{email}</p>
            )}
          </div>
          {user._id === userId && !isEditing && (
            <button
              style={{ marginLeft: "auto" }}
              className="button"
              onClick={handleEdit}
            >
              Edit profile
            </button>
          )}
        </div>
        <div style={{ marginRight: "auto", marginBottom: "64px" }}>
          <div>
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
              description && (
                <p style={{ marginBottom: "16px" }}>{description}</p>
              )
            )}
          </div>

          {!isEditing && (
            <p style={{ marginBottom: "16px" }}>
              Member since{" "}
              {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
            </p>
          )}

          {!isEditing && <p>Rank: {rank}</p>}
        </div>
        {favourites.length > 0 && (
          <div>
            <button
              style={{
                width: "fit-content",
                maxWidth: "none",
                marginBottom: "32px",
              }}
              className="button"
              onClick={() =>
                setShowFavourites((previousValue) => !previousValue)
              }
            >
              Show {showFavourites ? "comments" : "favourites"}
            </button>
          </div>
        )}

        {!isEditing && (
          <div>
            {showFavourites ? (
              <div>
                {favourites.map((eachFavourite) => (
                  <div>
                    <Link
                      className="link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                      to={`/games/${eachFavourite.gameId}`}
                    >
                      <img
                        className="comment-avatar"
                        src={eachFavourite.gameImg}
                        alt="game img"
                      />
                      <p>{eachFavourite.gameName}</p>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {comments.map((eachComment) => (
                  <Comment
                    setIsEditing={setIsEditing}
                    userId={user._id}
                    key={eachComment._id}
                    eachComment={eachComment}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    getGameComments={getUserComments}
                    showGame
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
