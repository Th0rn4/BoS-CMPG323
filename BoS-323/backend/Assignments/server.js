const express = require('express');
const connectDB = require('./db');
const assignmentRoutes = require('./AssignmentRoutes');
const dotenv = require('dotenv');

dotenv.config();

app = express();

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/assignments', assignmentRoutes);

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
