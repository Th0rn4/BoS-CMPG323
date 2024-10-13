import axios from "axios";

const API_URL = "https://bos-cmpg323-usersdeploy.onrender.com/api/users";

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return the token and user info
  } catch (error) {
    console.error("Login failed:", error.response?.data?.error);
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// Fetch logged-in user's info using the token
export const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetching user info failed:", error.response?.data?.error);
    throw new Error("Failed to fetch user info");
  }
};

// Fetch all users
export const fetchUsers = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` }, // Include token in the request
    });
    console.log("Users fetched:", response.data); // Log the response
    return response.data; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: error.message };
  }
};


// Add a new user
export const addUser = async (userData) => {
  try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
  } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
      throw error; // Rethrow the error for handling in the modal
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  try {
    await axios.delete(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Include token in the request
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error for handling in the Admin component
  }
};
