import React, { useEffect, useContext } from "react";
import "./Signin.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { signinUrl } from "../../utils/apis";
import { globalContext } from "../../context/GlobalContext";

function Signin(routerProps) {
  const { setUser, setLoggingInfo } = useContext(globalContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(signinUrl(), {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data);
        Cookies.set("login", true);
        setLoggingInfo(true);
        setUser(res.data);
        routerProps.history.push("/");
      })
      .catch((err) => {
        alert(`Wrong user email or password, please try again.`);
        console.log(err);
      });
  };

  useEffect(() => {
    document.body.style.backgroundImage = "";
  }, []);

  return (
    <div>
      <div class="segment">
        <h1>Sign In</h1>
      </div>

      <form class="signinform signinform--onboard" onSubmit={handleOnSubmit}>
        <label class="signinLabel" htmlFor="email">
          <input
            class="signininput"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
        </label>
        <label class="signinLabel" htmlor="password">
          <input
            class="signininput"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
        <div>
          <button class="signinButton" onSubmit={handleOnSubmit}>
            Submit
          </button>
        </div>
        <div class="segment">
          <Link to="/signup">
            <button class="signinButton">Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
