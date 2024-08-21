// Manages submission-related actions (e.g., submit, update, grade)
const {
  createSubmission,
  getSubmissions,
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
