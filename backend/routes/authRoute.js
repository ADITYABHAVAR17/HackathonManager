const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
require("../middleware/googleAuth");
const jwt = require("jsonwebtoken");

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", authController.verify);
router.post("/forgotpassword", authController.forgotPassword);
router.put("/resetpassword/:resettoken", authController.resetPassword);

// Redirect to Google OAuth
router.get(
  "/google",

  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token (you can also send JSON if preferred)
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);
// router.get("/member", authController.getMemberDetails);

module.exports = router;
