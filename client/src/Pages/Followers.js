import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../Components/Search/Search";

import "./styles/followers.css";

const Followers = () => {
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
                  <div className="followerBox" key={index}>
                    <div>{/* todo */}</div>
                    <h4>
                      {follower.first_name} {follower.last_name}
                    </h4>
                  </div>
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
                  <div className="followerBox" key={index}>
                    <div>{/* todo */}</div>
                    <h4>
                      {following.first_name} {following.last_name}
                    </h4>
                  </div>
                ))}
              </div>
            ) : (
              <h3> No followers found </h3>
            )}
          </div>
        ) : null}

        {/* Search page */}

        {isPageSearch ? <Search /> : null}
      </div>

      <div />
    </div>
  );
};

export default Followers;
