const express = require("express");
const mongoose = require("mongoose");

const AuthRouter = require("./router/Auth");
const config = require("./config");

const app = express();

// routing
app.use("/auth", AuthRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
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
