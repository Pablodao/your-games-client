import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteCommentService,
  editCommentService,
  findCommentService,
} from "../services/comment.services";

function Comment(props) {
  const { id } = props;
  const navigate = useNavigate()
  const [comments, setComments] = useState([]);
  const [editedTitle, setEditedTitle] = useState();
  const [editedComment, setEditedComment] = useState();
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    getGameComments();
  }, []);

  const getGameComments = async () => {
    try {
      const response = await findCommentService(id);
      setComments(response.data);
    } catch (error) {
      navigate("/error")
      
    }
  };
  const handleDelete = (id) => {
    deleteCommentService(id);
    getGameComments();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => setEditedTitle(event.target.value);
  const handlecomentChange = (event) => setEditedComment(event.target.value);

  const handleSubmitEdited = async (id) => {
    const newComment = {
      title: editedTitle,
      content: editedComment,
    };
    try {
      await editCommentService(newComment, id);
      setIsEditing(false);
      getGameComments();
    } catch (error) {
      navigator("/error");
    }
  };


  return (
    <div>
      {comments.map((eachComment) => {
        return (
          <div key={eachComment._id}>
            {isEditing === false ? (
              <p>Título:{eachComment.title}</p>
            ) : (
              <input
                type="text"
                name="title"
                placeholder={eachComment.title}
                value={editedTitle}
                onChange={handleTitleChange}
              />
            )}
            {isEditing === false ? (
              <p>Contenido:{eachComment.content}</p>
            ) : (
              <input
                name="content"
                type="text"
                value={editedComment}
                onChange={handlecomentChange}
              />
            )}
            {isEditing === true && (
              <button onClick={() => handleSubmitEdited(eachComment._id)}>
                Edit comment
              </button>
            )}

            <p>Creador:{eachComment.creator.username}</p>
            <p>Fecha de creación:{eachComment.createdAt}</p>
            <p>Comentario editado</p>
            <button onClick={handleEdit}>Editar comentario</button>
            <button onClick={() => handleDelete(eachComment._id)}>
              Borrar comentario
            </button>
            <p>Boton like</p>
            <p>Boton dislike</p>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
