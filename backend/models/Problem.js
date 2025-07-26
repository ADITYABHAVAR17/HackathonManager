// File: backend/models/Problem.js
const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Problem", problemSchema);
