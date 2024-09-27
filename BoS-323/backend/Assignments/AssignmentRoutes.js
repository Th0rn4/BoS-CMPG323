// Defines assignment-related API routes
const express = require('express');
const router = express.Router();
const AssignmentController = require('./AssignmentController');

router.post('/create', AssignmentController.createAssignment);
router.get('/', AssignmentController.getAssignments);
router.put('/update/:id', AssignmentController.updateAssignment);
router.delete('/delete/:id', AssignmentController.deleteAssignment);

module.exports = router;
