const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  followers: [],
  following: [],
  groups: [{ groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" } }],
  dateCreated: { default: Date.now, type: Date },
  dateOfBirth: { type: Date }
});

module.exports = mongoose.model("User", UserSchema);
