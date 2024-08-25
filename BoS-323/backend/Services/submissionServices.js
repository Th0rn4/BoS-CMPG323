// Contains business logic for submission operations
const Submission = require("../Models/Submission");

// Function to create a new submission
const createSubmission = async (submissionData) => {
  const submission = new Submission(submissionData);
  return await submission.save();
};

// Function to retrieve all submissions
const getSubmissions = async () => {
  return await Submission.find();
};

const updateSubmission = async (submissionId, updateData) => {
  return await Submission.findByIdAndUpdate(submissionId, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteSubmission = async (submissionId) => {
  return await Submission.findByIdAndDelete(submissionId);
};

module.exports = {
  createSubmission,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
};
