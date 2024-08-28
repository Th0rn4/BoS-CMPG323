// Contains business logic for notification operations
const { StudentNotification, LecturerNotification } = require("../Models/Notification");

const createStudentNotification = async (notificationData) => {
  const notification = new StudentNotification(notificationData);
  return await notification.save();
};

const getStudentNotifications = async () => {
  return await StudentNotification.find();
};

const createLecturerNotification = async (notificationData) => {
  const notification = new LecturerNotification(notificationData);
  return await notification.save();
};

const getLecturerNotifications = async () => {
  return await LecturerNotification.find();
};

module.exports = { 
  createStudentNotification, 
  getStudentNotifications, 
  createLecturerNotification, 
  getLecturerNotifications 
};