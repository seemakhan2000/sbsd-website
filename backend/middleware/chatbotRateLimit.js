import rateLimit from "express-rate-limit";

const chatbotRateLimit = rateLimit({
  windowMs: 60 * 1000,

  limit: 15,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many messages. Please try again later.",
  },
});

export default chatbotRateLimit;