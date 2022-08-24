import { useState } from "react";
import { Link } from "react-router-dom";
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
  const [editedTitle, setEditedTitle] = useState(eachComment.title);
  const [editedComment, setEditedComment] = useState(eachComment.content);
  const [validationErr, setValidationErr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    setValidationErr(false);
    setEditedTitle(event.target.value);
  };
  const handleCommentChange = (event) => {
    event.preventDefault();
    setValidationErr(false);
    setEditedComment(event.target.value);
  };

  const handleSubmitEdited = async (id) => {
    if (!editedTitle || !editedComment) {
      setValidationErr(true);
    } else {
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
    }
  };

  return (
    <div id="comment-wrapper" key={eachComment._id}>
      <div className="title-row">
        {isEditing === false ? (
          <p>{eachComment.title}</p>
        ) : (
          <input
            type="text"
            name="title"
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
        <div>
          {validationErr && <p>Fields can't be empty </p>}
          <button
            className="button"
            onClick={() => handleSubmitEdited(eachComment._id)}
          >
            Edit comment
          </button>

          <button className="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      )}

      <div>
        <div>
          <Link to={`/profile/${eachComment.creator._id}`}>
            Creador:{eachComment.creator.username}
          </Link>
          <p>Fecha de creación:{eachComment.createdAt}</p>
        </div>
        <div>
          <button
            className="icon-btn"
            onClick={() => handleLike(eachComment._id)}
          >
            {eachComment.likes.includes(userId) ? (
              <img
                className="icon"
                src="/images/thumbs-up-solid-green.svg"
                alt="like"
              />
            ) : (
              <img
                className="icon"
                src="/images/thumbs-up-solid.svg"
                alt="like"
              />
            )}
          </button>
          <button
            className="icon-btn"
            onClick={() => handleDislike(eachComment._id)}
          >
            {eachComment.dislikes.includes(userId) ? (
              <img
                className="icon"
                src="/images/thumbs-down-solid-red.svg"
                alt="dislike"
              />
            ) : (
              <img
                className="icon"
                src="/images/thumbs-down-solid.svg"
                alt="dislike"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
