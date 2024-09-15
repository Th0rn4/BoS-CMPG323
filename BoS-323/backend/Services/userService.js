const User = require("../Models/User");

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

// In your userService.js
const findOrCreate = async (profile) => {
  const { id, emails, name } = profile;
  let user = await User.findOne({ googleId: id });
  if (!user) {
    user = new User({
      googleId: id,
      email: emails[0].value,
      name: { firstName: name.givenName, lastName: name.familyName },
      // Add other fields if needed
    });
    await user.save();
  }
  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
