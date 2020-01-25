import React from "react";
import { Route, Redirect } from "react-router-dom";


const NonPrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log(user);
  
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

// export default connect(mapStatetoProps)(NonPrivateRoute);
export default NonPrivateRoute;
