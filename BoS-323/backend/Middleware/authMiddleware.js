const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// Protect routes
exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized to access this route" });
  }
};

// Authorize roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
