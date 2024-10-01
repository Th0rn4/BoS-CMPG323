const User = require('./UserModels');

//specific function calls

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUsers = async () => {
  return await User.find();
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const updateUser = async (userId) => {
  return await User.findByIdAndUpdate(userId);
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
