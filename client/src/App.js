import React from "react";
import "./App.css";
import "./styles/common.scss";
import { Route, Switch } from "react-router-dom";

import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import Signin from "./routes/Signin/Signin";
import Signup from "./routes/Signup/Signup";
import Home from "./routes/Home/Home";
import Upload from "./routes/Upload/Upload";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const beamsClient = new PusherPushNotifications.Client({
  instanceId: "0cb7ba44-91c2-4d40-8d62-f94d703f6eb5",
});

beamsClient
  .start()
  .then(() => beamsClient.addDeviceInterest("hello"))
  .then(() => console.log("Successfully registered and subscribed!"))
  .catch(console.error);

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
              <Footer />
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
                return (
                  <>
                    <Home {...routerProps} />
                    <Footer />
                  </>
                );
              }}
            />
          </Switch>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
