import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import cron from "node-cron";
import profileRoutes from "./routes/profile.js";
import verificationRoutes from "./routes/verification.js";
import idUploadRoutes from "./routes/idUpload.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import listingRoutes from "./routes/listings.js";
import newsRoutes from "./routes/news.js";
import communityRoutes from "./routes/community.js";
import { runSeed } from "./seed/index.js";
import { syncIRCCNews } from "./services/newsService.js";

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);



const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/verify", verificationRoutes);
app.use("/api/id", idUploadRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/community", communityRoutes);
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    if (process.env.NODE_ENV !== "production") {
      await runSeed();
    }

    // Schedule IRCC news sync every 6 hours
    cron.schedule("0 */6 * * *", () => {
      syncIRCCNews();
    });

    // Run initial sync in background (don't await to avoid blocking)
    syncIRCCNews();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
