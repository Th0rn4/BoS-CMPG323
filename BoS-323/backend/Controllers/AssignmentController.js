// Manages assignment-related actions (e.g., create, update, deletion)
const mongoose = require('mongoose');
const {
  createAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
} = require('../Services/assignmentServices');

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error });
  }
};

exports.getAssignment = async (req, res) => {
  try {
    const assignment = await getAssignment(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error getting assignment', error });
  }
};

// Update a assignment

exports.updateAssignment = async (req, res) => {
  try {
    let assignmentId = req.params.id;
    console.log('Received ID for update:', assignmentId);

    // Remove leading colon if present
    if (assignmentId.startsWith(':')) {
      assignmentId = assignmentId.slice(1);
    }

    console.log('Processed ID for update:', assignmentId);

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: 'Invalid assignment ID format' });
    }

    console.log('Attempting to update assignment with ID:', assignmentId);
    console.log('Update data:', req.body);

    const updatedAssignment = await updateAssignment(assignmentId, req.body);

    if (!updatedAssignment) {
      console.log('Assignment not found for update');
      return res.status(404).json({ message: 'Assignment not found' });
    }

    console.log('Assignment successfully updated');
    res.json(updatedAssignment);
  } catch (error) {
    console.error('Error in updateAssignment:', error);
    res
      .status(500)
      .json({ message: 'Error updating assignment', error: error.message });
  }
};
