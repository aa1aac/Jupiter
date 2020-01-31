import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../Components/Search/Search";

import "./styles/followers.css";

const Followers = props => {
  const [isPageFollower, setIsPageFollower] = useState(true);
  const [isPageFollowing, setIsPageFollowing] = useState(false);
  const [isPageSearch, setIsPageSearch] = useState(false);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const toggleFollower = () => {
    setIsPageFollower(true);
    setIsPageFollowing(false);
    setIsPageSearch(false);
  };

  const toggleFollowing = () => {
    setIsPageFollower(false);
    setIsPageFollowing(true);
    setIsPageSearch(false);
  };

  const toggleSearch = () => {
    setIsPageFollower(false);
    setIsPageFollowing(false);
    setIsPageSearch(true);
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    const res = await axios.get("/api/user/followers");

    setFollowers(res.data.userFollowers);
    setFollowing(res.data.userFollowing);
  };

  const navToProfile = id => {
    // direct to user/profile/id(props.user)
    props.history.push(`/user/profile/${id}`);

    console.log(props.history);
  };

  return (
    <div className="profile">
      <div />
      <div>
        <nav className="followNav">
          <button
            onClick={toggleFollower}
            className={isPageFollower ? "active" : null}
          >
            <h4>Followers</h4>
          </button>

          <button
            onClick={toggleFollowing}
            className={isPageFollowing ? "active" : null}
          >
            <h4>Following</h4>
          </button>

          <button
            className={isPageSearch ? "active" : null}
            onClick={toggleSearch}
          >
            <h4>Search</h4>
          </button>
        </nav>

        {/* display followers on follower trigger */}

        {isPageFollower ? (
          <div>
            {followers.length ? (
              <div className="followersContainer">
                {followers.map((follower, index) => (
                  <Follower
                    follower={follower}
                    key={index}
                    navToProfile={navToProfile}
                  />
                ))}
              </div>
            ) : (
              <h3> No followers found </h3>
            )}
          </div>
        ) : null}

        {/*  display following on following trigger */}

        {isPageFollowing ? (
          <div>
            {following.length ? (
              <div className="followersContainer">
                {following.map((following, index) => (
                  <Following
                    key={index}
                    following={following}
                    navToProfile={navToProfile}
                  />
                ))}
              </div>
            ) : (
              <h3> No followers found </h3>
            )}
          </div>
        ) : null}

        {/* Search page */}

        {isPageSearch ? <Search navToProfile={navToProfile}/> : null}
      </div>

      <div />
    </div>
  );
};

const Follower = props => {
  const onClickFollower = () => {
    props.navToProfile(props.follower._id);
  };

  return (
    <div className="followerBox">
      <div>{/* todo */}</div>
      <h4 className="bold" onClick={onClickFollower}>
        {props.follower.first_name} {props.follower.last_name}
      </h4>
    </div>
  );
};

const Following = props => {
  const onClickFollower = () => {
    props.navToProfile(props.following._id);
  };

  return (
    <div className="followerBox">
      <div>{/* todo */}</div>
      <h4 className="bold" onClick={onClickFollower}>
        {props.following.first_name} {props.following.last_name}
      </h4>
    </div>
  );
};

export default Followers;
