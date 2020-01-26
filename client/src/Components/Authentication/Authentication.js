import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./Authentication.css";
import * as actions from "../../store/actions/user/user";

const Authentication = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const onSignup = async e => {
    e.preventDefault();

    if (email && password && first_name && last_name && confirm) {
      props.signupUser(first_name, last_name, email, password, confirm);
    }
  };

  const onLogin = async e => {
    e.preventDefault();
       if(email && password){
        props.loginUser(email, password);
       }
    
  };

  return (
    <div className="auth_box">
      <div className="auth_nav">
        <button
          className={"items " + !isSignup}
          onClick={() => {
            setIsSignup(false);
          }}
        >
          {" "}
          login
        </button>
        <button
          className={"items " + isSignup}
          onClick={() => {
            setIsSignup(true);
          }}
        >
          signup
        </button>
      </div>
      <form className="auth_form">
        {isSignup ? (
          <label htmlFor="first_name">
            <input
              type="text"
              placeholder="first name"
              className="auth_input"
              required
              value={first_name}
              onChange={e => setFirst_name(e.target.value)}
            />
          </label>
        ) : null}

        {isSignup ? (
          <label htmlFor="Last Name">
            <input
              type="text"
              placeholder="Last Name"
              className="auth_input"
              required
              value={last_name}
              onChange={e => setLast_name(e.target.value)}
            />
          </label>
        ) : null}

        <label htmlFor="email">
          <input
            type="email"
            placeholder="email"
            className="auth_input"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            placeholder="password"
            className="auth_input"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        {isSignup ? (
          <label htmlFor="confirm">
            <input
              type="password"
              placeholder="confirm password"
              className="auth_input"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </label>
        ) : null}

        {isSignup ? (
          <button className="submit" onClick={onSignup}>
            Signup
          </button>
        ) : (
          <button className="submit" onClick={onLogin}>
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default connect(null, actions)(Authentication);
// export default Authentication;
