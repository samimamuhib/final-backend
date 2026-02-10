const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Serve frontend files from absolute path
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB then start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log("📱 Open your website at:\n");
      console.log(`   🔗 http://localhost:${PORT}/\n`);
    });

    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Set a different PORT environment variable or stop the process using it.`);
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("Failed to start server because DB connection failed.", err.message);
    process.exit(1);
  });
