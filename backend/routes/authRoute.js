const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", authController.verify);
router.post("/forgotpassword", authController.forgotPassword);
router.put("/resetpassword/:resettoken", authController.resetPassword);
// router.get("/member", authController.getMemberDetails);

module.exports = router;
