const express = require("express");
const connectDB = require("./db");
const notificationRoutes = require("./NotificationRoutes");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express(); // Explicitly declare app

// Middleware to handle JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Database connection error:", err);
});

// Routes
app.use("/api/notifications", notificationRoutes); // Use plural for consistency

// Start the server
const PORT = process.env.PORT || 3003; // Dynamically use environment variable
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server:", err);
  });
