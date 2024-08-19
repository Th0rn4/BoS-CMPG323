// Defines the Assignment schema and model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  course: { type: String, ref: 'Course', required: true },
  submissions: [{ type: String, ref: 'Submission' }],
});
