// Defines submission-related API routes
const express = require("express");
const router = express.Router();
const SubmissionController = require("../Controllers/SubmissionController");

router.post("/create", SubmissionController.createSubmission);
router.get("/", SubmissionController.getSubmissions);
router.put("/:id", SubmissionController.updateSubmission);
router.delete("/:id", SubmissionController.deleteSubmission);

module.exports = router;
