import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from "./Pages/Index";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
      </Switch>
    </Router>
  );
};

export default App;
