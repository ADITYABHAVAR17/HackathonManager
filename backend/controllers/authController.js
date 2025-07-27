const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail"); // You'll need to implement this
const { text } = require("stream/consumers");
// JWT generator utility
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const authController = {
  // Add this to your authController.js

  // Register a new user
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await User.create({ name, email, password, role });
      const token = generateToken(user);

      res.status(201).json({
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  },

  // Login existing user
  login: async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = generateToken(user);
      res.json({
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  verify: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  },
  resetPassword: async (req, res) => {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Set new password
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      // Create token for auto-login if desired
      const token = generateToken(user);

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString("hex");

      // Set token and expiry (1 hour)
      user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.resetPasswordExpire = Date.now() + 36000000; // 1 hour

      await user.save();

      // Create reset URL
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/auth/resetpassword/${resetToken}`;

      // Email message
      const message = `You are receiving this email because you (or someone else) has requested a password reset. 
      Please make a PUT request to: \n\n ${resetUrl}`;
      console.log(message);
      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Token",
          text: message,
        });

        res.status(200).json({ success: true, data: "Email sent" });
      } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return res.status(500).json({ message: "Email could not be sent" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;

