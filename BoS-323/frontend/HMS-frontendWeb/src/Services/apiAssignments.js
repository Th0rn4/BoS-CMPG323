// apiAssignments.js

import axios from "axios";

const ASSIGNMENTS_API_URL =
  "https://bos-cmpg323-assignmentdeploy.onrender.com/api/assignments";

// Fetch all assignments
export const fetchAssignments = async () => {
  try {
    const response = await axios.get(`${ASSIGNMENTS_API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

// Add a new assignment
export const addAssignment = async (assignmentData) => {
  try {
    const response = await axios.post(
      `${ASSIGNMENTS_API_URL}/create`,
      assignmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding assignment:", error);
    throw error;
  }
};

// Delete an assignment
export const deleteAssignment = async (id) => {
  try {
    if (!id) {
      throw new Error("Assignment ID is required to delete.");
    }

    const response = await axios.delete(`${ASSIGNMENTS_API_URL}/delete/${id}`); // Ensure correct DELETE request
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error); // Log the error
    throw error; // Rethrow to handle it in the component
  }
};
