import React, { useEffect, useContext } from "react";
import "./Signup.scss";
import axios from "axios";
import Cookies from "js-cookie";
import faker from "faker";

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
        avatar: faker.image.avatar(),
      })
      .then((res) => {
        console.log(res.data);
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

  useEffect(() => {
    document.body.style.backgroundImage = "";
  }, []);

  return (
    <div>
      <div class="segment">
        <h1>Sign Up</h1>
      </div>

      <form class="signinform signinform--onboard" onSubmit={handleOnSubmit}>
        <label class="signinLabel" htmlFor="username">
          <input
            class="signininput"
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            required
          />
        </label>
        <label class="signinLabel" htmlFor="email">
          <input
            class="signininput"
            type="email"
            name="email"
            id="email"
            placeholder="Email Addres"
            required
          />
        </label>
        <label class="signinLabel" htmlFor="password">
          <input
            class="signininput"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </label>
        <label class="signinLabel" htmlFor="bio">
          <textarea
            class="signTextarea"
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            placeholder="Bio"
          ></textarea>
        </label>
        <div>
          <button class="signinButton">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
