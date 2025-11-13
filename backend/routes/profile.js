import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET profile by user ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user); 

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update profile by user ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
