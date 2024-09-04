// Manages assignment-related actions (e.g., create, update, deletion)
const {
  createAssignment,
  getAssignment,
} = require('../Services/assignmentServices');

//Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const assignment = await createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error });
  }
};

//Get a specific assignment by its ID
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

//delete a specific assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await getAssignment(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: 'Assignment not found' });
    await deleteAssignment(assignment.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment', error });
  }
};
