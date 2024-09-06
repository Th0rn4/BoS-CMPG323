// Defines assignment-related API routes
const express = require('express');
const router = express.Router();
const AssignmentController = require('../Controllers/AssignmentController');

router.post('/create', AssignmentController.createAssignment);
router.get('/', AssignmentController.getAssignments);
router.delete('/:id', AssignmentController.deleteAssignment);

module.exports = router;
