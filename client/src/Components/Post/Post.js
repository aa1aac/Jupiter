import React from "react";

import "./Post.css";

const Post = props => {
  let date = new Date(props.date).toDateString();

  return (
    <div className="post">
      <div className="bold"> {props.user}</div>
      <br />
      <span className="bold">Shared on : {date}</span>
      <br />
      <div className="postContent">
        {props.text.map((value, index) => (
          <div key={index}>
            {" "}
            {value} <br />
          </div>
        ))}
      </div>
      <div className="postBar">
        <button>
          <i className="material-icons">thumb_up_alt</i>
        </button>

        <button>
          <i className="material-icons">comment</i>
        </button>
      </div>
    </div>
  );
};

export default Post;
