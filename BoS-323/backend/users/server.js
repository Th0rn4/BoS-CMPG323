const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./UserRoutes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables from .env file
dotenv.config();

const app = express(); // Explicitly declare app

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB().catch((err) => {
  console.error('Database connection error:', err);
});

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error('Error starting the server:', err);
  });
