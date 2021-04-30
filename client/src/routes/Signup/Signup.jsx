import React from "react";
import "./Signup.scss";
import axios from "axios";
import { signupUrl } from "../../utils/apis";

function Signin(routerProps) {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(signupUrl(), {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data);
        routerProps.history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">
          <h3>Usersname</h3>
          <input type="text" name="username" id="username" />
        </label>
        <label htmlFor="email">
          <h3>Email</h3>
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          <h3>Password</h3>
          <input type="password" name="password" id="password" />
        </label>

        <button>Signin</button>
      </form>
    </div>
  );
}

export default Signin;
