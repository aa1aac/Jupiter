import React, { Component } from "react";
import UserProfilePost from "../Components/UserProfilePost/UserProfilePost";
import { withRouter } from "react-router-dom";

import "./styles/profile.css";
import axios from "axios";

class UserProfile extends Component {
  state = {
    profile: {},
    posts: [],
    moreInfoTrigger: false,
    isFollowing: false
  };

  fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/user/${this.props.match.params.id}`);

      console.log(res.data.user);
      this.setState({
        ...this.state,
        profile: { ...res.data.user },
        isFollowing: res.data.isFollowing
      });
    } catch (error) {
      console.error(error);
    }
  };

  fetchPosts = async () => {
    const res = await axios.get(
      `/api/posts/user-specific-posts/${this.props.match.params.id}`
    );
    this.setState({
      ...this.state,
      ...this.state.posts,
      posts: res.data.posts
    });
  };

  componentDidMount() {
    this.fetchProfile();
    this.fetchPosts();
  }

  render() {
    const onLike = async (id, key) => {
      await axios.get(`/api/posts/${id}/like`);

      this.fetchPosts();
    };
    const onMoreInfoTrigger = () => {
      if (this.state.moreInfoTrigger) {
        this.setState({ moreInfoTrigger: false });
      }

      if (!this.state.moreInfoTrigger) {
        this.setState({ moreInfoTrigger: true });
      }
    };

    const followOrUnfollow = async () => {
      try {
        let res = await axios.get(`/api/user/follow/${this.state.profile._id}`);

        this.setState({
          ...this.state,
          ...this.state.profile,
          profile: res.data.user,
          isFollowing: res.data.isFollowing
        });
      } catch (error) {}
    };

    return (
      <div>
        {this.state.profile._id ? (
          <div className="profile">
            <div></div>
            <div className="content">
              <div className="profileLead">
                <div>{/* todo images */}</div>
                <div>
                  <h3>
                    {this.state.profile.first_name}{" "}
                    {this.state.profile.last_name}
                  </h3>

                  <h4>
                    Followers:{" "}
                    {this.state.profile.followers
                      ? this.state.profile.followers.length
                      : 0}
                  </h4>

                  <h4>
                    Following :{" "}
                    {this.state.profile.following
                      ? this.state.profile.following.length
                      : 0}
                  </h4>

                  {this.state.isFollowing ? (
                    <button className="followBtn" onClick={followOrUnfollow}>
                      {" "}
                      Unfollow{" "}
                    </button>
                  ) : (
                    <button className="followBtn" onClick={followOrUnfollow}>
                      {" "}
                      Follow{" "}
                    </button>
                  )}
                </div>
              </div>
              <div className="post">
                <h3>{this.state.profile.bio}</h3>{" "}
              </div>

              <button
                className="moreInfo"
                className={
                  this.state.moreInfoTrigger ? "active moreInfo" : "moreInfo"
                }
                onClick={onMoreInfoTrigger}
              >
                More Info
              </button>

              {this.state.moreInfoTrigger ? (
                <div className="post">
                  <h3>More Info</h3>
                  <h5>Email : {this.state.profile.email}</h5>

                  <h5>
                    {" "}
                    Date joined :{" "}
                    {new Date(this.state.profile.dateCreated).toDateString()}
                  </h5>
                </div>
              ) : null}

              {this.state.posts
                ? this.state.posts.map((value, index) => {
                    return (
                      <UserProfilePost
                        userId={this.props.userId}
                        className="postContainer"
                        key={index}
                        onLike={onLike}
                        index={index}
                        text={value.text}
                        date={value.date}
                        user={value._user}
                        first_name={value.first_name}
                        last_name={value.last_name}
                        post_id={value._id}
                        likes={value.likes}
                      />
                    );
                  })
                : null}
            </div>
            <div></div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(UserProfile);
