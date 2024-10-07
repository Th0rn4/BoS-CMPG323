// apiUsers.js
import axios from "axios";

const API_URL = "https://bos-cmpg323-usersdeploy.onrender.com/api/users";

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return the token and user info
  } catch (error) {
    console.error("Login failed:", error.response.data.error);
    throw new Error(error.response.data.error || "Login failed");
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
    console.error("Fetching user info failed:", error.response.data.error);
    throw new Error("Failed to fetch user info");
  }
};
