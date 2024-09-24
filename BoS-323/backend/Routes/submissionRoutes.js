// Defines submission-related API routes
const express = require("express");
const router = express.Router();
const SubmissionController = require("../Controllers/SubmissionController");
const uploadMulter = require("../Config/multer");

router.post("/create", SubmissionController.createSubmission);
router.get("/", SubmissionController.getSubmissions);
router.get(
  "/:assignmentId/feedback",
  SubmissionController.getAssignmentFeedback
);
router.get("/:id/single", SubmissionController.getOneSubmission);
router.put("/:id", SubmissionController.updateSubmission);
router.put(
  "/:id/upload",
  uploadMulter.single("video"),
  SubmissionController.uploadVideoToCloudinary
);
router.delete("/:id", SubmissionController.deleteSubmission);
router.get(
  "/:assignmentId/feedback/download",
  SubmissionController.downloadAssignmentFeedback
);

module.exports = router;
