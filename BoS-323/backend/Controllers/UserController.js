// Manages user-related actions (e.g., registration, login, update, deletion)
const User = require("../Models/User");
const { createUser, getUsers, deleteUser } = require("../Services/userService");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

exports.createUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const updateUserData = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updateUserData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updateUserData);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deletedUser = await deleteUser(new ObjectId(userId));
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
