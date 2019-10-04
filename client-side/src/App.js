import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../src/constants';

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";

// pages
import Index from "views/Index";
import NucleoIcons from "views/NucleoIcons";
import CharacterCards from "views/marvel/Characters";
import ProfilePage from "views/examples/ProfilePage";
import RegisterPage from "views/examples/RegisterPage";
import Movies from "views/marvel/Movies";
import BlogPosts from "views/marvel/BlogPosts";
import CardGame from "views/marvel/CardGame";

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
          path="/profile-page"
          render={props => <ProfilePage {...props} user={user} updateUser={getUser} />}
        />
        <Route
          path="/register-page"
          render={props => <RegisterPage {...props} user={user} updateUser={getUser} />}
        />
        <Route
          path="/movies"
          render={props => <Movies {...props} user={user} updateUser={getUser} />}
        />
        <Route
          path="/heros"
          render={props => <CharacterCards {...props} user={user} />}
        />
        <Route
          path="/blog-posts"
          render={props => <BlogPosts {...props} user={user} updateUser={getUser} />}
        />
        <Route
          path="/card-game"
          render={props => <CardGame {...props} user={user} updateUser={getUser} />}
        />
        <Redirect to="/index" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
