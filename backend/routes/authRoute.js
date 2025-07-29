// routes/authRoute.js

const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authController = require("../controllers/authController");

// 🔐 Local Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", authController.verify);
router.post("/forgotpassword", authController.forgotPassword);
router.put("/resetpassword/:resettoken", authController.resetPassword);
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
// 🌐 OAuth Scopes Mapping (can be extended easily)
const OAUTH_SCOPES = {
  google: ["profile", "email"],
  github: ["read:user user:email"],
  microsoft: ["user.read"],
  facebook: ["email"],
};

// 🚀 Route to initiate OAuth Login
router.get("/:provider", (req, res, next) => {
  const { provider } = req.params;
  console.log(`Initiating ${provider} OAuth flow`);
  const scope = OAUTH_SCOPES[provider];

  if (!scope) {
    return res.status(400).json({ error: "Unsupported provider" });
  }

  passport.authenticate(provider, { scope })(req, res, next);
});

// 🎯 OAuth Callback Handler
router.get("/:provider/callback", (req, res, next) => {
  const { provider } = req.params;
  console.log(`Handling ${provider} OAuth callback`);
  if (!OAUTH_SCOPES[provider]) {
    return res.status(400).json({ error: "Unsupported provider" });
  }

  passport.authenticate(provider, { failureRedirect: "/" }, (err, user) => {
    if (err || !user) {
      console.error("OAuth Error:", err);
      return res.redirect("http://localhost:5173?error=oauth_failed");
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Redirect to frontend with token
    res.redirect(`http://localhost:5173/user?token=${token}`);
  })(req, res, next);
});

module.exports = router;
