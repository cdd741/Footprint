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
  const [searchResult, setSearchResult] = useState([]);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    axios.post(searchUrl(), { searchTerm: e.target.value }).then((res) => {
      console.log(res.data);
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
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
      <form className="header__search-container" autoComplete="off">
        <input
          className="header__search-input"
          type="text"
          name="input"
          id="input"
          value={searchTerm}
          onChange={handleOnChange}
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
      {searchResult && (
        <div className="dropdown">
          {searchResult.location && (
            <div className="dropdown__container dropdown__container--location">
              <div className="dropdown__label dropdown__label--location">
                locations
              </div>
              searchResult.location.map()
            </div>
          )}
          {searchResult.user && (
            <div className="dropdown__container dropdown__container--user">
              <div className="dropdown__label dropdown__label--user">users</div>
              searchResult.user.map()
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
