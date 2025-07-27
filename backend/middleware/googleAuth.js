// backend/middleware/googleAuth.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();
const generatePassword = require("../utils/passwordgen");
const sendEmail = require("../utils/sendEmail");

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
console.log("Google strategy initialized");
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);

// Configure strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });

      if (existingUser) {
        return done(null, existingUser);
      }
      console.log("New user registration via Google:", profile);
      const pass = generatePassword();
      const email = profile.emails[0].value;
      const mailOptions = {
        to: email,
        subject: "Welcome to Our App!",
        text: `Hello ${profile.displayName},\n\nYour account has been created successfully!\n\nYour password is: ${pass}\n\nPlease change it after your first login.\n\nBest,\nYour App Team`,
      };
      console.log("Sending welcome email to:", mailOptions);

      await sendEmail(mailOptions);

      // New User
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: pass,
        role: "team", // default
        picture: profile.photos[0].value, // Store profile picture
        googleId: profile.id, // Store Google ID
      });

      done(null, newUser);
    }
  )
);
