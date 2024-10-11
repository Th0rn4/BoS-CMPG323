const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  NotificationHeader: { type: String, required: true }, // Fixed typo
  NotificationDescription: { type: String, required: true },
  Read: { type: Boolean, required: true, default: false }, // Default to unread (false)
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// The _id field is automatically added by MongoDB, no need for NotificationID

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = {
  Notification,
};
