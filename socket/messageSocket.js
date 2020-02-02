module.exports = io => {
  io.on("connect", socket => {
    

    socket.on("sendMessage", (message, callback) => {
     
      io.emit("message", { text: message.text });

      callback();
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
