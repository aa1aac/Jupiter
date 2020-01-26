import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Index from "./Pages/Index";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            {this.props.user._id ? (
              <div>
                <Navbar />
                <Route
                  render={() => <Home userName={this.props.user.first_name} />}
                  path="/"
                  exact
                />
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
    user: state.user
  };
};

export default connect(mapStatetoProps)(App);
