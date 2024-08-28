// Defines the Notification schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationStudentSchema = new Schema({
  NoftifcationHeader: { type: String, required: true, unique: true },
  NotificationDescription: { type: String, required: true, unique: true},
  AsignmentName: { type: String, required: true },
  DueDate: {type: Date, default: Date.now},
  Read: { type: Boolean, required: true}
});



const NotificationLecturerSchema = new Schema({
  NoftifcationHeader: { type: String, required: true, unique: true },
  NotificationDescription: { type: String, required: true, unique: true},
  AsignmentName: { type: String, required: true },
  DueDate: {type: Date, default: Date.now},
  
  
  });



  const StudentNotification = mongoose.model("StudentNotification", NotificationStudentSchema);
  const LecturerNotification = mongoose.model("LecturerNotification", NotificationLecturerSchema);
  
  module.exports = {
    StudentNotification,
    LecturerNotification
  };
