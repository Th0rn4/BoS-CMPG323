// Defines submission-related API routes
const express = require('express');
const router = express.Router();
const SubmissionController = require('./SubmissionControllers');
const uploadMulter = require('./multer');

router.post('/create', SubmissionController.createSubmission);
router.get('/', SubmissionController.getSubmissions);
router.get(
  '/:assignmentId/feedback',
  SubmissionController.getAssignmentFeedback
);
router.get('/:id/single', SubmissionController.getOneSubmission);
router.get(
  '/:studentId/status/:status',
  SubmissionController.getSubmissionsByStatus
);
router.put('/:id', SubmissionController.updateSubmission);
router.put(
  '/:id/upload',
  uploadMulter.single('video'),
  SubmissionController.uploadVideoToCloudinary
);
router.delete('/:id', SubmissionController.deleteSubmission);
router.get(
  '/:assignmentId/feedback/download',
  SubmissionController.downloadAssignmentFeedback
);
router.get('/stream/:id', SubmissionController.streamVideo);

router.get('/:id/download', SubmissionController.downloadVideo);

router.get('/submissions', SubmissionController.getSubmissionsByAssignment);

// Get all submissions for a specific assignment
router.get(
  '/assignments/:assignmentId/submissions',
  SubmissionController.getSubmissionsByAssignment
);

module.exports = router;
