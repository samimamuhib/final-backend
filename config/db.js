const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/taskmanager";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected:", mongoose.connection.host);
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.warn(
      "⚠️  If running in production, set the MONGO_URI or MONGODB_URI environment variable."
    );
    // Re-throw so calling code can decide whether to exit or continue without DB
    throw error;
  }
};

module.exports = connectDB;
