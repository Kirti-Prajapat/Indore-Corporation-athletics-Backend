const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  activities: { type: [String], required: true },
  reason: { type: String },
}, 
{ timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
