import React, { useContext } from "react";
import "./Signin.scss";
import axios from "axios";
import Cookies from "js-cookie";

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

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">
          <h3>Email</h3>
          <input type="email" name="email" id="email" />
        </label>
        <label htmlor="password">
          <h3>Password</h3>
          <input type="password" name="password" id="password" />
        </label>
        <div>
          <button>Signin</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
