function CommentInput(props) {
  const {
    commentTitle,
    onChangeTitle,
    isCommentTitleValid,
    comment,
    onChangeComment,
    isCommentValid,
    handleCommentSubmit
  } = props;

  return (
    <form onSubmit={handleCommentSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={commentTitle}
        onChange={onChangeTitle}
        placeholder="Type a title for your comment"
      />
      {!isCommentTitleValid && <p>The title is required</p>}

      <textarea
        type="text"
        name="content"
        value={comment}
        onChange={onChangeComment}
        placeholder="Type your comment"
      />
      {!isCommentValid && <p>The content is required</p>}

        <button type="submit" >Submit</button>

    </form>
  );
}

export default CommentInput;
