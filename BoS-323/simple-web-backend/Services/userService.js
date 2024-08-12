// Contains business logic for user operations
const User = require("../Models/User");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUsers = async () => {
  return await User.find();
};

module.exports = { createUser, getUsers };
