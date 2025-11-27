import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer storage setup for saving uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // directory to store files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.user._id + "-id" + ext); // file named by user ID
  }
});

const upload = multer({ storage });

// POST /api/id/upload
router.post("/upload", protect, upload.single("idDocument"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.idDocument = req.file.path;
    await user.save();

    res.json({ message: "ID uploaded successfully", filePath: req.file.path });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

