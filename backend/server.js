
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

// Validate environment variables
if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is missing from .env file.");
}

// Allowed frontend domains
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",

  // Production frontend
  "https://sbsd-website.vercel.app",

  // Current frontend deployment
  "https://sbsd-website-osyb.vercel.app",

  // Previous frontend deployment
  "https://sbsd-website-hv7e.vercel.app",
];

// Validate frontend origin
const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  return allowedOrigins.includes(origin);
};

// Security middleware
app.use(helmet());

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
  })
);

// Body parser
app.use(express.json({ limit: "20kb" }));

// MongoDB sanitization
app.use(mongoSanitize());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Virginia SBSD Chatbot API is running.",
  });
});

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

// Error handler
app.use((error, req, res, next) => {
  if (error.message?.startsWith("CORS blocked origin:")) {
    return res.status(403).json({
      success: false,
      message: "Access denied.",
    });
  }

  console.error("API Error:", error.message);

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Allowed frontend: https://sbsd-website.vercel.app");
      console.log("Virginia SBSD Chatbot initialized.");
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
