import React, { useState } from "react";
import "./Header.scss";
import searchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";

function Header() {
  const [loggingInfo, setLoggingInfo] = useState({
    isLoggedin: false,
    userInfo: null,
  });

  const x = () => {
    setLoggingInfo(true);
  };
  return (
    <header className="header" onClick={x}>
      <Link to="/">
        <h3 className="header__logo">Footprint</h3>
      </Link>
      <form className="header__search-container">
        <input
          className="header__search-input"
          type="text"
          name="input"
          id="input"
        />
        <input
          className="header__search-icon"
          type="image"
          name="submit"
          id="submit"
          src={searchIcon}
          alt="search icon"
        />
      </form>
      <div className="header__user-info">
        {loggingInfo.isLoggedin && <div className="header__greeting">Hi</div>}
        {!loggingInfo.isLoggedin && (
          <>
            <Link to="/signin" className="header__link">
              <button className="header__button">signin</button>
            </Link>
            <Link to="signup" className="header__link">
              <button className="header__button">signup</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
