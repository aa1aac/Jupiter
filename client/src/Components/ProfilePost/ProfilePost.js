import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import "./ProfilePost.css";
import * as PostAction from "../../store/actions/posts/post";

const ProfilePost = props => {
  useEffect(() => {
    fetchComments();
  }, []);

  let date = new Date(props.date).toDateString();

  const [isCommentTrigger, setIsCommentTrigger] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [text, setText] = useState(props.text.join("\n"));
  const [isEditTrigger, setIsEditTrigger] = useState(false);

  const fetchComments = async () => {
    const res = await axios.get(`/api/posts/${props.post_id}/comment`);

    console.log(res.data.comments);

    setComments([...res.data.comments]);
  };

  const onCommentTrigger = () => {
    isCommentTrigger ? setIsCommentTrigger(false) : setIsCommentTrigger(true);
  };

  const onEditTrigger = () => {
    isEditTrigger ? setIsEditTrigger(false) : setIsEditTrigger(true);
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

  const onEditPost = async () => {};

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
      <br />
      <em className="likes">
        Likes : <span className="badge">{props.likes.length}</span>
      </em>
      <br />
      <div className="postBar">
        <button
          onClick={onEditTrigger}
          className={isEditTrigger ? "active" : null}
        >
          Edit
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
          {comments.length ? <h3>Comments</h3> : null}

          {comments
            ? comments.map((value, index) => (
                <Comment value={value} key={index} />
              ))
            : null}
        </div>
      ) : null}

      {isEditTrigger ? (
        <div className="editPost">
          <h3>Edit here</h3>
          <textarea
            className="commentBox"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>

          <button className="share" onClick={onEditPost}>
            Edit <i className="material-icons">send</i>
          </button>
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

// export default connect(null, PostAction)(Post);
export default ProfilePost;
