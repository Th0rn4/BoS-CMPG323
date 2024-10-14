import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://bos-cmpg323-usersdeploy.onrender.com/api"; // Define the base URL for the API
const SUBMISSION_URL =
  "https://bos-cmpg323-submissionsdeploy.onrender.com/api/submissions";

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

// Function to handle logout
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token"); // Clear the token from AsyncStorage
  } catch (error) {
    throw new Error("Failed to logout");
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

// Fetch submissions
export const fetchSubmissions = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${SUBMISSION_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch submissions");
    }

    const data = await response.json();
    return data.submissions;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new submission
export const createSubmission = async (submissionData) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${SUBMISSION_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to create submission");
    }

    const responseData = await response.json();
    return responseData.submission;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a submission
export const updateSubmission = async (submissionId, updateData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${SUBMISSION_URL}/${submissionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update submission");
    }

    const data = await response.json();
    return data.submission;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Upload a video for a submission
export const uploadSubmissionVideo = async (submissionId, videoFile) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const formData = new FormData();
    formData.append("video", videoFile);

    const response = await fetch(`${SUBMISSION_URL}/${submissionId}/upload`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to upload video");
    }

    const data = await response.json();
    return data.updatedSubmission;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a single submission
export const getSubmission = async (submissionId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${SUBMISSION_URL}/${submissionId}/single`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch submission");
    }

    const data = await response.json();
    return data.submission;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get assignment feedback
export const getAssignmentFeedback = async (assignmentId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${SUBMISSION_URL}/${assignmentId}/feedback`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "Failed to fetch assignment feedback"
      );
    }

    const data = await response.json();
    return data.feedbackList;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get video stream URL
export const getVideoStreamUrl = (submissionId) => {
  return `${SUBMISSION_URL}/stream/${submissionId}`;
};

// Get video download URL
export const getVideoDownloadUrl = (submissionId) => {
  return `${SUBMISSION_URL}/${submissionId}/download`;
};
