const User = require('./UserModels');
const jwt = require('jsonwebtoken');

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message: message || 'Success',
      token,
      user: {
        id: user._id,
        name: `${user.name.firstName} ${user.name.lastName}`,
        role: user.role,
      },
    });
};

// Register a user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const user = await User.create({
      name: { firstName, lastName },
      email,
      password,
      role,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid credentials' });
    }

    // Generate token and respond with user details
    sendTokenResponse(user, 200, res, 'Logged in successfully');
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get logged-in user details
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user details
exports.updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      'name.firstName': req.body.firstName,
      'name.lastName': req.body.lastName,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res
        .status(401)
        .json({ success: false, error: 'Current password is incorrect' });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Log out user and clear the token cookie
exports.logout = (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: 'No user is logged in' });
  }

  res.cookie('token', '', {
    expires: new Date(Date.now()), // Expire the cookie immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    success: true,
    message: `${req.user.name.firstName} ${req.user.name.lastName} has logged out successfully`,
  });
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin: Get a single user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin: Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Admin: Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
