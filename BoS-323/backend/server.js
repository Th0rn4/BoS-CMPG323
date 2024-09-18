const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const subRoutes = require('./Routes/submissionRoutes');
const assignmentRoutes = require('./Routes/AssignmentRoutes');
const notificationRoutes = require('./Routes/NotificationRoutes');
const dotenv = require('dotenv');
dotenv.config();

app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/submissions', subRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notification', notificationRoutes);
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
