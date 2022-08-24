function StarRating(props) {
  const { userGameValoration, handleSelect } = props;
  return (
    <div>
      <button className="icon-btn" onClick={() => handleSelect(1)}>
        {userGameValoration >= 1 ? (
          <img className="icon" src="/images/star-solid.svg" alt="1 star" />
        ) : (
          <img
            className="icon"
            src="/images/star-regular.svg"
            alt="1 empty star"
          />
        )}
      </button>
      <button className="icon-btn" onClick={() => handleSelect(2)}>
        {userGameValoration >= 2 ? (
          <img className="icon" src="/images/star-solid.svg" alt="2 star" />
        ) : (
          <img
            className="icon"
            src="/images/star-regular.svg"
            alt="2 empty star"
          />
        )}
      </button>
      <button className="icon-btn" onClick={() => handleSelect(3)}>
        {userGameValoration >= 3 ? (
          <img className="icon" src="/images/star-solid.svg" alt="3 star" />
        ) : (
          <img
            className="icon"
            src="/images/star-regular.svg"
            alt="3 empty star"
          />
        )}
      </button>
      <button className="icon-btn" onClick={() => handleSelect(4)}>
        {userGameValoration >= 4 ? (
          <img className="icon" src="/images/star-solid.svg" alt="4 star" />
        ) : (
          <img
            className="icon"
            src="/images/star-regular.svg"
            alt="4 empty star"
          />
        )}
      </button>
      <button className="icon-btn" onClick={() => handleSelect(5)}>
        {userGameValoration >= 5 ? (
          <img className="icon" src="/images/star-solid.svg" alt="5 star" />
        ) : (
          <img
            className="icon"
            src="/images/star-regular.svg"
            alt="5 empty star"
          />
        )}
      </button>
    </div>
  );
}

export default StarRating;
