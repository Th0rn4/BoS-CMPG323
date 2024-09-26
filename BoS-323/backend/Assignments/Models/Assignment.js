// Defines the Assignment schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  title: { type: String, required: true }, // Title of the assignment
  description: { type: String, required: true }, // Description of the assignment
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the lecturer/admin who created the assignment
  due_date: { type: Date, required: true, index: true }, // Assignment due date
  create_date: { type: Date, default: Date.now, index: true }, // Date when the assignment was created
  mark_allocation: { type: Number, default: 100 }, // Maximum marks for the assignment
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
