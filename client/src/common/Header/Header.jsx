import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  const [loggingInfo, setLoggingInfo] = useState({
    isLoggedin: false,
    userInfo: null,
  });
  return (
    <header className="header">
      <h3 className="header__logo">Footprint</h3>
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
          src=""
          alt="search icon"
        />
      </form>
      <div className="header__user-info">
        {loggingInfo.isLoggedin && <div className="header__greeting">Hi</div>}
        {!loggingInfo.isLoggedin && (
          <>
            <Link to="/signin">
              <button>signin</button>
            </Link>
            <Link to="signup">
              <button>signup</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
