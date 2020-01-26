import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Index from "./Pages/Index";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ToastContainer autoClose={5000} />

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
