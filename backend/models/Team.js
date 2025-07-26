// File: backend/models/Team.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  institute: { type: String, required: true },
  leaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      email: { type: String }  // Optional, for denormalized copy
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
