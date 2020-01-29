import React, { Component } from "react";
import ProfilePost from "../Components/ProfilePost/ProfilePost";
import { connect } from "react-redux";

import "./styles/profile.css";
import { logoutUser } from "../store/actions/user/user";
import axios from "axios";
import { toast } from "react-toastify";

class Profile extends Component {
  state = {
    profile: {},
    posts: [],
    moreInfoTrigger: false,
    editInfoTrigger: false,
    bio: ""
  };

  fetchProfile = async () => {
    try {
      const res = await axios.get("/api/user/profile");

      this.setState({
        ...this.state,
        profile: { ...res.data.user }
      });

      // setProfile({ ...res.data.user });
    } catch (error) {
      console.error(error);
    }
  };

  fetchPosts = async () => {
    const res = await axios.get("/api/posts/profile-specific");

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
    const deletePost = async (post_id, index) => {
      // todo change state
      try {
        let res = await axios.delete(`/api/posts/${post_id}`);

        if (!res.data.error) {
          this.fetchPosts();
        } else {
          return toast.error(res.data.error);
        }
      } catch (error) {}
    };

    const postBio = async () => {
      try {
        await axios.put("/api/user/edit", { bio: this.state.bio });

        this.fetchProfile();

        this.setState({ ...this.state, bio: "" });
      } catch (error) {
        toast.error("oops some error occured");
      }
    };

    const onMoreInfoTrigger = () => {
      if (this.state.moreInfoTrigger) {
        this.setState({ moreInfoTrigger: false });
      }

      if (!this.state.moreInfoTrigger) {
        this.setState({ moreInfoTrigger: true });
      }
    };

    const editInfoTrigger = () => {
      if (this.state.editInfoTrigger) this.setState({ editInfoTrigger: false });
      if (!this.state.editInfoTrigger) this.setState({ editInfoTrigger: true });
    };

    const onLogout = async () => {
      // todo logout functionality
      try {
        this.props.logoutUser();
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
                </div>
              </div>
              <div className="post">
                <h3>{this.state.profile.bio}</h3>{" "}
              </div>

              <button className="logout" onClick={onLogout}>
                Logout
              </button>

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

                  <button
                    className={
                      this.state.editInfoTrigger
                        ? "active editInfo"
                        : "editInfo"
                    }
                    onClick={editInfoTrigger}
                  >
                    Edit Bio
                  </button>

                  {this.state.editInfoTrigger ? (
                    <div>
                      <h3>Edit Bio</h3>

                      <textarea
                        placeholder="type your bio here"
                        className="commentBox"
                        value={this.state.bio}
                        onChange={e =>
                          this.setState({ ...this.state, bio: e.target.value })
                        }
                      ></textarea>

                      <button className="share" onClick={postBio}>
                        Post Bio
                        <i className="material-icons">send</i>
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {this.state.posts
                ? this.state.posts.map((value, index) => {
                    return (
                      <ProfilePost
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
                        deletePost={deletePost}
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

let dispatch = {
  logoutUser
};

export default connect(null, dispatch)(Profile);
