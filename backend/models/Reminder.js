import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    description: String,

    dueDate: { type: Date, required: true },
    remindAt: { type: Date, required: true },

    type: {
        type: String,
        enum: ["SIN", "Health Card", "Banking Setup", "Study Permit", "Custom"],
        default: "Custom"
    },

    completed: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model("Reminder", reminderSchema);