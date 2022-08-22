import { useEffect, useState, useContext } from "react";
import { verifyService } from "../../services/auth.services";
import { findUserService } from "../../services/user.services";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await findUserService(user._id);


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
  return (
    <div>
      <p>Nombre del usuario: {username} </p>
      <p>Email: {email}</p>
      <p>Imagen: {avatar}</p>
      <p>Descripcion: {description}</p>
      <p>F.creacion de la cuenta: {accountDate}</p>
      <p>Lista de comentarios: {}</p>
      <p>Lista de favoritos: {favourites}</p>
      <p>rango: {rank}</p>
    </div>
  );
}

export default MyProfile;
