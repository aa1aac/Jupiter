import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Messages from "../Messages/Messages";

import "./Chat.css";

const ENDPOINT = "http://localhost:5000/";

let socket;

const Chat = props => {
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("connect");
  }, []);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendText = e => {
    e.preventDefault();

    if (text) {
      socket.emit("sendMessage", { text }, () => setText(" "));
    }
  };

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);

      console.log(messages);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  // Interim variables
  let name = props.userId;
  let room = "ROOM";

  return (
    <div className="chat">
      <Messages messages={messages} />
      {/* chat message send bar */}
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="sendButton" onClick={sendText}>
          Send <i className="material-icons">send</i>
        </button>  
      </form>
    </div>
  );
};

export default Chat;
