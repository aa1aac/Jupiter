const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  folowers: [
    {
      followerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    }
  ],
  folowing: [
    {
      followingId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    }
  ],
  gender: { type: String, default: "" },
  address: { type: String, default: "" },
  groups: [{ groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" } }],
  dateCreated: { default: Date.now, type: Date },
  dateOfBirth: { type: Date }
});

module.exports = mongoose.model("User", UserSchema);