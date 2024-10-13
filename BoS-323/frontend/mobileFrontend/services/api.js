import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://bos-cmpg323-usersdeploy.onrender.com/api"; // Define the base URL for the API

// Function to handle login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Login failed");
    }

    const user = await response.json();
    await AsyncStorage.setItem("token", user.token); // Store the token in AsyncStorage
    return user; // Return the user object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch the logged-in user details
export const getUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch user details");
    }

    const userDetails = await response.json();
    return userDetails; // Return the user details
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch assignments from backend
export const fetchAssignments = async () => {
  try {
    const response = await fetch(
      "https://bos-cmpg323-assignmentdeploy.onrender.com/api/assignments/"
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch assignments");
    }

    const data = await response.json();
    return data.assignments; // Return the assignments array
  } catch (error) {
    throw new Error(error.message);
  }
};
