import mongoose from "mongoose";

import ChatMessage from "../models/ChatMessage.js";
import ChatConversation from "../models/ChatConversation.js";

import { processChatMessage } from "../services/chat.service.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, sessionId, message, pageUrl } =
      req.body;

    const result = await processChatMessage({
      conversationId,
      sessionId,
      message,
      pageUrl,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    return res.status(500).json({
      success: false,
      message: "Sorry, we could not process your message.",
    });
  }
};

export const createConversation = async (req, res) => {
  try {
    const { sessionId, pageUrl } = req.body;

    const conversation = await ChatConversation.create({
      sessionId,
      pageUrl,
    });

    return res.status(201).json({
      success: true,
      data: {
        conversationId: conversation._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create conversation.",
    });
  }
};

export const getConversationHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { sessionId } = req.query;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID.",
      });
    }

    const conversation = await ChatConversation.findOne({
      _id: id,
      sessionId,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const messages = await ChatMessage.find({
      conversationId: id,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve chat history.",
    });
  }
};