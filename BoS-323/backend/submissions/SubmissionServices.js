// Contains business logic for submission operations
const Submission = require('./SubmissionModels');
const User = require('../users/UserModels');
const cloudinary = require('./cloudinary');
const mongoose = require('mongoose');
const XLSX = require('xlsx');

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
        from: 'users',
        localField: 'student_id',
        foreignField: '_id',
        as: 'student',
      },
    },
    {
      $unwind: '$student',
    },
    {
      $project: {
        submissionId: '$_id',
        studentId: '$student_id',
        studentName: {
          $concat: ['$student.name.firstName', ' ', '$student.name.lastName'],
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

// Function to retrieve a submission by student_id and status
const getSubmissionByStatus = async (studentId, status) => {
  return await Submission.find({
    student_id: new mongoose.Types.ObjectId(studentId),
    status: status,
  });
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
          resource_type: 'video',
          folder: 'assignment_submissions',
          quality: 'auto:good', // Automatically adjusts quality for balance
          transformation: [
            { width: 1280, height: 720, crop: 'limit' }, // Resize to 720p but keep the original format
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(file.buffer); // Upload video buffer to Cloudinary
    });

    // Video data to store in Submission model
    const videoData = {
      video_url: result.secure_url,
      upload_date: new Date(),
      size: result.bytes,
      duration: result.duration,
      format: result.format, // Keeps the original format
      public_id: result.public_id,
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
    console.error('Error in uploadVideoToCloudinary service:', error);
    throw new Error(`Error uploading video to Cloudinary: ${error.message}`);
  }
};

// Function to stream a submission video from Cloudinary
const streamVideoFromCloudinary = async (publicId, format, res) => {
  try {
    // Generate a URL for the video with optional transformations (for adaptive bitrate streaming)
    const videoUrl = cloudinary.url(publicId, {
      resource_type: 'video',
      format: format || 'mp4',
      quality: 'auto', // For automatic bitrate adjustment
      transformation: [
        { width: 1280, height: 720, crop: 'limit' }, // Resize to 720p but keep the original format
        { fetch_format: 'auto', bitrate: 'auto' }, // Automatic bitrate selection for adaptive streaming
      ],
    });

    // Redirect or stream video directly
    res.redirect(videoUrl);
  } catch (error) {
    console.error('Error streaming video from Cloudinary:', error);
    throw new Error(`Error streaming video from Cloudinary: ${error.message}`);
  }
};

//Function to downlaod feeback to excel
const generateFeedbackExcel = async (assignmentId) => {
  try {
    const submissions = await Submission.aggregate([
      {
        $match: { assignment_id: new mongoose.Types.ObjectId(assignmentId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'student_id',
          foreignField: '_id',
          as: 'student',
        },
      },
      {
        $unwind: '$student',
      },
      {
        $project: {
          firstName: '$student.name.firstName',
          lastName: '$student.name.lastName',
          feedback: 1,
        },
      },
    ]);

    if (submissions.length === 0) {
      throw new Error('No submissions found for this assignment');
    }

    const worksheetData = [];

    submissions.forEach((submission) => {
      submission.feedback.forEach((feedback) => {
        worksheetData.push({
          'First Name': submission.firstName,
          'Last Name': submission.lastName,
          Grade: feedback.grade,
          Comment: feedback.comment,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback');

    const excelBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    return excelBuffer;
  } catch (error) {
    console.error('Error in generateFeedbackExcel:', error);
    throw error;
  }
};

// Function to download a submission video from Cloudinary
const downloadVideoFromCloudinary = async (publicId) => {
  try {
    // Generate a signed URL for the video file download
    const videoUrl = cloudinary.url(publicId, {
      resource_type: 'video',
      type: 'upload',
      flags: 'attachment', // Forces the video to be downloaded instead of played in the browser
    });

    return videoUrl;
  } catch (error) {
    console.error('Error in downloadVideoFromCloudinary service:', error);
    throw new Error(
      `Error downloading video from Cloudinary: ${error.message}`
    );
  }
};

const getSubmissionsByAssignment = async (assignmentId) => {
  return await Submission.find({ assignmentId });
};

const getSubmissionsByAssignmentId = async (assignmentId) => {
  try {
    const submissions = await Submission.find({ assignment_id: assignmentId })
      .populate({
        path: 'student_id',
        select: 'name role',
      })
      .exec();

    return submissions;
  } catch (error) {
    throw new Error('Error fetching submissions: ' + error.message);
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  getFeedbackForAssignment,
  getSubmissionById,
  getSubmissionByStatus,
  updateSubmission,
  deleteSubmission,
  uploadVideoToCloudinary,
  streamVideoFromCloudinary,
  generateFeedbackExcel,
  downloadVideoFromCloudinary,
  getSubmissionsByAssignment,
  getSubmissionsByAssignmentId,
};
