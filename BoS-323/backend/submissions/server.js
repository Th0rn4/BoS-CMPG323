const express = require("express");
const connectDB = require("./db");
const subRoutes = require("./SubmissionRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express(); // Explicitly declare app

// Middleware
app.use(express.json()); // Add this to handle JSON requests

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Database connection error:", err);
});

// Routes
app.use("/api/submissions", subRoutes);

// Start the server
const PORT = process.env.PORT || 3004; // Use environment variable
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server:", err);
  });
