import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    content: { type: String, required: true },
    image: String,

    group: { type: String, required: true },

    status: { type: String, enum: ["pending", "approved"], default: "pending" },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now }
    }],

    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

}, { timestamps: true });

export default mongoose.model("CommunityPost", communityPostSchema);