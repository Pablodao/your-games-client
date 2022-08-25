function CommentInput(props) {
  const {
    commentTitle,
    onChangeTitle,
    isCommentTitleValid,
    comment,
    onChangeComment,
    isCommentValid,
    handleCommentSubmit,
  } = props;

  return (
    <form className="comment-form" onSubmit={handleCommentSubmit}>
      <input
        className="input"
        type="text"
        name="title"
        value={commentTitle}
        onChange={onChangeTitle}
        placeholder="Type a title for your comment"
      />
      {!isCommentTitleValid && <p>The title is required</p>}

      <textarea
        
        className="textarea"
        type="text"
        name="content"
        value={comment}
        onChange={onChangeComment}
        placeholder="Type your comment"
      />
      {!isCommentValid && <p>The content is required</p>}

      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CommentInput;
