// Manages assignment-related actions (e.g., create, update, deletion)
const mongoose = require('mongoose');
const {
  createAssignment,
  getAssignments,
  getAssignment,
  deleteAssignment,
} = require('../Services/assignmentServices');

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating assignment', error: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await getAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching assignments', error: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    let assignmentId = req.params.id;
    console.log('Received ID:', assignmentId);

    // Remove leading colon if present
    if (assignmentId.startsWith(':')) {
      assignmentId = assignmentId.slice(1);
    }

    console.log('Processed ID:', assignmentId);

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: 'Invalid assignment ID format' });
    }

    console.log('Attempting to delete assignment with ID:', assignmentId);

    const assignment = await getAssignment(assignmentId);
    if (!assignment) {
      console.log('Assignment not found');
      return res.status(404).json({ message: 'Assignment not found' });
    }

    console.log('Assignment found, proceeding with deletion');
    const result = await deleteAssignment(assignmentId);
    console.log('Deletion result:', result);

    if (!result) {
      console.log('No assignment was deleted');
      return res
        .status(404)
        .json({ message: 'Assignment not found or already deleted' });
    }

    console.log('Assignment successfully deleted');
    res.status(200).json({ message: 'Assignment successfully deleted' });
  } catch (error) {
    console.error('Error in deleteAssignment:', error);
    res
      .status(500)
      .json({ message: 'Error deleting assignment', error: error.message });
  }
};
