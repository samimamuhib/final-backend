const mongoose = require("mongoose");
require("dotenv").config();

console.log("Testing MongoDB connection...");
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    console.log("Host:", mongoose.connection.host);
    console.log("Name:", mongoose.connection.name);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:");
    console.error("Error:", error.message);
    console.error("Code:", error.code);
    console.error("\nTroubleshooting steps:");
    console.error("1. Verify MONGO_URI in .env is correct");
    console.error("2. Check IP whitelist: https://cloud.mongodb.com/v2");
    console.error("3. Verify username/password are correct");
    console.error("4. Check firewall/network settings");
    process.exit(1);
  });
