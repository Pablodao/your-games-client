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
  console.log(eachComment);

  return (
    <div id="comment-wrapper" key={eachComment._id}>
      <div className="title-row">
        {isEditing === false ? (
          <p>{eachComment.title}</p>
        ) : (
          <input
            type="text"
            name="title"
            placeholder={eachComment.title}
            value={editedTitle}
            onChange={handleTitleChange}
          />
        )}
        <button className="icon-btn" onClick={handleEdit}>
          <img className="icon" src="/images/pencil-solid.svg" alt="edit" />
        </button>
        <button
          className="icon-btn"
          onClick={() => handleDelete(eachComment._id)}
        >
          <img className="icon" src="/images/trash-solid.svg" alt="" />
        </button>
      </div>
      <div>
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

        {eachComment.isEdited === true && <p>Comentario editado</p>}
      </div>

      {isEditing === true && (
        <button
          className="button"
          onClick={() => handleSubmitEdited(eachComment._id)}
        >
          Edit comment
        </button>
      )}

      <div>
        <div>
          <p>Creador:{eachComment.creator.username}</p>
          <p>Fecha de creación:{eachComment.createdAt}</p>
        </div>
        <div>
          <button
            className="icon-btn"
            onClick={() => handleLike(eachComment._id)}
          >
           <img style={eachComment.likes.includes(userId)?{fill: "green"}:{fill: "lightgray"} } className="icon" src="/images/thumbs-up-solid.svg" alt="like" />
          </button>
          <button
            className="icon-btn"
            onClick={() => handleDislike(eachComment._id)}
          >
           <img style={eachComment.dislikes.includes(userId) ? {fill: "red"}:{fill: "lightgray"} } className="icon" src="/images/thumbs-down-solid.svg" alt="like" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
