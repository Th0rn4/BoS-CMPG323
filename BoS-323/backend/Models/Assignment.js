// Defines the Assignment schema and model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  title: { type: String, required: true }, // Title of the assignment
  description: { type: String, required: true }, // Description of the assignment
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the lecturer/admin who created the assignment
  due_date: { type: Date, required: true }, // Assignment due date
  create_date: { type: Date, default: Date.now }, // Date when the assignment was created
  mark_allocation: { type: Number, default: 100 }, // Maximum marks for the assignment
  attachments: [
    {
      file_name: { type: String, required: true }, // Attachment file name
      file_url: { type: String, required: true }, // URL to the attachment
      upload_date: { type: Date, default: Date.now }, // Date when the attachment was uploaded
    },
  ],
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
