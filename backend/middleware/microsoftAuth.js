const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const handleOAuthUser = require("../utils/passportHandler");
require("dotenv").config();

console.log("Microsoft strategy initialized");
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/microsoft/callback",
      scope: ["user.read"],
    },
    async (accessToken, refreshToken, profile, done) => {
      await handleOAuthUser(profile, "microsoft", done);
    }
  )
);


module.exports = passport;