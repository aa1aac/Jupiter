const socketHelper = require("./socketHelper");

module.exports = io => {
  io.on("connect", socket => {
    socket.on("join", ({ userId, rooms, name }, callback) => {
      const { error, user } = socketHelper.addUser({
        id: socket.id,
        name,
        rooms,
        userId
      });

      if (error) return callback(error);

      socket.emit("message", {
        sender: "admin",
        text: "hey welcome to the chat"
      });

      socket.on("sendMessage", (message, callback) => {
        const receiver = socketHelper.getUser(message.receiver);
        const sender = socketHelper.getUser(message.senderId);

        if (receiver) {
          socket.join(receiver.id);
          io.to(receiver.id).emit("message", {
            text: message.text,
            sender: sender.name
          });

          io.to(sender.id).emit("message", {
            text: message.text,
            sender: sender.name
          });
        } else {
          // save the data for sending to the user for future reference
        }

        callback();
      });
    });

    socket.on("disconnect", () => {
      socketHelper.removeUser(socket.id);
    });
  });
};
