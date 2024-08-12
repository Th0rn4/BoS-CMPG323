// Defines user-related API routes
const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.post("/create", UserController.createUser);
router.get("/", UserController.getUsers);

module.exports = router;
