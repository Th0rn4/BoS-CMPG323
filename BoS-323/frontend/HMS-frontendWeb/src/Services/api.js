import axios from "axios";

export const loginWithGoogle = () => {
  window.open("http://localhost:3001/api/users/google", "_self");
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3001/api/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
