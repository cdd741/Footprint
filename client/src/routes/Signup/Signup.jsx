import React, { useContext } from "react";
import "./Signup.scss";
import axios from "axios";
import Cookies from "js-cookie";

import { signupUrl } from "../../utils/apis";
import { globalContext } from "../../context/GlobalContext";

function Signin(routerProps) {
  const { setUser, setLoggingInfo } = useContext(globalContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(signupUrl(), {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        bio: e.target.bio.value,
      })
      .then((res) => {
        Cookies.set("login", true);
        setLoggingInfo(true);
        setUser(res.data);
        routerProps.history.push("/");
      })
      .catch((err) => {
        alert(
          `Email "${e.target.email.value}" has been registered, please use another one!`
        );
        e.target.reset();
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">
          <h3>Usersname</h3>
          <input type="text" name="username" id="username" required />
        </label>
        <label htmlFor="email">
          <h3>Email</h3>
          <input type="email" name="email" id="email" required />
        </label>
        <label htmlFor="password">
          <h3>Password</h3>
          <input type="password" name="password" id="password" required />
        </label>
        <label htmlFor="bio">
          <h3>Bio</h3>
          <textarea name="bio" id="bio" cols="30" rows="10"></textarea>
        </label>
        <div>
          <button>Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
