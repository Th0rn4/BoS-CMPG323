// Manages submission-related actions (e.g., submit, update, grade)
const mongoose = require("mongoose");
const {
  createSubmission,
  getSubmissions,
  getFeedbackForAssignment,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  uploadVideoToCloudinary,
} = require("../Services/submissionServices");

exports.createSubmission = async (req, res) => {
  try {
    const submission = await createSubmission(req.body);
    res
      .status(201)
      .json({ message: "Sucessfully created a new submission", submission });
  } catch (error) {
    res.status(500).json({ message: "Error creating submission", error });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await getSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error });
  }
};

exports.getAssignmentFeedback = async (req, res) => {
  const assignmentId = req.params.assignmentId;

  if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
    return res.status(400).json({ message: "Invalid assignment ID format" });
  }

  const feedbackList = await getFeedbackForAssignment(assignmentId);

  if (feedbackList.length === 0) {
    return res
      .status(404)
      .json({ message: "No submissions found for this assignment" });
  }

  res.status(200).json(feedbackList);
};

exports.getOneSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).json({ message: "Invalid submission ID" });
    }

    const submission = await getSubmissionById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error("Error in getOneSubmission:", error); // Log the error
    res
      .status(500)
      .json({ message: "Error fetching submissions", error: error.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const updateData = req.body;
    const updatedSubmission = await updateSubmission(submissionId, updateData);

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating submission", error });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const deletedSubmission = await deleteSubmission(submissionId);

    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting submission", error });
  }
};

exports.uploadVideoToCloudinary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const submissionId = req.params.id;
    const updatedSubmission = await uploadVideoToCloudinary(
      req.file,
      submissionId
    );

    res
      .status(200)
      .json({ message: "Video uploaded successfully", updatedSubmission });
  } catch (error) {
    console.error("Error in uploadVideoToCloudinary controller:", error);
    res.status(500).json({
      message: "Error uploading video",
      error: error.message || "Unknown error occurred",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
