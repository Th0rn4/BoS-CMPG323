// Defines the Notification schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationStudentSchema = new Schema({
  NoftifcationHeader: { type: String, required: true, unique: true },
  NotificationDescription: { type: String, required: true, unique: true},
  role: {
    type: String,
    enum: ["student","admin"],
    required: true,
  },
  SubjectCode: { type: String, required: true },
  Lecturer: { type: String, required: true },
  PublishedDate: { type: Date, default: Date.now },
  DueDate: {type: Date, default: Date.now},
  

});

const NotificationSubmitSchema = new Schema({
    NoftifcationHeader: { type: String, required: true, unique: true },
    NotificationDescription: { type: String, required: true, unique: true},
    role: {
      type: String,
      enum: ["student","admin"],
      required: true,
    },
    SubjectCode: { type: String, required: true },
    AsignmentName: { type: String, required: true },
    StudentID: { type: String, required: true },
    SubmittedDate: { type: Date, default: Date.now },
    DueDate: {type: Date, default: Date.now},
    
  
  });

  const NotificationReminderSchema = new Schema({
    NoftifcationHeader: { type: String, required: true, unique: true },
    NotificationDescription: { type: String, required: true, unique: true},
    role: {
      type: String,
      enum: ["student","admin"],
      required: true,
    },
    SubjectCode: { type: String, required: true },
    AsignmentName: { type: String, required: true },
    DueDate: {type: Date, default: Date.now},
    
  
  });



module.exports = mongoose.model("Notification", NotificationStudentSchema,"NotificationSubmit",NotificationSubmitSchema, "NotificationReminder", NotificationReminderSchema);

