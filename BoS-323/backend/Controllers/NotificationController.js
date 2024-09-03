const {
  createNotification,
  getNotification,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require("../Services/notificationServices");

exports.createNotification = async (req, res) => {
  try {
    const notification = await createNotification({
      ...req.body,
      type: "Notification",
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification", error });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const notifications = await getNotification({ type: "Notification" });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

exports.getNotificationByNotificationId = async (req, res) => {
  try {
    const notification = await getNotificationById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ message: "Error fetching notification", error });
  }
};

exports.updateNotificationByNotificationId = async (req, res) => {
  try {
    const updatedNotification = await updateNotificationById(
      req.params.id,
      req.body
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Error updating notification", error });
  }
};

exports.deleteNotificationByNotificationId = async (req, res) => {
  try {
    const deletedNotification = await deleteNotificationById(req.params.id);
    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Error deleting notification", error });
  }
};
