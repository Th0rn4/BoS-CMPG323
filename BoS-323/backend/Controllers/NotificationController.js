// Manages notification-related actions (e.g., send, update, mark as read)
const { createNotification, getNotification } = require("../Services/notificationServices");
const { getNotification } = require("../Services/notificationServices");

exports.createNotification = async (req, res) => {
  try {
    const notification = await createNotification(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error creating Notification", error });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const noti = await getNotification();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Notification", error });
  }
};
