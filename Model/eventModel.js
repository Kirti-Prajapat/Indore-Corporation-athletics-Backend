const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  videoUrl: { type: String },
  liveURL: String, 
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = {Event};

