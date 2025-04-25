import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
}

export default connectToDB;
