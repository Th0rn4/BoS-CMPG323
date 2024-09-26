const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./UserRoutes');
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

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
