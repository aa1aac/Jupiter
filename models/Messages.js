const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  message: {
    text: { type: String, required: true }
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sender_name: { type: String, required: true },
  receiver_name: { type: String, required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  read: { type: Date },
  Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model(MessageSchema, "Message");
