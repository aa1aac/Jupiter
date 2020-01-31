import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import "./Post.css";
import * as PostAction from "../../store/actions/posts/post";

const Post = props => {
  useEffect(() => {
    fetchComments();
  }, []);

  let date = new Date(props.date).toDateString();

  const [isCommentTrigger, setIsCommentTrigger] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(`/api/posts/${props.post_id}/comment`);

    console.log(res.data.comments);

    setComments([...res.data.comments]);
  };

  const onLike = () => {
    props.likePost(props.post_id, props.index);
  };

  const onCommentTrigger = () => {
    isCommentTrigger ? setIsCommentTrigger(false) : setIsCommentTrigger(true);
  };

  const postComment = async () => {
    try {
      let res = await axios.post(`/api/posts/${props.post_id}/comment`, {
        text: comment
      });

      console.log(res.data);

      setComments([...comments, res.data.comment]);

      setComment("");
    } catch (error) {
      toast.error("some error occured posting comment");
    }
  };

  const navToProfile = () => {
    if (props.userId === props.user) {
      // direct to profile page
      props.history.push("/profile");
    } else {
      // direct to user/profile/id(props.user)
      props.history.push(`/user/profile/${props.user}`);
    }
    console.log(props.history);
  };

  return (
    <div className="post">
      <div className="bold" onClick={navToProfile}>
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

          <span className="badge">
            {comments ? <span> {comments.length} </span> : 0}
          </span>
        </button>
      </div>

      {isCommentTrigger ? (
        <div className="commentSection">
          <textarea
            className="commentBox"
            placeholder="type your comment here"
            value={comment}
            onChange={e => setComment(e.target.value)}
          ></textarea>
          <button className="share" onClick={postComment}>
            Comment <i className="material-icons">send</i>
          </button>
          <h3>Comments</h3>
          {comments
            ? comments.map((value, index) => (
                <Comment value={value} key={index} />
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

const Comment = props => {
  return (
    <div className="comment">
      <div className="commentHeader">
        {" "}
        {props.value.first_name} {props.value.last_name}{" "}
      </div>
      <div className="commentContent"> {props.value.text} </div>
    </div>
  );
};

export default connect(null, PostAction)(withRouter(Post));
