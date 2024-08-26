// Manages submission-related actions (e.g., submit, update, grade)
const {
  createSubmission,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
} = require("../Services/submissionServices");

exports.createSubmission = async (req, res) => {
  try {
    const submission = await createSubmission(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Error creating submission", error });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await getSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const updateData = req.body;
    const updatedSubmission = await updateSubmission(submissionId, updateData);

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating submission", error });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const deletedSubmission = await deleteSubmission(submissionId);

    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting submission", error });
  }
};
