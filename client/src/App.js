import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Index from "./Pages/Index";
import Home from "./Pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import NonPrivateRoute from "./utils/NonPrivateRoute";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            {this.props.user ? (
              <div>
                <Route component={Home} path="/" exact />
              </div>
            ) : (
              <div>
                <Route component={Index} path="/" />
              </div>
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    user: state.user._id
  };
};

export default connect(mapStatetoProps)(App);
