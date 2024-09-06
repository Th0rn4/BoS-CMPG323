// Manages assignment-related actions (e.g., create, update, deletion)
const {
  createAssignment,
  getAssignment,
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
    const updatedAssignment = await updateAssignment(req.params.id, req.body);
    if (!updatedAssignment)
      return res.status(404).json({ message: 'Assignment not found' });
    res.json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating assignment', error });
  }
};
