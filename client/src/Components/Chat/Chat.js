import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import { withRouter } from "react-router-dom";

import "./Chat.css";

const ENDPOINT = "http://localhost:5000/";

let socket;

const Chat = props => {
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(
      "join",
      {
        userId: props.senderId,
        rooms: { room1: props.senderId, room2: props.match.params.id },
        name: props.senderName
      },
      error => {}
    );
  }, []);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendText = e => {
    e.preventDefault();

    if (text.trim()) {
      socket.emit(
        "sendMessage",
        {
          text,
          senderId: props.senderId,
          senderName: props.senderName,
          receiver: props.match.params.id
        },
        () => setText(" ")
      );
    }
  };

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  console.log(messages);
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

export default withRouter(Chat);
