import React from "react";
import "./App.css";
import "./styles/common.scss";
import { Route, Switch } from "react-router-dom";

import Header from "./common/Header/Header";
import Signin from "./routes/Signin/Signin";
import Signup from "./routes/Signup/Signup";
import Home from "./routes/Home/Home";
import Upload from "./routes/Upload/Upload";

function App() {
  return (
    <div className="App">
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
        <Route path="/">
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route
              path="/upload"
              render={(routerProps) => {
                return <Upload {...routerProps} />;
              }}
            />
            <Route
              path="/:id"
              render={(routerProps) => {
                return <Home {...routerProps} />;
              }}
            />
            <Route></Route>
          </Switch>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
