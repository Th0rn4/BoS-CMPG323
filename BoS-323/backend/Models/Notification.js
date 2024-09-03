// Defines the Notification schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    NotificationID: {type:mongoose.Schema.Types.ObjectId, ref: 'Notification' },
    NoftifcationHeader: { type: String, required: true, unique: true },
    NotificationDescription: { type: String, required: true, unique: true},
    Read: { type: Boolean, required: true}
})


  const Notification = mongoose.model("Notification", NotificationSchema);

  
  module.exports = {
    Notification
  };

