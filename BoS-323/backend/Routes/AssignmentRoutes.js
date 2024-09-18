// Defines assignment-related API routes
const express = require('express');
const router = express.Router();
const AssignmentController = require('../Controllers/AssignmentController');
const uploadMulter = require('../Config/multerAssignment');

router.post('/create', AssignmentController.createAssignment);
router.get('/', AssignmentController.getAssignments);
router.put('/update/:id', AssignmentController.updateAssignment);
router.delete('/delete/:id', AssignmentController.deleteAssignment);
router.put(
  '/:id/upload',
  uploadMulter.single('raw'),
  AssignmentController.uploadAttachmentToCloudinary
);

module.exports = router;
