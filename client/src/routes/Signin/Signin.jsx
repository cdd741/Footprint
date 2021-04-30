import React from "react";
import "./Signin.scss";
import axios from "axios";
import { signinUrl } from "../../utils/apis";

function Signin(routerProps) {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(signinUrl(), {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data);
        routerProps.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button>Signin</button>
      </form>
    </div>
  );
}

export default Signin;
