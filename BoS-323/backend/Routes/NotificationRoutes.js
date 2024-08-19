// Defines notification-related API routes
const express = require("express");
const router = express.Router();
const UserNotification = require("../Controllers/NotificationController");

router.post("/create", UserNotification.createNotification);
router.get("/", UserNotification.getNotification);

module.exports = router;
