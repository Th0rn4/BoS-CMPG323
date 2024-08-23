// Contains business logic for assignment operations
const Assignment = require('../Models/Assignment');

const createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData);
  return await assignment.save();
};

const getAssignments = async () => {
  return await Assignment.find();
};

module.exports = { createAssignment, getAssignments };
