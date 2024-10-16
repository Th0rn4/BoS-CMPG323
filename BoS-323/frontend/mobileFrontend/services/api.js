import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://bos-cmpg323-usersdeploy.onrender.com/api"; // Define the base URL for the API
const SUBMISSION_URL =
  "https://bos-cmpg323-submissionsdeploy.onrender.com/api/submissions";

const NOTIFICATION_URL =
  "https://bos-cmpg323-notificationsdeploy.onrender.com/api/notifications";

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

    const userData = await response.json(); // Assuming this returns both token and user details
    await AsyncStorage.setItem("token", userData.token); // Store the token in AsyncStorage
    return userData; // Return the full response with token and user details
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

// Function to create a new submission
export const createSubmission = async (submissionData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Sending submission data:", JSON.stringify(submissionData));

    // Check for missing fields
    const requiredFields = [
      "assignment_id",
      "student_id",
      "submit_date",
      "status",
    ];
    const missingFields = requiredFields.filter(
      (field) => !submissionData[field]
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required fields for submission: ${missingFields.join(", ")}`
      );
    }

    const response = await fetch(`${SUBMISSION_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    });

    console.log("Response status:", response.status);
    const responseData = await response.json();
    console.log("Response data:", responseData);

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to create submission");
    }

    return responseData.submission;
  } catch (error) {
    console.error("Error in createSubmission:", error);
    throw error;
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

export const fetchNotifications = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${NOTIFICATION_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch notifications");
    }

    const data = await response.json();
    return data.notifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// New function to fetch a single submission
const fetchWithRetry = async (url, options, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
};

// Use this in your fetchSingleSubmission function
export const fetchSingleSubmission = async (submissionId) => {
  console.log("Fetching submission with ID:", submissionId);
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token retrieved:", token ? "Token exists" : "No token");

    const data = await fetchWithRetry(
      `${SUBMISSION_URL}/${submissionId}/single`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API response data:", JSON.stringify(data, null, 2));

    if (!data.submission) {
      console.warn("No submission data in API response");
    } else if (
      !data.submission.feedback ||
      data.submission.feedback.length === 0
    ) {
      console.warn("No feedback in submission data");
    }

    return data;
  } catch (error) {
    console.error("Error in fetchSingleSubmission:", error);
    throw error;
  }
};
