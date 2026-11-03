
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      throw new Error("MONGO_URL is missing from backend .env file");
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
