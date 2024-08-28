// Contains business logic for submission operations
const Submission = require("../Models/Submission");
const cloudinary = require("../Config/cloudinary");

// Function to create a new submission
const createSubmission = async (submissionData) => {
  const submission = new Submission(submissionData);
  return await submission.save();
};

// Function to retrieve all submissions
const getSubmissions = async () => {
  return await Submission.find();
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

module.exports = {
  createSubmission,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
  uploadVideoToCloudinary,
};
