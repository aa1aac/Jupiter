import React from "react";

import Chat from "../Components/Chat/Chat";

const ChatPage = props => {
  return (
    <div>
      <Chat userId={props.senderId} />
    </div>
  );
};

export default ChatPage;
