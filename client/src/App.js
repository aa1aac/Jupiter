import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Index from "./Pages/Index";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import UserProfile from "./Pages/UserProfile";
import Followers from "./Pages/Followers";
import Navbar from "./Components/Navbar/Navbar";
import Messages from "./Pages/Messages";

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
                  render={() => <Home userId={this.props.user._id} />}
                  path="/"
                  exact
                />
                <Route
                  component={Followers}
                  exact
                  path="/followers"
                  render={() => <Followers userId={this.props.user._id} />}
                />
                <Route
                  exact
                  render={() => <Profile userId={this.props.user._id} />}
                  path="/profile"
                />

                <Route
                  exact
                  path="/user/profile/:id"
                  render={() => <UserProfile userId={this.props.user._id} />}
                />

                <Route exact path="/message" render={() => <Messages />} />
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
