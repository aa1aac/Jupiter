import React, { useEffect, useState } from "react";
import ProfilePost from "../Components/ProfilePost/ProfilePost";

import "./styles/profile.css";
import axios from "axios";

const Profile = props => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("/api/user/profile");

    setProfile(res.data.user);
  };

  const fetchPosts = async () => {
    const res = await axios.get("/api/posts/profile-specific");

    setPosts(...posts, res.data.posts);
  };

  console.log(profile);

  return (
    <div>
      {profile ? (
        <div className="profile">
          <div></div>
          <div className="content">
            <div className="profileLead">
              <div>{/* todo images */}</div>
              <div>
                {profile.first_name} {profile.last_name}
                <br />
                Gender: {profile.gender}
                <br />
                Followers:
                <br />
                Following :
                <br />
                Date joined :
              </div>
            </div>
            <div>Bio: {profile.bio}</div>
            More info?
            {posts.length
              ? posts.map((value, index) => {
                  return (
                    <ProfilePost
                      userId={props.userId}
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
};

export default Profile;
