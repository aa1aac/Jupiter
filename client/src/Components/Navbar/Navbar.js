import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./Navbar.css";

const Navbar = props => {
  let { pathname } = props.location;
 
  return (
    <div>
      <nav className="nav">
        <Link className={pathname === "/" ? "active" : null} to="/">
          <i className="material-icons">home</i>
        </Link>


        <Link
          to="/profile"
          className={pathname === "/profile" ? "active" : null}
        >
          <i className="material-icons">person</i>
        </Link>

        <Link
          to="/followers"
          className={pathname === "/followers" ? "active" : null}
        >
          <i className="material-icons">people_outline</i>
        </Link>


      </nav>
    </div>
  );
};

export default withRouter(Navbar);
