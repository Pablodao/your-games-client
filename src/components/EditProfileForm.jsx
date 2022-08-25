function EditProfileForm(props) {
  const {
    handleAvatarChange,
    imgUrl,
    handleDescriptionSubmit,
    description,
    onChangeDescription,
    isDescriptiontValid,
  } = props;
  return (
    <div>
      <img src={imgUrl} alt="new Avatar" />
      <input type="file" onChange={handleAvatarChange} />
      <form className="comment-form" onSubmit={handleDescriptionSubmit}>
        <textarea
          className="textarea"
          type="text"
          name="content"
          value={description}
          onChange={onChangeDescription}
        />
        {!isDescriptiontValid && <p>The content is required</p>}

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default EditProfileForm;
