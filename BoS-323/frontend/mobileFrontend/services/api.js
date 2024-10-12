import axios from "axios";

const API_URL = "https://bos-cmpg323-usersdeploy.onrender.com/api/users";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data.user;
  } catch (error) {
    console.error("Login failed:", error.response.data.error);
    throw new Error(error.response.data.error || "Login failed");
  }
};
