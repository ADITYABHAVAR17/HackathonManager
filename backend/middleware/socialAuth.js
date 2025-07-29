const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  googleCallback,
  githubCallback,
  microsoftCallback,
  facebookCallback,
} = require("../controllers/socialAuthController");

// Load strategies
require("../middleware/googleAuth");
require("../middleware/githubAuth");
require("../middleware/microsoftAuth");
require("../middleware/facebookAuth");

// Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleCallback);

// GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), githubCallback);

// Microsoft
router.get("/microsoft", passport.authenticate("microsoft"));
router.get("/microsoft/callback", passport.authenticate("microsoft", { failureRedirect: "/" }), microsoftCallback);

// Facebook
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), facebookCallback);

module.exports = router;