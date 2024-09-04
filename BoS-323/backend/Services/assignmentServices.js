// Contains business logic for assignment operations
const Assignment = require('../Models/Assignment');

const createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData);
  return await assignment.save();
};

const getAssignments = async () => {
  return await Assignment.find();
};

const deleteAssignment = async () => {
  return await Assignment.findByIdAndDelete(assignment_id);
};

module.exports = {
  createAssignment,
  getAssignments,
  deleteAssignment,
};
