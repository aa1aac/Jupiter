import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as MessageActions from "../store/actions/message/message";
import "./styles/message.css";

const Messages = props => {
  useEffect(() => {
    props.fetchUsers();
  }, []);

  return (
    <div>
      <nav className="message">
        <div />
        <div>
          <h2>Messages</h2>
          <div>BARS</div>
          <div>BARS</div>
          <div>BARS</div>
          <div>BARS</div>
        </div>
        <div />
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    message: state.message
  };
};

export default connect(mapStateToProps, MessageActions)(Messages);
