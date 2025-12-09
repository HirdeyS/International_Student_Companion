import express from "express";
import Listing from "../models/Listing.js";
import {authorize, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================
   GET all listings
=============================== */
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate(
      "landlord",
      "name email role"
    );
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load listings", error: err });
  }
});

router.get("/filter", async (req, res) => {
  try {

    const filter = {};

    const {
      minPrice,
      maxPrice,
      furnished,
      shared,
      verified,
      maxDistance,
      moveInDate,
      search
    } = req.query;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
      if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    if (furnished === "true") {
      filter.furnished = true;
    }

    if (shared === "true") {
      filter.shared = true;
    } 

    if (verified === "true") {
      filter.isVerified = true;
    } 

    if (maxDistance) {
      filter.distanceFromCampus = { $lte: Number(maxDistance) };
    }

    if (moveInDate) {
      filter.availableFrom = { $lte: new Date(moveInDate) };
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { address: new RegExp(search, "i") },
        { description: new RegExp(search, "i") }
      ];
    }

    if (Object.keys(filter).length === 0) {
      const all = await Listing.find();
      return res.json(all);
    }

    const filteredListings = await Listing.find(filter).populate("landlord", "name email");

    res.json(filteredListings);

  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ message: "Failed to filter listings" });
  }
});

/* ============================
   GET single listing by ID
=============================== */
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "landlord",
      "name email role"
    );

    if (!listing)
      return res.status(404).json({ message: "Listing not found" });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listing", error: err });
  }
});

router.get("/landlord/:id", async (req, res) => {
  try {
    const listings = await Listing.find({ landlord: req.params.id })
      .populate("landlord", "name email role");

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load landlord listings", error: err });
  }
});

/* ============================
   CREATE a new listing
=============================== */
router.post("/", protect, authorize("landlord"), async (req, res) => {
  try {

    const listing = await Listing.create({
      ...req.body,
      landlord: req.user._id,
    });

    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: "Failed to create listing", error: err });
  }
});

/* ============================
   UPDATE an existing listing
=============================== */
router.put("/:id", async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedListing)
      return res.status(404).json({ message: "Listing not found" });

    res.json(updatedListing);
  } catch (err) {
    res.status(400).json({ message: "Failed to update listing", error: err });
  }
});

/* ============================
   DELETE a listing
=============================== */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Listing not found" });

    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete listing", error: err });
  }
});

export default router;
