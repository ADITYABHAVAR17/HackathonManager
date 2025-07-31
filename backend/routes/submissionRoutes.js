// File: backend/routes/submissionRoutes.js
const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const { protect } = require("../middleware/authMiddleware");
const Team = require("../models/Team");

// Phase 1: Register team to a problem

router.get("/member", async (req, res) => {
  try {
    const { email, problemId } = req.query;

    if (!email || !problemId) {
      return res.status(400).json({ message: "Email and problemId are required" });
    }

    const user = await User.findOne({ email }).select("email teamId name role _id");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the user is already in another team for the same problem
    const existingTeam = await Team.findOne({
      $or: [
        { leaderId: user._id },
        { "members.userId": user._id },
        { "members.email": user.email }  // In case userId is null but email is stored
      ],
      problemId: problemId,
    });

    if (existingTeam) {
      return res.status(409).json({ message: "User already part of a team for this problem" });
    }

    // Return user details if no conflict
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/register", protect, async (req, res) => {
  
  const { problemId } = req.body;

  try {
    const team = await Team.findOne({ leaderId: req.user._id });
    if (!team) return res.status(404).json({ message: "Team not found" });

    const existing = await Submission.findOne({ teamId: team._id , problemId });
    if (existing) return res.status(400).json({ message: "Team already registered to a problem" });

    const submission = await Submission.create({ teamId: team._id, problemId });
    res.status(201).json({ message: "Problem registered successfully", submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update submission with idea, github, ppt, video
router.put("/submit", protect, async (req, res) => {
  const { ideaSummary, githubLink, pptLink, videoLink } = req.body;

  try {
    const team = await Team.findOne({ leaderId: req.user._id });
    if (!team) return res.status(404).json({ message: "Team not found" });

    const submission = await Submission.findOneAndUpdate(
      { teamId: team._id },
      {
        ideaSummary,
        githubLink,
        pptLink,
        videoLink,
        isSubmitted: true,
        submittedAt: new Date(),
      },
      { new: true }
    );

    if (!submission) return res.status(404).json({ message: "No problem registered for this team" });

    res.json({ message: "Submission updated", submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/problem/:problemId/teams", protect, async (req, res) => {
  try {
    const { problemId } = req.params;
    
    // Find all submissions for the given problemId
    const submissions = await Submission.find({ problemId })
      .populate({
        path: 'teamId',
        populate: [
          { path: 'leaderId', select: 'name email' }, // populate leader details
          { path: 'members.userId', select: 'name email' } // populate member details
        ]
      });
    
    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: "No teams found for this problem" });
    }
    
    // Extract and format the team data
    const teams = submissions.map(submission => {
      const team = submission.teamId;
      return {
        teamId: team._id,
        teamName: team.teamName,
        institute: team.institute,
        leader: team.leaderId,
        members: team.members,
        submissionDetails: {
          ideaSummary: submission.ideaSummary,
          githubLink: submission.githubLink,
          pptLink: submission.pptLink,
          videoLink: submission.videoLink,
          submittedAt: submission.submittedAt
        }
      };
    });
    
    res.json({ teams });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
