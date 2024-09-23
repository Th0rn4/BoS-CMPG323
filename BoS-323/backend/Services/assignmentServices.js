// Contains business logic for assignment operations
const mongoose = require('mongoose');
const Assignment = require('../Models/Assignment');
const cloudinary = require('../Config/cloudinary');

const createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData);
  return await assignment.save();
};

const getAssignments = async () => {
  return await Assignment.find();
};

const updateAssignment = async (id, updateData) => {
  return await Assignment.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    updateData,
    { new: true, runValidators: true }
  );
};

const getAssignment = async (id) => {
  return await Assignment.findById(new mongoose.Types.ObjectId(id));
};

const deleteAssignment = async (id) => {
  return await Assignment.findByIdAndDelete(new mongoose.Types.ObjectId(id));
};

const uploadAttachmentToCloudinary = async (attachment, id) => {
  try {
    console.log('uploadAttachmentToCloudinary - received ID:', id);

    // Validate the ID
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid assignment ID');
    }

    // Upload the attachment to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadAttachment = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'assignment_attachments',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadAttachment.end(attachment.buffer);
    });

    const attachmentData = {
      file_name: result.original_filename,
      file_url: result.secure_url,
      upload_date: new Date(),
    };

    // Update the assignment with the Cloudinary URL using new ObjectId constructor
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { $push: { attachments: attachmentData } },
      { new: true, runValidators: true }
    );

    if (!updatedAssignment) {
      throw new Error(`Assignment with id ${id} not found`);
    }

    return updatedAssignment;
  } catch (error) {
    console.error('Error in uploadAttachmentToCloudinary service:', error);
    throw new Error(
      `Error uploading attachment to Cloudinary: ${error.message}`
    );
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  getAssignment,
  deleteAssignment,
  uploadAttachmentToCloudinary,
};
