// Defines assignment-related API routes
const express = require('express');
const router = express.Router();
const AssignmentController = require('../Controllers/AssignmentController');

router.post('/create', AssignmentController.createAssignment);
router.get('/', AssignmentController.getAssignment);
router.put('/update/:id', AssignmentController.updateAssignment);
router.get('/', AssignmentController.getAssignments);
router.delete('/delete/:id', AssignmentController.deleteAssignment);

module.exports = router;
