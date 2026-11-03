
import mongoose from "mongoose";

const knowledgeBaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },

    keywords: {
      type: [String],
      default: [],
    },

    content: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastVerifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate knowledge documents.
knowledgeBaseSchema.index(
  {
    title: 1,
    sourceUrl: 1,
  },
  {
    unique: true,
  }
);

const KnowledgeBase =
  mongoose.models.KnowledgeBase ||
  mongoose.model("KnowledgeBase", knowledgeBaseSchema);

export default KnowledgeBase;
