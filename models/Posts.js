const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: Array, required: true },
  comments: [
    {
      _user: { type: Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  likes: [
    {
      _user: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ],
  date: { default: Date.now, type: Date },
  image: { type: String }
});

module.exports = mongoose.model("Post", PostSchema);
