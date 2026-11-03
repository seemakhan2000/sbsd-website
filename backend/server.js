
import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import connectDatabase from "./config/database.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import chatbotRateLimit from "./middleware/chatbotRateLimit.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Validate required environment variables
if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is missing from your .env file.");
}

// Security middleware
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: false,
  })
);

app.use(express.json({ limit: "20kb" }));

app.use(mongoSanitize());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Virginia SBSD Chatbot API is running.",
  });
});

// Chatbot routes
app.use(
  "/api/chatbot",
  chatbotRateLimit,
  chatbotRoutes
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Free Knowledge Base chatbot initialized.");
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
