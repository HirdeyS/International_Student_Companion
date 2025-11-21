import User from "../models/User.js";

// Middleware to check if the logged-in user is an admin
export const admin = (req, res, next) => {
  try {
    // The protect middleware must run first and set req.user
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if the user has role 'admin'
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    // User is admin, continue
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

