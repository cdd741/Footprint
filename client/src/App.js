import React, { useState, useEffect } from "react";
import "./App.css";
// import axios from "axios";
import Header from "./common/Header/Header";
import { Route, Switch } from "react-router-dom";
import Signin from "./routes/Signin/Signin";
import Signup from "./routes/Signup/Signup";

function App() {
  // const [imageUrl, setImageUrl] = useState("");
  // const getImage = () => {
  //   axios
  //     .get(`http://localhost:8080/8f8dc85b-2f5a-470d-8cb7-784cd2bc257e`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setImageUrl(res.data);
  //     });
  // };

  // useEffect(() => {
  //   getImage();
  // }, []);
  // <form
  //   action="http://192.168.2.75:8080/upload"
  //   method="POST"
  //   encType="multipart/form-data"
  // >
  //   Select an image to upload:
  //   <input type="file" name="image" />
  //   <input type="submit" value="Upload Image" />
  // </form>
  // <img src={imageUrl} alt="img" />

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/signin"
          render={(routerProps) => {
            return <Signin {...routerProps} />;
          }}
        />
        <Route
          path="/signup"
          render={(routerProps) => {
            return <Signup {...routerProps} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
