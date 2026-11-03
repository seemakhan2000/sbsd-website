
import ChatConversation from "../models/ChatConversation.js";
import ChatMessage from "../models/ChatMessage.js";

import {
  searchKnowledgeBase,
} from "./knowledge.service.js";

import {
  generateAIResponse,
} from "./ai.service.js";

const MAX_HISTORY = 10;
const MAX_MESSAGE_LENGTH = 2000;

const GREETING_PATTERN =
  /^(hi|hello|hey|good morning|good afternoon|good evening)[!.,\s]*$/i;

const FOLLOW_UP_PATTERN =
  /\b(it|this|that|these|those|them|they|their|also|what about|and|more|requirements|eligibility|how about)\b/i;

const normalizeMessage = (value = "") =>
  String(value).trim().replace(/\s+/g, " ");

const saveAssistantMessage = async ({
  conversation,
  text,
  sources = [],
}) => {
  const assistantMessage = await ChatMessage.create({
    conversationId: conversation._id,
    role: "assistant",
    content: text,
    sources,
  });

  conversation.messageCount =
    (conversation.messageCount || 0) + 1;

  conversation.lastMessageAt = new Date();

  await conversation.save();

  return {
    conversationId: conversation._id,
    answer: assistantMessage.content,
    sources: assistantMessage.sources || [],
  };
};

const getConversationHistory = async (conversationId) => {
  const messages = await ChatMessage.find({
    conversationId,
  })
    .sort({ createdAt: -1 })
    .limit(MAX_HISTORY + 1)
    .select("role content createdAt")
    .lean();

  // The current user message was already saved.
  return messages
    .reverse()
    .slice(0, -1);
};

const resolveFollowUpQuestion = (message, history = []) => {
  const currentQuestion = normalizeMessage(message);

  const tokens = currentQuestion.split(/\s+/);

  const isFollowUp =
    tokens.length <= 3 ||
    FOLLOW_UP_PATTERN.test(currentQuestion);

  if (!isFollowUp) {
    return currentQuestion;
  }

  const previousUserMessage = [...history]
    .reverse()
    .find((item) => item.role === "user");

  if (!previousUserMessage?.content) {
    return currentQuestion;
  }

  return `${previousUserMessage.content} ${currentQuestion}`;
};

export const processChatMessage = async ({
  conversationId,
  sessionId,
  message,
  pageUrl,
}) => {
  // 1. Validate incoming message.
  if (typeof message !== "string") {
    throw new Error("Message must be a valid string.");
  }

  const cleanMessage = normalizeMessage(message);

  if (!cleanMessage) {
    throw new Error("Message cannot be empty.");
  }

  if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
    throw new Error(
      `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`
    );
  }

  if (
    typeof sessionId !== "string" ||
    !sessionId.trim()
  ) {
    throw new Error("Valid session ID is required.");
  }

  let conversation;

  // 2. Find existing conversation or create a new one.
  if (conversationId) {
    conversation = await ChatConversation.findOne({
      _id: conversationId,
      sessionId: sessionId.trim(),
      status: "active",
    });

    if (!conversation) {
      throw new Error("Conversation not found.");
    }
  } else {
    conversation = await ChatConversation.create({
      sessionId: sessionId.trim(),
      pageUrl,
      messageCount: 0,
      lastMessageAt: new Date(),
    });
  }

  // 3. Save the user message.
  await ChatMessage.create({
    conversationId: conversation._id,
    role: "user",
    content: cleanMessage,
  });

  conversation.messageCount =
    (conversation.messageCount || 0) + 1;

  conversation.lastMessageAt = new Date();

  await conversation.save();

  // 4. Handle greetings.
  if (GREETING_PATTERN.test(cleanMessage)) {
    return saveAssistantMessage({
      conversation,
      text:
        "Hello! Welcome to the Virginia Department of Small Business and Supplier Diversity (SBSD) Virtual Assistant. I can help you explore business development services, SWaM and DBE certification resources, financing programs, and government contracting information. How can I assist you today?",
    });
  }

  // 5. Retrieve conversation history.
  const history = await getConversationHistory(
    conversation._id
  );

  // 6. Search MongoDB using the current question.
  let documents = await searchKnowledgeBase(
    cleanMessage
  );

  // 7. Try contextual retrieval for follow-up questions.
  if (!documents.length) {
    const contextualQuestion = resolveFollowUpQuestion(
      cleanMessage,
      history
    );

    if (contextualQuestion !== cleanMessage) {
      documents = await searchKnowledgeBase(
        contextualQuestion
      );
    }
  }

  // 8. Return safe fallback if no relevant documents exist.
  if (!documents.length) {
    return saveAssistantMessage({
      conversation,
      text:
        "I couldn't find sufficiently relevant information in the official Virginia SBSD knowledge base to answer your question accurately. Please visit https://sbsd.virginia.gov/ for official assistance.",
    });
  }

  // 9. Extract the answer from MongoDB.
  const result = await generateAIResponse({
    question: cleanMessage,
    context: documents,
    history,
  });

  // 10. Save the final assistant response.
  return saveAssistantMessage({
    conversation,
    text: result.text,
    sources: result.sources || [],
  });
};
