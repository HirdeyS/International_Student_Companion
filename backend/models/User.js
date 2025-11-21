import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "landlord", "admin"],
      default: "student",
    },

    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    idDocument: String,

    avatar: String,
    bio: String,
    program: String,
    countryOfOrigin: String,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export model (ensure it isn't compiled twice)
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
