import React, { useState, useEffect, useContext } from "react";
import "./Header.scss";
import Cookies from "js-cookie";
import searchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { globalContext } from "../../context/GlobalContext";
import axios from "axios";
import { searchUrl } from "../../utils/apis";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";

const loggedIn = (user) => (
  <>
    <Link to="/upload" className="header__link">
      {/* <img
        className="header__button header__button--icon"
        src={AddIcon}
        alt="Add Icon"
      /> */}
      <AddIcon className="header__button header__button--icon" />
      <h3 className="header__button header__button--text">upload</h3>
    </Link>
    <Link to="/upload" className="header__link">
      <NotificationsIcon className="header__button header__button--icon" />
      {/* <img
        className="header__button header__button--icon"
        src={CommentIcon}
        alt="Message Icon"
      /> */}
      <h3 className="header__button header__button--text">message</h3>
    </Link>
    <img
      className="header__profile-picture"
      src={user.avatar}
      alt="profile picture"
    />
  </>
);

const notLoggedIn = (
  <>
    <Link to="/signin" className="header__link">
      <h3 className="header__button"> signin </h3>
    </Link>
    <Link to="signup" className="header__link">
      <h3 className="header__button"> signup </h3>
    </Link>
  </>
);

function Header(props) {
  const { user, loggingInfo } = useContext(globalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);

    axios.post(searchUrl(), { searchTerm: e.target.value }).then((res) => {
      console.log(res.data);
      setSearchResult(res.data);
    });
  };

  const handleOnBlur = (e) => {
    e.preventDefault();
    e.target.value = "";
    setSearchResult({});
  };

  const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  });
  const classes = useStyles();

  return (
    <div className="header__container">
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
        <div
          className={`header__search-bar${
            Object.keys(searchResult).length !== 0
              ? " header__search-bar--expand"
              : ""
          }`}
        >
          <form className="header__search-container" autoComplete="off">
            <input
              className="header__search-input"
              type="text"
              name="input"
              id="input"
              value={searchTerm}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
            <img
              className="header__search-icon"
              src={searchIcon}
              alt="search icon"
            />
          </form>
          {Object.keys(searchResult).length !== 0 && (
            <div className="dropdown">
              {Object.keys(searchResult.location).length !== 0 && (
                <div className="dropdown__container dropdown__container--location">
                  <div className="dropdown__label dropdown__label--location">
                    locations
                  </div>
                  <ul className="dropdown__items">
                    {Object.keys(searchResult.location).map((locationKey) => (
                      <li className="dropdown__item" id={locationKey}>
                        {locationKey}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {Object.keys(searchResult.user).length !== 0 && (
                <div className="dropdown__container dropdown__container--user">
                  <div className="dropdown__label dropdown__label--user">
                    users
                  </div>
                  <ul className="dropdown__items">
                    {Object.keys(searchResult.user).map((userKey) => (
                      <li
                        className="dropdown__item"
                        id={searchResult.user[user]}
                      >
                        {userKey}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="header__links header__links--tablet">
          {loggingInfo && loggedIn(user)}
          {!loggingInfo && notLoggedIn}
        </div>
      </header>
    </div>
  );
}

export default Header;
