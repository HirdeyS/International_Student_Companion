import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(400).json({ message: "Email not verified" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: role || "student",
      isVerified: false,
    });

    // Generate verification token
    const token = crypto.randomBytes(20).toString("hex");
    user.verificationToken = token;
    await user.save();

    res.status(201).json({
      message: "Registered successfully. Check your email to verify your account.",
    });

    setImmediate(async () => {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Verify your account",
          text: `Click this link to verify your account: http://localhost:3000/api/verify/${token}`,
        });

        console.log("Verification email sent to:", user.email);
      } catch(e) {
        console.error("Email send error", e);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

export default router;


