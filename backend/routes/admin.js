import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Temporary in-memory audit log
let auditLog = [];

// Admin approval endpoint: approve a user's verification or ID
router.put("/approve/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Approve verification or ID
    user.isVerified = true;
    await user.save();

    // Record in audit log
    auditLog.push({
      userId: user._id,
      approvedBy: req.user._id,
      timestamp: new Date(),
      action: "User approved",
    });

    res.json({ message: "User approved successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to view audit log (admin only)
router.get("/audit-log", protect, admin, (req, res) => {
  res.json(auditLog);
});

export default router;
