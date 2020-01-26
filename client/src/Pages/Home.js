import React, { Component } from "react";

import "./styles/home.css";

const Home = props => {
  return (
    <div>
      <div className="bar">hi! {props.userName}. Welcome</div>
      <div className="home">
        <div />
        <div className="content">
          <textarea
            type="text"
            className="text"
            placeholder="Share your ideas here."
          ></textarea>

          <button className="share">
            {" "}
            Share  
            {" "}
            <i className="material-icons">send</i>
          </button>
        </div>

        <div />
      </div>
    </div>
  );
};

export default Home;
