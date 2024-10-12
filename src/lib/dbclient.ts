import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () => {
  if (isConnected) {
    return;
  }
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "Please add your MongoDB connection string to the .env.local file"
    );
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
