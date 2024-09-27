const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "/BoS-323/backend/Config/config.env"),
}); // Adjust the path as needed

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
