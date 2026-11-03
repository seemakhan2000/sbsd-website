import mongoose from "mongoose";

const chatConversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    pageUrl: {
      type: String,
      default: "/",
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },

    messageCount: {
      type: Number,
      default: 0,
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

chatConversationSchema.index({
  sessionId: 1,
  updatedAt: -1,
});

const ChatConversation = mongoose.model(
  "ChatConversation",
  chatConversationSchema
);

export default ChatConversation;