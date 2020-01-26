const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
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
  date: { default: Date.now },
  image: { type: String }
});

export default mongoose.model("Post", PostSchema);
