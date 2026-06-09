import express from "express";
import User from "../models/User.js";
import { protect } from '../middleware/authMiddleware.js';
import Listing from "../models/Listing.js"

const router = express.Router();

// GET current logged-in user's profile
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,

      // student fields
      program: user.program || "",
      countryOfOrigin: user.countryOfOrigin || "",
      bio: user.bio || "",

      // landlord fields
      businessName: user.businessName || "",
      phoneNumber: user.phoneNumber || "",
      website: user.website || "",
      about: user.about || "",
    };

    return res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update current logged-in user's profile
router.put("/me", protect, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ message: "User not found" });
    return res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,

      program: updated.program || "",
      countryOfOrigin: updated.countryOfOrigin || "",
      bio: updated.bio || "",

      businessName: updated.businessName || "",
      phoneNumber: updated.phoneNumber || "",
      website: updated.website || "",
      about: updated.about || "",
    });  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

