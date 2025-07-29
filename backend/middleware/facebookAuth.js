const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const handleOAuthUser = require("../utils/passportHandler");
require("dotenv").config();

console.log("Facebook strategy initialized");
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      await handleOAuthUser(profile, "facebook", done);
    }
  )
);


module.exports = passport;