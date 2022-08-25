import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="wrapper">
      <div className="flex">
        <h1 className="title" style={{textAlign:"center", marginBottom:"16px"}}>Welcome where games reviews get real</h1>
        <p className="subtitle">
          Tired of paid reviews? Do you want to know if the game you are looking
          for has what you expected?
        </p>
        <img
          className="image"
          src="https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Graphics+Library/27-05-2022-Videogames-climate-05.jpg/image1440x560cropped.jpg"
          alt="hero img"
        />
        <p className="paragraph">
          In this app you will be able to find the reviews from players just
          like you. You can even rate the comments you read to help others find
          what they need. Additionally, you can also add your own rating and
          opinion.
        </p>
        <Link className="button" style={{ margin: "0 auto" }} to={"/signup"}>
          Sign up now!
        </Link>
      </div>
    </div>
  );
}

export default Home;
