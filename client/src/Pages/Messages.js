import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as MessageActions from "../store/actions/message/message";
import Chat from "../Components/Chat/Chat";
import "./styles/message.css";

const Messages = props => {
  useEffect(() => {
    props.fetchUsers();
  }, []);

  return (
    <div>
      <div className="message">
        <div />
        <div>
          <h2>Messages</h2>

          <Chat userId={props.userId} />
        </div>
        <div />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    message: state.message
  };
};

export default connect(mapStateToProps, MessageActions)(Messages);
