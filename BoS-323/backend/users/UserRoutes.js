const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  logout,
} = require("./UserController");
const { protect, authorize } = require("./authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/logout", protect, logout); // Protect the logout route
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);

// Admin routes (restricted to admin users)
router.use(protect);
router.use(authorize("admin"));
router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
