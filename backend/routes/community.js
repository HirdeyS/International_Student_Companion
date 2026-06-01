import express from "express";
import CommunityPost from "../models/CommunityPost.js";
import Message from "../models/Message.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/community
 * @desc    Get all approved community posts with pagination and optional group filter
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
    try {
        const { group, page = 1, limit = 20 } = req.query;
        const query = { status: "approved" };

        if (group) {
            query.group = group;
        }

        const posts = await CommunityPost.find(query)
            .populate("user", "name avatar")
            .populate("comments.user", "name avatar")
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await CommunityPost.countDocuments(query);

        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   POST /api/community
 * @desc    Create a new community post (pending approval)
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
    try {
        const { content, group, image } = req.body;

        // Validation
        if (!content || !group) {
            return res.status(400).json({ message: "Content and group are required" });
        }

        const newPost = new CommunityPost({
            user: req.user._id,
            content,
            group,
            image,
            status: "pending"
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   PUT /api/community/:id/like
 * @desc    Toggle like on an approved post
 * @access  Private
 */
router.put("/:id/like", protect, async (req, res) => {
    try {
        const post = await CommunityPost.findOne({ _id: req.params.id, status: "approved" });
        if (!post) {
            return res.status(404).json({ message: "Approved post not found" });
        }

        const isLiked = post.likes.includes(req.user._id);

        if (isLiked) {
            // Remove like
            await CommunityPost.updateOne(
                { _id: req.params.id },
                { $pull: { likes: req.user._id } }
            );
            res.json({ message: "Post unliked" });
        } else {
            // Add like
            await CommunityPost.updateOne(
                { _id: req.params.id },
                { $addToSet: { likes: req.user._id } }
            );
            res.json({ message: "Post liked" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   POST /api/community/:id/comment
 * @desc    Add a comment to an approved post
 * @access  Private
 */
router.post("/:id/comment", protect, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const post = await CommunityPost.findOne({ _id: req.params.id, status: "approved" });
        if (!post) {
            return res.status(404).json({ message: "Approved post not found" });
        }

        const newComment = {
            user: req.user._id,
            text,
            createdAt: new Date()
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json(post.comments[post.comments.length - 1]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   DELETE /api/community/:id/comment/:commentId
 * @desc    Delete a comment
 * @access  Private
 */
router.delete("/:id/comment/:commentId", protect, async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if user is author or admin
        if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        comment.remove();
        await post.save();

        res.json({ message: "Comment removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   POST /api/community/:id/report
 * @desc    Report an approved post
 * @access  Private
 */
router.post("/:id/report", protect, async (req, res) => {
    try {
        const post = await CommunityPost.findOne({ _id: req.params.id, status: "approved" });
        if (!post) {
            return res.status(404).json({ message: "Approved post not found" });
        }

        await CommunityPost.updateOne(
            { _id: req.params.id },
            { $addToSet: { reports: req.user._id } }
        );

        res.json({ message: "Post reported" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   GET /api/community/pending
 * @desc    Get all pending community posts for moderation
 * @access  Private/Admin
 */
router.get("/pending", protect, admin, async (req, res) => {
    try {
        const posts = await CommunityPost.find({ status: "pending" })
            .populate("user", "name avatar")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   PUT /api/community/:id/approve
 * @desc    Approve a pending community post
 * @access  Private/Admin
 */
router.put("/:id/approve", protect, admin, async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.status = "approved";
        await post.save();

        res.json({ message: "Post approved", post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   PUT /api/community/:id/reject
 * @desc    Reject a pending community post
 * @access  Private/Admin
 */
router.put("/:id/reject", protect, admin, async (req, res) => {
    try {
        const { reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: "Reason is required for rejection" });
        }

        const post = await CommunityPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Send notification before deleting
        await Message.create({
            sender: req.user._id, 
            reciever: post.user,
            content: `Your post "${post.content.substring(0, 20)}..." was rejected. Reason: ${reason}`
        });

        await CommunityPost.findByIdAndDelete(req.params.id);

        res.json({ message: "Post rejected and user notified" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   PUT /api/community/:id/delete
 * @desc    Delete an approved community post (Admin override)
 * @access  Private/Admin
 */
router.put("/:id/delete", protect, admin, async (req, res) => {
    try {
        const { reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: "Reason is required for deletion" });
        }

        const post = await CommunityPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Send notification before deleting
        await Message.create({
            sender: req.user._id,
            reciever: post.user,
            content: `Your post "${post.content.substring(0, 20)}..." was removed by a moderator. Reason: ${reason}`
        });

        await CommunityPost.findByIdAndDelete(req.params.id);

        res.json({ message: "Post removed and user notified" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
