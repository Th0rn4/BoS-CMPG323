import axios from "axios";

const API_URL = "https://bos-cmpg323-assignmentdeploy.onrender.com/api/assignments"; 

// Fetch assignments function
export const fetchAssignments = async () => {
  try {
    const response = await axios.get(`${API_URL}/assignments`); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching assignments:", error.response?.data?.error || error.message);
    throw new Error("Failed to fetch assignments"); // Throw a more general error
  }
};

// Add assignment function
export const addAssignment = async (newAssignment) => {
  try {
    const response = await axios.post(API_URL, newAssignment, { 
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error("Error adding assignment:", error.response?.data?.error || error.message);
    throw new Error("Failed to add assignment"); // Throw a more general error
  }
};
