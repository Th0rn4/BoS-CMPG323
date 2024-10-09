const express = require("express");
const connectDB = require("./db");
const subRoutes = require("./SubmissionRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// More permissive CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Enable pre-flight requests for all routes
app.options("*", cors());

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Database connection error:", err);
});

// Routes
app.use("/api/submissions", subRoutes);

// Start the server
const PORT = process.env.PORT || 3004;
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server:", err);
  });
