import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // console.log(props.user);

  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

const mapStatetoProps = state => {
  return {
    user: state.user._id
  };
};

// export default connect(mapStatetoProps)(PrivateRoute);
export default PrivateRoute;
