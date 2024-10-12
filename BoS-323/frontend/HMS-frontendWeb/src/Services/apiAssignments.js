import axios from "axios";

// Change the API_URL to point to the create endpoint
const API_URL = "https://bos-cmpg323-assignmentdeploy.onrender.com/api/assignments";

// Fetch assignments function
export const fetchAssignments = async () => {
  try {
    const response = await axios.get(API_URL); // Fetch from the main endpoint
    console.log("Fetched Assignments Data:", response.data); // Log the fetched data for debugging
    return response.data; // Adjust this based on the actual structure
  } catch (error) {
    console.error(
      "Error fetching assignments:",
      error.response?.data?.error || error.message
    );
    throw new Error("Failed to fetch assignments");
  }
};

// Add assignment function
export const addAssignment = async (newAssignment) => {
  if (!newAssignment.title || !newAssignment.description || !newAssignment.due_date) {
    throw new Error("Title, description, and due date are required fields.");
  }

  try {
    const response = await axios.post(`${API_URL}/create`, newAssignment, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // This should return a success state from your API
  } catch (error) {
    console.error(
      "Error adding assignment:",
      error.response?.data?.error || error.message
    );
    throw new Error("Failed to add assignment");
  }
};

export const deleteAssignment = async (_id) => {
  try {
    // Make sure to use the correct endpoint for deletion
    await axios.delete(`${API_URL}/delete/${_id}`);
  } catch (error) {
    console.error("Error deleting notification:", error.response?.data?.error || error.message);
    throw new Error("Failed to delete notification");
  }
};