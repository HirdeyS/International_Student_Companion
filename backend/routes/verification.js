import express from "express";
import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

// POST /api/verify/send
// Generate a verification token and send it via email
router.post("/send", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate unique verification token
    const token = crypto.randomBytes(20).toString("hex");
    user.verificationToken = token;
    await user.save();

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: `"International Student Companion" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Verify your account",
      text: `Click this link to verify your account: http://localhost:3000/api/verify/${token}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Verification email sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/verify/:token
// Verify the user's account using the token
router.get("/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).json({ message: "Invalid token" });

    // Activate the account and remove the token
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

