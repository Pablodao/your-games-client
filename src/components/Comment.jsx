import { useState } from "react";
import { Link } from "react-router-dom";
import { editCommentService } from "../services/comment.services";
import { format, parseISO } from "date-fns";
function Comment(props) {
  const {
    userId,
    eachComment,
    handleDelete,
    handleLike,
    handleDislike,
    getGameComments,
    showGame
  } = props;
  const date = parseISO(eachComment.createdAt);
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
            className="input"
            type="text"
            name="title"
            value={editedTitle}
            onChange={handleTitleChange}
          />
        )}

        {userId === eachComment.creator._id && !isEditing && (
          <div>
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
        )}
      </div>
      <div>
        {isEditing === false ? (
          <p style={{ marginBottom: "16px" }}>{eachComment.content}</p>
        ) : (
          <textarea
            className="textarea"
            name="content"
            type="text"
            value={editedComment}
            onChange={handleCommentChange}
          />
        )}
        {validationErr && <p style={{ marginBottom: "16px" }}>Fields can't be empty</p>}
        {eachComment.isEdited === true && (
          <p style={{ marginBottom: "16px" }}>Comentario editado</p>
        )}
      </div>
      {showGame &&  <div style={{ marginBottom: "16px" }}>
            <Link  to={`/games/${eachComment.game}`}>Link to game</Link>
    </div>}

      <div>
        <div className="comment-info">
          { eachComment.creator.avatar && <img
            className="comment-avatar"
            src={eachComment.creator.avatar}
            alt="user avatar"
          />}
          <div>
            <Link to={`/profile/${eachComment.creator._id}`}>
              {eachComment.creator.username}
            </Link>
            <p style={{marginTop:"6px"}}>
              Date:{" "}
              {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
            </p>
          </div>
          {isEditing === true && (
            <div className="row" style={{ marginLeft: "auto" }}>
              
              <button
                className="button"
                onClick={() => handleSubmitEdited(eachComment._id)}
              >
                Save
              </button>

              <button style={{ marginLeft: "16px" }} className="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          )}
          {userId !== eachComment.creator._id && (
            <div style={{ marginLeft: "auto" }}>
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
                  style={{ marginLeft: "16px" }}
                    className="icon"
                    src="/images/thumbs-down-solid-red.svg"
                    alt="dislike"
                  />
                ) : (
                  <img
                  style={{ marginLeft: "16px" }}
                    className="icon"
                    src="/images/thumbs-down-solid.svg"
                    alt="dislike"
                  />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
