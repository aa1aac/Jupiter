const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  _post: { type: Schema.Types.ObjectId, ref: "Post" },
  text: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date: { required: true, type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
