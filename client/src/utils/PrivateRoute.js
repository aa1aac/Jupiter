import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !props.user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const mapStatetoProps = state => {
  return {
    user: state.user._id
  };
};

export default connect(mapStatetoProps)(PrivateRoute);
