// Contains business logic for submission operations
const Submission = require("../Models/Submission");
const cloudinary = require("../Config/cloudinary");
const mongoose = require("mongoose");
const XLSX = require("xlsx");

// Function to create a new submission
const createSubmission = async (submissionData) => {
  const submission = new Submission(submissionData);
  return await submission.save();
};

// Function to retrieve all submissions
const getSubmissions = async () => {
  return await Submission.find();
};

//Function to retrieve user information and feedback on submission for an assignment
const getFeedbackForAssignment = async (assignmentId) => {
  const submissions = await Submission.aggregate([
    {
      $match: { assignment_id: new mongoose.Types.ObjectId(assignmentId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "student_id",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $project: {
        submissionId: "$_id",
        studentId: "$student_id",
        studentName: {
          $concat: ["$student.name.firstName", " ", "$student.name.lastName"],
        },
        feedback: 1,
      },
    },
  ]);

  return submissions;
};

// Function to retrieve a single submission
const getSubmissionById = async (submissionId) => {
  return await Submission.findById(submissionId);
};

//Function to update a submission based on the id
const updateSubmission = async (submissionId, updateData) => {
  return await Submission.findByIdAndUpdate(submissionId, updateData, {
    new: true,
    runValidators: true,
  });
};

//Function to delete a submision based on the id
const deleteSubmission = async (submissionId) => {
  return await Submission.findByIdAndDelete(submissionId);
};

//Function to upload video to Cloudinary
const uploadVideoToCloudinary = async (file, submissionId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "assignment_submissions",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });

    const videoData = {
      video_url: result.secure_url,
      upload_date: new Date(),
      size: result.bytes,
      duration: result.duration,
      format: result.format,
    };

    const updatedSubmission = await Submission.findByIdAndUpdate(
      submissionId,
      { $set: { videos: [videoData] } },
      { new: true, runValidators: true }
    );

    if (!updatedSubmission) {
      throw new Error(`Submission with id ${submissionId} not found`);
    }

    return updatedSubmission;
  } catch (error) {
    console.error("Error in uploadVideoToCloudinary service:", error);
    throw new Error(`Error uploading video to Cloudinary: ${error.message}`);
  }
};

// Function to download a submission video from Cloudinary
const generateFeedbackExcel = async (assignmentId) => {
  try {
    const submissions = await Submission.aggregate([
      {
        $match: { assignment_id: new mongoose.Types.ObjectId(assignmentId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "student_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $project: {
          firstName: "$student.name.firstName",
          lastName: "$student.name.lastName",
          feedback: 1,
        },
      },
    ]);

    if (submissions.length === 0) {
      throw new Error("No submissions found for this assignment");
    }

    const worksheetData = [];

    submissions.forEach((submission) => {
      submission.feedback.forEach((feedback) => {
        worksheetData.push({
          "First Name": submission.firstName,
          "Last Name": submission.lastName,
          Grade: feedback.grade,
          Comment: feedback.comment,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    return excelBuffer;
  } catch (error) {
    console.error("Error in generateFeedbackExcel:", error);
    throw error;
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  getFeedbackForAssignment,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  uploadVideoToCloudinary,
  generateFeedbackExcel,
};
