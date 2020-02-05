import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";

const Messages = props => {
  return (
    <ScrollToBottom className="messages">
      {props.messages.length
        ? props.messages.map((message, i) => (
            <SingleMessage message={message} key={i} />
          ))
        : null}
    </ScrollToBottom>
  );
};

const SingleMessage = props => {
  return (
    <div>
      <em>{props.message.sender}</em>
      <div className="messageBox sent">
        <div className="messageText ">{props.message.text}</div>
      </div>
    </div>
  );
};
export default Messages;
