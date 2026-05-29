const mongoose = require("mongoose");

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

module.exports = mongoose.model(
  "UserDocuments",
  userDocumentsSchema
);