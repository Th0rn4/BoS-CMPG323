// Manages user-related actions (e.g., registration, login, update, deletion)
const User = require("../Models/User");
const { createUser, getUsers, deleteUser } = require("../Services/userService");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

//C
exports.createUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

//R
exports.getUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

//U
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

//D
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
