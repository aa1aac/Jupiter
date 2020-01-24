import React from "react";

import "./styles/index.css";
import IndexImage from "../Images/Index.jpg";

import Authentication from "../Components/Authentication/Authentication";

const Index = () => {
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

export default Index;
