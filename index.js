const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const http = require("http");

const UserRouter = require("./router/UserRouter");
const PostRouter = require("./router/PostRouter");
const config = require("./config");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cookieParser());
app.use(express.json());

// routing
app.use("/api/user/", UserRouter);
app.use("/api/posts", PostRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//  socket io require
require("./socket/messageSocket")(io);


const PORT = process.env.PORT || 5000;

server.listen(PORT || 5000, () => {
  console.log(`Server listeninng on port : ${PORT}`);

  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Mongo database connected");
    });
});
