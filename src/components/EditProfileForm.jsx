function EditProfileForm(props) {
  const {
    setIsEditing,
    handleAvatarChange,
    imgUrl,
    handleDescriptionSubmit,
    description,
    onChangeDescription,
    isDescriptiontValid,
  } = props;
  return (
    <div>
      <div className="row" style={{ flexDirection: "column" }}>
        {imgUrl && (
          <img className="avatar-preview" src={imgUrl} alt="new Avatar" />
        )}
        <input type="file" onChange={handleAvatarChange} />
      </div>

      <form className="comment-form" onSubmit={handleDescriptionSubmit}>
        <textarea
          className="textarea"
          type="text"
          name="content"
          value={description}
          onChange={onChangeDescription}
        />
        {!isDescriptiontValid && <p>The content is required</p>}
        <div className="row">
          <button className="button" type="submit">
            Submit
          </button>
          <button
            style={{ marginLeft: "16px" }}
            className="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditProfileForm;
