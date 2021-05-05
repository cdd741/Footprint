import React, { useState, useEffect, useContext } from "react";
import "./Header.scss";
import Cookies from "js-cookie";
import searchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { globalContext } from "../../context/GlobalContext";

const loggedIn = (user) => (
  <>
    <Link to="/upload" className="header__link">
      <button className="header__button">upload</button>
    </Link>
    <Link to="/upload" className="header__link">
      <button className="header__button">message</button>
    </Link>
    <p>Hi! {user.username}</p>
  </>
);

const notLoggedIn = (
  <>
    <Link to="/signin" className="header__link">
      <button className="header__button">signin</button>
    </Link>
    <Link to="signup" className="header__link">
      <button className="header__button">signup</button>
    </Link>
  </>
);

function Header(props) {
  const { user, loggingInfo } = useContext(globalContext);

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <h3 className="header__logo">Footprint</h3>
        </Link>
        <div className="header__links header__links--mobile">
          {loggingInfo && loggedIn(user)}
          {!loggingInfo && notLoggedIn}
        </div>
      </div>
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
      <div className="header__links header__links--tablet">
        {loggingInfo && loggedIn(user)}
        {!loggingInfo && notLoggedIn}
      </div>
    </header>
  );
}

export default Header;
