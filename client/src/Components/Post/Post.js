import React, { useState } from "react";
import { connect } from "react-redux";

import "./Post.css";
import * as PostAction from "../../store/actions/posts/post";

const Post = props => {
  let date = new Date(props.date).toDateString();

  const [isCommentTrigger, setIsCommentTrigger] = useState(false);

  const onLike = () => {
    props.likePost(props.post_id, props.index);
  };

  const onCommentTrigger = () => {
    isCommentTrigger ? setIsCommentTrigger(false) : setIsCommentTrigger(true);
  };

  return (
    <div className="post">
      <div className="bold">
        {" "}
        {props.first_name} {props.last_name}{" "}
      </div>
      <br />
      <span className="bold"> {date}</span>
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
        <button onClick={onLike}>
          <i
            className={
              props.likes.includes(props.userId)
                ? "material-icons liked"
                : "material-icons"
            }
          >
            thumb_up_alt
          </i>

          <span className="badge">{props.likes.length}</span>
        </button>

        <button
          onClick={onCommentTrigger}
          className={isCommentTrigger ? "active" : null}
        >
          <i className="material-icons">comment</i>
          <span className="badge">{props.comments.length}</span>
        </button>
      </div>

      {isCommentTrigger ? (
        <div className="commentSection">
          <textarea
            className="commentBox"
            placeholder="type your comment here"
          ></textarea>
          <button className="share">
            Comment <i className="material-icons">send</i>
          </button>
          {props.comments
            ? props.comments.forEach((value, index) => (
                <div className="comment" key={index}>
                  comment {index}
                </div>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default connect(null, PostAction)(Post);
