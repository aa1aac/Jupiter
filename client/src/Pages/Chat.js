import React from "react";

import Chat from "../Components/Chat/Chat";

const ChatPage = props => {
  return (
    <div>
      <Chat senderId={props.senderId} senderName={props.senderName} />
    </div>
  );
};

export default ChatPage;
