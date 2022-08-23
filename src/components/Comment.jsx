import { useState } from "react";
import { editCommentService } from "../services/comment.services";

function Comment(props) {
  const {
    userId,
    eachComment,
    handleDelete,
    handleLike,
    handleDislike,
    getGameComments,
  } = props;

  // Edit
  const [editedTitle, setEditedTitle] = useState();
  const [editedComment, setEditedComment] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => setEditedTitle(event.target.value);
  const handleCommentChange = (event) => setEditedComment(event.target.value);

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
  console.log(eachComment)

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
          onChange={handleCommentChange}
        />
      )}
      {isEditing === true && (
        <button className="button" onClick={() => handleSubmitEdited(eachComment._id)}>
          Edit comment
        </button>
      )}

      <p>Creador:{eachComment.creator.username}</p>
      <p>Fecha de creación:{eachComment.createdAt}</p>
      <p>{eachComment.likes.includes(userId) ? "Liked": "Not Liked" }</p>
      <p>{eachComment.dislikes.includes(userId) ? "Disliked": "Not Disliked" }</p>
      {eachComment.isEdited === true && <p>Comentario editado</p>}
      <button className="button" onClick={handleEdit}>Editar comentario</button>
      <button className="button"onClick={() => handleDelete(eachComment._id)}>
        Borrar comentario
      </button>
      <button  className="button" onClick={()=> handleLike(eachComment._id)}>Like</button>
      <button className="button" onClick={()=> handleDislike(eachComment._id)}>Dislike</button>
    </div>
  );
}

export default Comment;
