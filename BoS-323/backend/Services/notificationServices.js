
// Contains business logic for notification operations
const { Notification } = require("../Models/Notification");

const createNotification = async (notificationData) => {
  const notification = new Notification(notificationData);
  return await notification.save();
};

const getNotification = async () => {
  return await Notification.find();
};



module.exports = { 
  createNotification, 
  getNotification, 
 
};