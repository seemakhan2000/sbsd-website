import express from "express";

import {
  sendMessage,
  createConversation,
  getConversationHistory,
} from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/message", sendMessage);

router.post("/conversations", createConversation);

router.get(
  "/conversations/:id",
  getConversationHistory
);

export default router;