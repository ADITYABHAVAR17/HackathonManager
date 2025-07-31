const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theme: String,
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hackathon", hackathonSchema);
