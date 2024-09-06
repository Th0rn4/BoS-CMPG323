// Contains business logic for assignment operations
const Assignment = require('../Models/Assignment');
const mongoose = require('mongoose');

const createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData);
  return await assignment.save();
};

const getAssignments = async () => {
  return await Assignment.find();
};

const updateAssignment = async (id, updateData) => {
  return await Assignment.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    updateData,
    { new: true, runValidators: true }
  );
};

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
};
