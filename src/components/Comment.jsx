import { useEffect, useState } from "react";
import {
  deleteCommentService,
  findCommentService,
} from "../services/comment.services";

function Comment(props) {
  const { id } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getGameComments();
  }, []); //TODO Necesito agregar algo para que se actualice cuando cambie

  const getGameComments = async () => {
    try {
      const response = await findCommentService(id);
      console.log("Response Game comments", response.data);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    deleteCommentService(id);
  };
  console.log("Comments", comments);

  return (
    <div>
      {comments.map((eachComment) => {
        return (
          <div key={eachComment._id}>
            <p>Título:{eachComment.title} </p>
            <p>Contenido:{eachComment.content}</p>
            <p>Creador:{eachComment.creator.username}</p>
            <p>Fecha de creación:{eachComment.createdAt}</p>
            <p>Comentario editado</p>
            <p>Boton editar</p>
            <button onClick={() => handleDelete(eachComment._id)}> Borrar comentario</button>
            <p>Boton like</p>
            <p>Boton dislike</p>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
