// Defines user-related API routes
const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

//CRUD
router.post("/create", UserController.createUser);
router.get("/", UserController.getUsers);
router.put("/update/:id", UserController.updateUser);
router.delete("/delte/:id", UserController.deleteUser);

module.exports = router;
