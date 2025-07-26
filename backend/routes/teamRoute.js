// File: backend/routes/teamRoutes.js
const express = require("express");
const Team = require("../models/Team");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", protect, async (req, res) => {
  const { teamName, institute, members } = req.body;
  try {
    const exists = await Team.findOne({ teamName });
    if (exists) return res.status(400).json({ message: "Team name already exists" });

    // Fetch and attach email for each userId
    const memberDetails = await Promise.all(
      members.map(async (member) => {
        const user = await User.findById(member.userId).select("email");
        if (!user) throw new Error(`User with ID ${member.userId} not found`);
        return { userId: user._id, email: user.email };
      })
    );

    const team = await Team.create({
      teamName,
      institute,
      leaderId: req.user._id,
      members: memberDetails,
    });

    await User.findByIdAndUpdate(req.user._id, { teamId: team._id });

    res.status(201).json({ message: "Team registered successfully", team });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
