const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const handleOAuthUser = require("../utils/passportHandler");
require("dotenv").config();

console.log("GitHub strategy initialized");
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      await handleOAuthUser(profile, "github", done);
    }
  )
);


module.exports = passport;