// Defines submission-related API routes
const express = require("express");
const router = express.Router();
const SubmissionController = require("../Controllers/SubmissionController");
const uploadMulter = require("../Config/multer");

router.post("/create", SubmissionController.createSubmission);
router.get("/", SubmissionController.getSubmissions);
router.get("/:id/single", SubmissionController.getOneSubmission);
router.put("/:id", SubmissionController.updateSubmission);
router.delete("/:id", SubmissionController.deleteSubmission);
router.put(
  "/:id/upload",
  uploadMulter.single("video"),
  SubmissionController.uploadVideoToCloudinary
);

module.exports = router;
