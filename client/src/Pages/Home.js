import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import * as postAction from "../store/actions/posts/post";
import "./styles/home.css";

const Home = props => {
  const [text, setText] = useState("");

  const onShare = () => {
    if (text) {
      try {
        props.post(text);
        setText("");
        // toast.success("Successfully posted");
      } catch (error) {
        toast.error("Oops! Some error occured posting.");
      }
    }
  };

  return (
    <div>
      <div className="bar">hi! {props.userName}. Welcome</div>
      <div className="home">
        <div />
        <div className="content">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            type="text"
            className="text"
            placeholder="Share your ideas here."
          ></textarea>

          <button className="share" onClick={onShare}>
            {" "}
            Share <i className="material-icons">send</i>
          </button>
        </div>

        <div />
      </div>
    </div>
  );
};

export default connect(null, postAction)(Home);
