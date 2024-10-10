const express = require('express');
const connectDB = require('./db');
const notificationRoutes = require('./NotificationRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the CORS package

// Load environment variables
dotenv.config(); 

const app = express(); 

// Middleware to handle JSON requests
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Specify the origin of your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
  optionsSuccessStatus: 204, 
};

app.use(cors(corsOptions)); // Apply CORS middleware before routes

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Database connection error:", err);
});

// Routes
app.use('/api/notifications', notificationRoutes); // Use assignment routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting the server:', err);
});
