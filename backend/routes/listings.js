import express from "express";
import Listing from "../models/listing.js";

const router = express.Router();

/* ============================
   GET all listings
=============================== */
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load listings", error: err });
  }
});

/* ============================
   GET single listing by ID
=============================== */
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing)
      return res.status(404).json({ message: "Listing not found" });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listing", error: err });
  }
});

/* ============================
   CREATE a new listing
=============================== */
router.post("/", async (req, res) => {
  try {
    const listing = new Listing(req.body);
    const saved = await listing.save();
    res.status(201).json(saved);
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
