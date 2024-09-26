const {
  createNotification,
  getNotification,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require('./NotificationServices');

exports.createNotification = async (req, res) => {
  try {
    const notification = await createNotification({
      ...req.body,
      type: 'Notification',
    });
    res.status(201).json({
      success: true,
      message: 'Sucessfully created a new notification',
      notification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error creating notification', error });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const notifications = await getNotification({ type: 'Notification' });
    res.status(200).json({
      success: true,
      message: 'Sucessfully recieved all notifications',
      notifications,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error fetching notifications', error });
  }
};

exports.getNotificationByNotificationId = async (req, res) => {
  try {
    const notification = await getNotificationById(req.params.id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({
      success: true,
      message:
        'Sucessfully recieved a notifications based on the notification_id',
      notification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error fetching notification', error });
  }
};

exports.updateNotificationByNotificationId = async (req, res) => {
  try {
    const updatedNotification = await updateNotificationById(
      req.params.id,
      req.body
    );
    if (!updatedNotification) {
      return res
        .status(404)
        .json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Sucessfully updatede a notification',
      updatedNotification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error updating notification', error });
  }
};

exports.deleteNotificationByNotificationId = async (req, res) => {
  try {
    const deletedNotification = await deleteNotificationById(req.params.id);
    if (!deletedNotification) {
      return res
        .status(404)
        .json({ success: false, message: 'Notification not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error deleting notification', error });
  }
};
