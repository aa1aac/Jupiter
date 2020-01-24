import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import Index from "./Pages/Index";
import reducers from "./store/reducers";
import "./App.css";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
