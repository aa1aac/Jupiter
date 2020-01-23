import React, { useState } from "react";

import "./Authentication.css";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSignup, setIsSignup] = useState(false);

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
          <label for="name">
            <input
              type="text"
              placeholder="name"
              className="auth_input"
              required
            />
          </label>
        ) : null}

        <label for="email">
          <input
            type="email"
            placeholder="email"
            className="auth_input"
            required
          />
        </label>
        <label for="password">
          <input
            type="password"
            placeholder="password"
            className="auth_input"
          />
        </label>

        {isSignup ? (
          <label for="confirm">
            <input
              type="password"
              placeholder="confirm password"
              className="auth_input"
              required
            />
          </label>
        ) : null}
        
        {isSignup ? (
          <button className="submit">Signup</button>
        ) : (
          <button className="submit">Login</button>
        )}
      </form>
    </div>
  );
};

export default Authentication;
