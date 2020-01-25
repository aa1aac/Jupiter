import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./styles/index.css";
import IndexImage from "../Images/Index.jpg";
import * as UserAction from "../store/actions/user/user";

import Authentication from "../Components/Authentication/Authentication";

class Index extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div>
          <img src={IndexImage} alt="index" className="index" />

          <div className="wrapper">
            <div className="grid1">
              <h1>Jupiter</h1>
            </div>

            <div className="grid2">
              <Authentication />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(null, UserAction)(Index);
