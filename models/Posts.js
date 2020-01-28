const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: Array, required: true },
  likes: [],
  comments: { type: Number, required: true, default: 0 },
  date: { default: Date.now, type: Date },
  image: { type: String },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true }
});

module.exports = mongoose.model("Post", PostSchema);
