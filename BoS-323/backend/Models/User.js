// Defines the User schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "lecturer", "admin"],
    required: true,
  },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
