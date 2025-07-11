import React from "react";

import Signup from "components/Authentication/Signup";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
import { CreatePost, ShowPost } from "./components/Posts";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route exact path="/about" render={() => <div>About</div>} />
      <Route exact component={Dashboard} path="/dashboard" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact component={ShowPost} path="/posts/:slug/show" />
      <Route exact component={Signup} path="/signup" />
    </Switch>
  </Router>
);

export default App;
