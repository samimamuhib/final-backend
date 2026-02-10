const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected:", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.warn(
      "⚠️  Server will run without database. Fix the MONGO_URI in .env and restart."
    );
  }
};

module.exports = connectDB;
