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
import Chat from "./Pages/Chat";

import "./App.css";

class App extends Component {
  render() {
    console.log(this.props.user);
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

                <Route
                  exact
                  path="/message/user/:id"
                  render={() => (
                    <Chat
                      senderId={this.props.user._id}
                      senderName={this.props.user.first_name}
                    />
                  )}
                />

                <Route
                  exact
                  path="/message"
                  render={() => <Messages userId={this.props.user._id} />}
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
