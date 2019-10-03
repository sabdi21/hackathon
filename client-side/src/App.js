import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import axios from 'axios';

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";

// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";

// others
import BASE_URL from './constants';

const App = () => {

  const [user, setUser] = useState({})

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    // see if there is a token in localStorage
    let token = localStorage.getItem("authToken");

    if (token) {
      // console.log(`token found: ${token}`)
      axios
        .get(`${BASE_URL}/auth/current/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setUser({ user: null });
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} user={user} />
        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} user={user}/>}
        />
        <Route
          path="/profile-page"
          render={props => <ProfilePage {...props} user={user} updateUser={getUser} />}
        />
        <Route
          path="/register-page"
          render={props => <RegisterPage {...props} user={user} updateUser={getUser} />}
        />
        <Redirect to="/index" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
