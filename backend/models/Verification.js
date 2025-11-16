import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    documentType: {
        type: String,
        enum: ["StudentID", "Passport", "DriverLicense"]
    },

    documentPath: String,
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },

    reason: String

}, { timestamps: true });

export default mongoose.model("Verification", verificationSchema);