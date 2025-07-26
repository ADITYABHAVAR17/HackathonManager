// File: backend/models/Submission.js
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true, unique: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  ideaSummary: { type: String }, // optional in phase 1
  githubLink: { type: String },
  pptLink: { type: String },
  videoLink: { type: String },
  isSubmitted: { type: Boolean, default: false },
  submittedAt: { type: Date }

});

module.exports = mongoose.model("Submission", submissionSchema);
