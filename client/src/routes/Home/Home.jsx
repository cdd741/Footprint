import React from "react";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__info">
          <div className="home_profile">
            <div className="profile-pic">
              <img src="" alt="profile" />
            </div>
          </div>
          <div className="home__name-location-container">
            <div className="home__name">Username</div>
            <div className="home__location">
              Queens Park, Toronto, Ontario, Canada
            </div>
          </div>
          <div className="home__date">11/10/2020</div>
        </div>
        <div className="home__description">Hello World</div>
      </div>
      <div className="home__comment"></div>
    </div>
  );
}

export default Home;
