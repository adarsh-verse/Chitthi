import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import User from "../models/user_model.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

async function cleanupDB() {
    console.log(process.env.MONGODB_URL);
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Delete all documents but keep collections
    const conversationResult = await Conversation.deleteMany({});
    const userResult = await User.deleteMany({});

    console.log(`🧹 Conversations deleted: ${conversationResult.deletedCount}`);
    console.log(`🧹 Users deleted: ${userResult.deletedCount}`);

    console.log("✨ Database cleanup complete!");
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

cleanupDB();
