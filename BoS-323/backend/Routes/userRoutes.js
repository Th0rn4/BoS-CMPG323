const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../Controllers/UserController");

// CRUD
router.post("/create", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);
router.post("/login", UserController.loginUser);

// OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

module.exports = router;
