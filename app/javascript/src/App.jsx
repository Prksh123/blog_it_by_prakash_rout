import React from "react";

import { Login, Signup } from "components/Authentication";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "utils/storage";

import { PrivateRoute } from "./components/commons";
import Dashboard from "./components/Dashboard";
import MyBlogs from "./components/MyBlogs";
import { CreatePost, ShowPost, EditPost } from "./components/Posts";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={EditPost} path="/posts/:slug/edit" />
        <Route exact component={CreatePost} path="/posts/create" />
        <Route exact component={ShowPost} path="/posts/:slug/show" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <Route exact component={MyBlogs} path="/my-blogs" />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
