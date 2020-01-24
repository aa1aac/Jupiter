import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./styles/index.css";
import IndexImage from "../Images/Index.jpg";

import Authentication from "../Components/Authentication/Authentication";

const Index = props => {
  if (props.user._id) {
    return <Redirect to="/home" />;
  }
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
};

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStatetoProps)(Index);
