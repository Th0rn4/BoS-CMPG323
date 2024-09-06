// Contains business logic for assignment operations
const Assignment = require('../Models/Assignment');

const createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData);
  return await assignment.save();
};

const getAssignments = async () => {
  return await Assignment.find();
};

const updateAssignments = async (assignmentId, assignmentData) => {
  return await Assignment.findByIdAndUpdate(assignmentId, assignmentData);
};

module.exports = {
  reateAssignment,
  getAssignments,
  updateAssignments,
};
