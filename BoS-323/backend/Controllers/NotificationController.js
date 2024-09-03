const { createNotification, getNotification } = require("../Services/notificationServices");

exports.createNotification = async (req, res) => {
  try {
    const notification = await createNotification({ ...req.body, type: "Notification" });
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
    res.status(500).json({ message: "Error fetching  notifications", error });
  }
};



