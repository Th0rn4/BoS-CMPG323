// Contains business logic for notification operations
const { Notification } = require('./NotificationModels');

const createNotification = async (notificationData) => {
  const notification = new Notification(notificationData);
  return await notification.save();
};

const getNotification = async () => {
  return await Notification.find();
};

const getNotificationById = async (id) => {
  return await Notification.findById(id);
};

const updateNotificationById = async (id, updateData) => {
  return await Notification.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNotificationById = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

module.exports = {
  createNotification,
  getNotification,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
