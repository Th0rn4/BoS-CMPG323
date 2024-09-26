const express = require('express');
const connectDB = require('./db');
const notificationRoutes = require('./NotificationRoutes');
const dotenv = require('dotenv');

dotenv.config();

app = express();

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/notification', notificationRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
