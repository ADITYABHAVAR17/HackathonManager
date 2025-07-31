const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const handleOAuthUser = require("../utils/passportHandler"); // 🔄 Shared handler for all OAuth providers
require("dotenv").config();

console.log("Spotify strategy initialized");

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: "https://eb462ba5c1f9.ngrok-free.app/api/auth/spotify/callback",
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      await handleOAuthUser(profile, "spotify", done);
    }
  )
);

module.exports = passport;
