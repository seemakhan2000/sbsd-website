import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatConversation",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    sources: [
      {
        title: String,
        url: String,
      },
    ],

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },

    feedback: {
      type: String,
      enum: ["helpful", "not-helpful", null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

chatMessageSchema.index({
  conversationId: 1,
  createdAt: 1,
});

const ChatMessage = mongoose.model(
  "ChatMessage",
  chatMessageSchema
);

export default ChatMessage;