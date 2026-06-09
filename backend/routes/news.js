import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// GET /api/news - Get all news articles
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ pubDate: -1 }).limit(50);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
});

export default router;
