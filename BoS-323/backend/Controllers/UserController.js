// Manages user-related actions (e.g., registration, login, update, deletion)
const { createUser, getUsers, deleteUser } = require("../Services/userService");

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

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await this.deleteUser(req.parms.id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
