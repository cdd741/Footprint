import React, { useState, useEffect, useContext } from "react";
import "./Header.scss";

import searchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { globalContext } from "../../context/GlobalContext";
import axios from "axios";
import {
  searchUrl,
  getLocationPostUrl,
  getUserPostUrl,
} from "../../utils/apis";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import Logo from "../../assets/logo_transparent.png";

const loggedIn = (user) => (
  <>
    <Link to="/upload" className="header__link header__link--add">
      <div className="header__button header__button--add">
        <AddIcon />
      </div>
    </Link>
    <Link to="/upload" className="header__link header__link--notification">
      <div className="header__button header__button--notification">
        <NotificationsIcon />
      </div>
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
      <h3 className="header__button header__button--signin"> signin </h3>
    </Link>
    <Link to="signup" className="header__link">
      <h3 className="header__button header__button--signup"> signup </h3>
    </Link>
  </>
);

function Header(props) {
  const { user, loggingInfo, setPostInfo } = useContext(globalContext);
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
    setTimeout(function () {
      e.preventDefault();
      e.target.value = "";
      setSearchResult({});
    }, 350);
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    console.log("fuck");
    const id = e.target.id;
    axios
      .get(getLocationPostUrl(id))
      .then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserSearch = (e) => {
    e.preventDefault();
    console.log("???");
    const id = e.target.id;
    axios
      .get(getUserPostUrl(id))
      .then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <img className="header__logo" src={Logo} alt="logo" />
          </Link>
          <div className="header__links header__links--mobile">
            {loggingInfo && loggedIn(user)}
            {!loggingInfo && notLoggedIn}
          </div>
        </div>
        <div className="header__right">
          <div
            className={`header__search-bar${
              Object.keys(searchResult).length !== 0
                ? " header__search-bar--expand"
                : ""
            }`}
            onBlur={handleOnBlur}
          >
            <form className="header__search-container" autoComplete="off">
              <input
                className="header__search-input"
                type="text"
                name="input"
                id="input"
                value={searchTerm}
                onChange={handleOnChange}
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
                        <li
                          className="dropdown__item"
                          id={locationKey}
                          tabIndex="0"
                          onClick={handleLocationSearch}
                        >
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
                          id={searchResult.user[userKey]}
                          onClick={handleUserSearch}
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
        </div>
      </header>
    </div>
  );
}

export default Header;
