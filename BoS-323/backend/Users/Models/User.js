const mongoose = require("mongoose");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

//USer Schema for MongoDB
const UserSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true, index: true },
    lastName: { type: String, required: true, index: true },
  },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["student", "lecturer", "admin"],
    default: "student",
  },
  joinedDate: { type: Date, default: Date.now },
});

//Secure password hashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

//Check if typed in password matches hassed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await argon2.verify(this.password, enteredPassword);
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", UserSchema);
