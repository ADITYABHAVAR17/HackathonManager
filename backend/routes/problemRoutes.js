// File: backend/routes/problemRoutes.js
const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// Add new problem (Admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  const { title, description, domain, difficulty, tags } = req.body;
  try {
    const problem = await Problem.create({ title, description, domain, difficulty, tags });
    res.status(201).json({ message: "Problem created", problem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all problems (visible to all)
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Delete a problem by ID (Admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Problem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Problem not found" });
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
