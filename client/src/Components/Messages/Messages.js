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
    <div className="messageBox sent">
      <div className="messageText ">{props.message.text}</div>
    </div>
  );
};
export default Messages;
