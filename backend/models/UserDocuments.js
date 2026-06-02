import mongoose from "mongoose";
const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  expiryDate: {
    type: Date,
    default: null,
  },

  isRequired: {
    type: Boolean,
    default: false,
  },
});

const userDocumentsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    documents: [documentSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserDocuments", userDocumentsSchema);