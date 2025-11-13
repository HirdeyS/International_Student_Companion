import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profile.js";
import verificationRoutes from "./routes/verification.js";
import idUploadRoutes from "./routes/idUpload.js";

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();

// Middleware
app.use(express.json()); 

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api", userRoutes);
app.use("/api/verify", verificationRoutes);
app.use("/api/id", idUploadRoutes);
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
