import express from "express";
import CommunityPost from "../models/CommunityPost.js";
import Message from "../models/Message.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

// GET /api/community - Get approved community posts
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

// POST /api/community - Create a new community post
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

// PUT /api/community/:id/like - Toggle like on an approved post
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

// POST /api/community/:id/comment - Add a comment to an approved post
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

// DELETE /api/community/:id/comment/:commentId - Delete a comment
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

// POST /api/community/:id/report - Report an approved post
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

// GET /api/community/pending - Get pending posts for moderation (Admin only)
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

// PUT /api/community/:id/approve - Approve a pending post (Admin only)
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

// PUT /api/community/:id/reject - Reject a pending post (Admin only)
router.put("/:id/reject", protect, admin, async (req, res) => {
    try {
        const { reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: "Reason is required for rejection" });
        }

        const post = await CommunityPost.findById(req.params.id).populate("user", "name email");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Send internal notification
        await Message.create({
            sender: req.user._id, 
            reciever: post.user._id,
            content: `Your post "${post.content.substring(0, 20)}..." was rejected. Reason: ${reason}`
        });

        // Send email notification
        if (post.user && post.user.email) {
            setImmediate(async () => {
                try {
                    await sendEmail(
                        post.user.email,
                        "Community Post Rejected",
                        `Hello ${post.user.name},\n\nYour recent post in the community was rejected for the following reason:\n\n"${reason}"\n\nPost content snippet: "${post.content.substring(0, 50)}..."\n\nIf you have any questions, please contact the support team.`
                    );
                } catch (emailErr) {
                    console.error("Failed to send rejection email:", emailErr);
                }
            });
        }

        await CommunityPost.findByIdAndDelete(req.params.id);

        res.json({ message: "Post rejected and user notified" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/community/:id/delete - Delete an approved post (Admin only)
router.put("/:id/delete", protect, admin, async (req, res) => {
    try {
        const { reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: "Reason is required for deletion" });
        }

        const post = await CommunityPost.findById(req.params.id).populate("user", "name email");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Send internal notification
        await Message.create({
            sender: req.user._id,
            reciever: post.user._id,
            content: `Your post "${post.content.substring(0, 20)}..." was removed by a moderator. Reason: ${reason}`
        });

        // Send email notification
        if (post.user && post.user.email) {
            setImmediate(async () => {
                try {
                    await sendEmail(
                        post.user.email,
                        "Community Post Removed",
                        `Hello ${post.user.name},\n\nYour post in the community was removed by a moderator for the following reason:\n\n"${reason}"\n\nPost content snippet: "${post.content.substring(0, 50)}..."\n\nIf you have any questions, please contact the support team.`
                    );
                } catch (emailErr) {
                    console.error("Failed to send removal email:", emailErr);
                }
            });
        }

        await CommunityPost.findByIdAndDelete(req.params.id);

        res.json({ message: "Post removed and user notified" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
