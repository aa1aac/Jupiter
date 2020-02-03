import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

import "./styles/message.css";

const Messages = props => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    let res = await axios.get("/api/user/following-user");

    setFollowing([...following, ...res.data.users]);
  };

  
  return (
    <div>
      <div className="message">
        <div />
        <div>
          <h2>Messages</h2>

          {following.length ? (
            <div>
              {following.map((user, i) => {
                return <FollowingUnit user={user} key={i} />;
              })}
            </div>
          ) : null}
        </div>
        <div />
      </div>
    </div>
  );
};

const FollowingUnit = props => {
  return (
    <div className="followingUnit">
      <div>{/* todo */}</div>
      <div>
        <Link to={`/message/user/${props.user._id}`}>
        <h4 className="bold">
          {props.user.first_name} {props.user.last_name}
        </h4>
        </Link>
      </div>
    </div>
  );
};
export default Messages;
