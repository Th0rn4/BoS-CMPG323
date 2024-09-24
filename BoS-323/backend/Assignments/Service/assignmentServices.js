// Contains business logic for assignment operations
const mongoose = require('mongoose');
const Assignment = require('../Model/Assignment');

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

const getAssignment = async (id) => {
  return await Assignment.findById(new mongoose.Types.ObjectId(id));
};

const deleteAssignment = async (id) => {
  return await Assignment.findByIdAndDelete(new mongoose.Types.ObjectId(id));
};

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  getAssignment,
  deleteAssignment,
};
