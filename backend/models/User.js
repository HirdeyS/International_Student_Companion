import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["student", "landlord", "admin"],
    default: "student"
  },

  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  idDocument: String,

  avatar: String,
  bio: String,
  program: String,
  countryOfOrigin: String

}, { timestamps: true });

export default mongoose.model("User", userSchema);
