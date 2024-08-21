// Defines submission-related API routes
const express = require("express");
const router = express.Router();
const SubmissionController = require("../Controllers/SubmissionController");

router.post("/create", SubmissionController.createSubmission);
router.get("/", SubmissionController.getSubmissions);

module.exports = router;
