// Manages submission-related actions (e.g., submit, update, grade)
const mongoose = require("mongoose");
const Submission = require("./SubmissionModels");
const {
  createSubmission,
  getSubmissions,
  getFeedbackForAssignment,
  getSubmissionById,
  getSubmissionByStatus,
  updateSubmission,
  deleteSubmission,
  uploadVideoToCloudinary,
  streamVideoFromCloudinary,
  generateFeedbackExcel,
  downloadVideoFromCloudinary,
  getSubmissionsByAssignmentId,
} = require("./SubmissionServices");

exports.createSubmission = async (req, res) => {
  try {
    const submission = await createSubmission(req.body);
    res.status(201).json({
      success: true,
      message: "Sucessfully created a new submission",
      submission,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating submission", error });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await getSubmissions();
    res.status(200).json({
      success: true,
      message: "Sucessfully retrieved all submissions",
      submissions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching submissions", error });
  }
};

exports.getOneSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid submission ID" });
    }

    const submission = await getSubmissionById(submissionId);

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    res.status(200).json({
      success: true,
      message: "Sucessfully retrieved a submission",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
      error: error.message,
    });
  }
};

exports.getSubmissionsByStatus = async (req, res) => {
  try {
    const { studentId, status } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const submissions = await getSubmissionByStatus(studentId, status);

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No submissions found for the given status",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved submissions",
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
      error: error.message,
    });
  }
};

exports.getAssignmentFeedback = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid assignment ID format" });
    }

    const feedbackList = await getFeedbackForAssignment(assignmentId);

    if (feedbackList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No submissions found for this assignment",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sucessfully retrieved all the feedback for an assignment",
      feedbackList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assignment feedback",
      error,
    });
  }
};

exports.downloadAssignmentFeedback = async (req, res) => {
  const assignmentId = req.params.assignmentId;

  if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid assignment ID format" });
  }

  try {
    const excelBuffer = await generateFeedbackExcel(assignmentId);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=assignment_${assignmentId}_feedback.xlsx`
    );
    res.setHeader("Content-Length", excelBuffer.length);

    res.end(excelBuffer);
    res.status(200).json({
      success: true,
      message: "Sucessfully retrieved all the feedback, file can be downloaded",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating feedback Excel file",
      error: error.message || "Unknown error",
    });
  }
};

exports.streamVideo = async (req, res) => {
  try {
    const submissionId = req.params.id;

    // Retrieve the submission from MongoDB
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    if (!submission.videos || !submission.videos[0].public_id) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const videoFormat = req.query.format || "mp4"; // Optional query parameter for video format
    // Call the stream service with the public ID from Cloudinary and the video format
    await streamVideoFromCloudinary(
      submission.videos[0].public_id,
      videoFormat,
      res
    );
    res
      .status(206)
      .json({ success: true, message: "Sucessfully retrieved video" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error streaming video",
      error: error.message || "Unknown error occurred",
    });
  }
};

exports.downloadVideo = async (req, res) => {
  try {
    const submissionId = req.params.id;

    // Find the submission in MongoDB
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    if (!submission.videos || !submission.videos[0].public_id) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const videoDownloadUrl = await downloadVideoFromCloudinary(
      submission.videos[0].public_id
    );

    // Send the download link as a response
    res.status(200).json({
      success: true,
      message: "Video can be downloaded",
      downloadUrl: videoDownloadUrl,
    });
  } catch (error) {
    console.error("Error in downloadVideo controller:", error);
    res.status(500).json({
      success: false,
      message: "Error downloading video",
      error: error.message || "Unknown error occurred",
    });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const updateData = req.body;
    const updatedSubmission = await updateSubmission(submissionId, updateData);

    if (!updatedSubmission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Submission updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating submission", error });
  }
};

exports.uploadVideoToCloudinary = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const submissionId = req.params.id;
    const updatedSubmission = await uploadVideoToCloudinary(
      req.file,
      submissionId
    );

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      updatedSubmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading video",
      error: error.message || "Unknown error occurred",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const deletedSubmission = await deleteSubmission(submissionId);

    if (!deletedSubmission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    res
      .status(200)
      .json({ success: false, message: "Submission deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting submission", error });
  }
};

exports.getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const result = await getSubmissionsByAssignmentId(assignmentId);

    if (!result || result.submissions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Submissions not found" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error in getSubmissionsByAssignment:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching submissions", error });
  }
};
