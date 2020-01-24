import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Index from "./Pages/Index";
import Home from "./Pages/Home";
import PrivateRoute from "./utils/PrivateRoute";

import "./App.css";

const App = props => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <PrivateRoute path="/home" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
