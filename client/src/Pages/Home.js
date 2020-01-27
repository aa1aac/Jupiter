import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Post from "../Components/Post/Post";

import * as postAction from "../store/actions/posts/post";
import "./styles/home.css";

class Home extends React.Component {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.getPost();
  }

  onShare = () => {
    if (this.state.text) {
      try {
        this.props.post(this.state.text);

        this.setState({ ...this.state, text: "" });

        // toast.success("Successfully posted");
      } catch (error) {
        toast.error("Oops! Some error occured posting.");
      }
    }
  };

  render() {
    return (
      <div>
        <div className="home">
          <div />
          <div className="content">
            <textarea
              value={this.state.text}
              onChange={e =>
                this.setState({ ...this.state, text: e.target.value })
              }
              type="text"
              className="text"
              placeholder="Share your ideas here."
            ></textarea>

            <button className="share" onClick={this.onShare}>
              {" "}
              Share <i className="material-icons">send</i>
            </button>

            {this.props.posts
              ? this.props.posts.map((value, index, array) => {
                  return (
                    <Post
                      userId={this.props.userId}
                      className="postContainer"
                      key={index}
                      index={index}
                      text={value.text}
                      date={value.date}
                      user={value._user}
                      first_name={value.first_name}
                      last_name={value.last_name}
                      post_id={value._id}
                      likes={value.likes}
                      comments={value.comments}
                    />
                  );
                })
              : null}
          </div>

          <div />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(mapStatetoProps, postAction)(Home);
