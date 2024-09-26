// Manages assignment-related actions (e.g., create, update, deletion)
const mongoose = require("mongoose");
const {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../Service/assignmentServices");

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await createAssignment(req.body);
    res.status(201).json({
      success: true,
      message: "Sucessfully created a new assignment",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating assignment",
      error: error.message,
    });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await getAssignments();
    res.status(200).json({
      success: true,
      message: "Sucessfully recieved all assignments",
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    let assignmentId = req.params.id;

    // Remove leading colon if present
    if (assignmentId.startsWith(":")) {
      assignmentId = assignmentId.slice(1);
    }

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid assignment ID format" });
    }

    const assignment = await getAssignment(assignmentId);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }
    const result = await deleteAssignment(assignmentId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found or already deleted",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Assignment successfully deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting assignment",
      error: error.message,
    });
  }
};

// Update a assignment
exports.updateAssignment = async (req, res) => {
  try {
    let assignmentId = req.params.id;

    // Remove leading colon if present
    if (assignmentId.startsWith(":")) {
      assignmentId = assignmentId.slice(1);
    }

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid assignment ID format" });
    }

    const updatedAssignment = await updateAssignment(assignmentId, req.body);

    if (!updatedAssignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Assignment successfully updated",
      updatedAssignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating assignment",
      error: error.message,
    });
  }
};
