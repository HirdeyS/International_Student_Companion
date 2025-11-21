import multer from "multer";
import express from "express";
import User from "../models/User.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/:id/upload", upload.single("idDocument"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.idDocument = req.file.path;
    await user.save();

    res.json({ message: "ID uploaded successfully", path: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
