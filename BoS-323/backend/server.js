const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./Users/Routes/userRoutes');
const subRoutes = require('./Submissions/Routes/submissionRoutes');
const assignmentRoutes = require('./Assignments/Routes/AssignmentRoutes');
const notificationRoutes = require('./Notifications/Routes/NotificationRoutes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/submissions', subRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notification', notificationRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
