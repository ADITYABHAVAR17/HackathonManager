// // File: backend/models/Problem.js
// const mongoose = require("mongoose");

// const problemSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   domain: { type: String, required: true },
//   difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
//   tags: [String],
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Problem", problemSchema);

// -------------------------------------------------------------
const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true }, // Can be markdown or rich text

  domain: { type: String, required: true }, // e.g., Fintech, AI, Healthcare
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [{ type: String, lowercase: true, trim: true }], // ["web", "ai", "nlp"]

  inputFormat: { type: String },
  outputFormat: { type: String },
  constraints: { type: String },
  sampleInput: { type: String },
  sampleOutput: { type: String },

  testCases: [
    {
      input: String,
      output: String,
      isPublic: { type: Boolean, default: false },
    },
  ],

  evaluationCriteria: {
    innovation: { type: Number, default: 30 },
    technicalComplexity: { type: Number, default: 30 },
    usability: { type: Number, default: 20 },
    impact: { type: Number, default: 20 },
  },

  problemType: {
    type: String,
    enum: ["Coding", "Idea Submission", "Prototype", "Presentation"],
    required: true,
  },

  hackathonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hackathon",
    required: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  isActive: { type: Boolean, default: true },

  startDate: { type: Date },  // Problem visibility starts
  endDate: { type: Date },    // Problem visibility ends

  totalSubmissions: { type: Number, default: 0 },
  acceptedSubmissions: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Problem", problemSchema);
// -------------------------------------------------------------