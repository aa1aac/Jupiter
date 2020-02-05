const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const http = require("http");

const UserRouter = require("./router/UserRouter");
const PostRouter = require("./router/PostRouter");
const config = require("./config");

const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT || 5000, () => {
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
