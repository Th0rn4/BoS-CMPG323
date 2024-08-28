// Defines the Submission schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines the Submissions schema
const SubmissionSchema = new Schema({
  assignment_id: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  submit_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In progress", "Submitted", "Graded"],
    default: "Not Started",
    required: true,
  },
  feedback: [
    {
      grade: {
        type: Number,
        default: null,
      },
      comment: {
        type: String,
        default: null,
      },
    },
  ],
  videos: [
    {
      video_url: {
        type: String,
        default: null,
      },
      upload_date: {
        type: Date,
        default: null,
      },
      size: {
        type: Number,
        default: null,
      },
      duration: {
        type: Number,
        default: null,
      },
      format: {
        type: String,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model("Submission", SubmissionSchema);
