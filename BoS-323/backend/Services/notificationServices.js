// Contains business logic for notification operations
const Notification = require("../Models/Notification");

const createNotification = async (NotificationData) => {
  const Notification = new Notification(userData);
  return await Notification.save();
};

const getNotification = async () => {
  return await Notification.find();
};

module.exports = { createNotification, getNotification };