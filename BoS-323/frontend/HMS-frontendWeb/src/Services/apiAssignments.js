import axios from "axios";

const API_URL = "https://bos-cmpg323-assignmentdeploy.onrender.com/api/assignments"; 

// Fetch assignments function
export const fetchAssignments = async () => {
  try {
    const response = await axios.get(API_URL); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching assignments:", error.response?.data?.error || error.message);
    throw new Error("Failed to fetch assignments");
  }
};

// Add assignment function
export const addAssignment = async (newAssignment) => {
  // Validate the newAssignment object
  if (!newAssignment.title || !newAssignment.description || !newAssignment.due_date) {
    throw new Error("Title, description, and due date are required fields.");
  }

  try {
    const response = await axios.post(API_URL, newAssignment, { 
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error("Error adding assignment:", error.response?.data?.error || error.message);
    throw new Error("Failed to add assignment");
  }
};
