const express = require('express');
const router = express.Router();
const NotificationController = require('./NotificationController');

router.post('/create', NotificationController.createNotification);
router.get('/', NotificationController.getNotification);
router.get('/:id', NotificationController.getNotificationByNotificationId);
router.put(
  '/update/:id',
  NotificationController.updateNotificationByNotificationId
);
router.delete(
  '/delete/:id',
  NotificationController.deleteNotificationByNotificationId
);

module.exports = router;
