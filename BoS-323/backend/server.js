const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const userRoutes = require("./Routes/userRoutes");
const subRoutes = require("./Routes/submissionRoutes");
const assignmentRoutes = require("./Routes/AssignmentRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/submissions", subRoutes);
app.use("/api/assignments", assignmentRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
