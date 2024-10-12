import axios from "axios";

// Base API URL for notifications
const API_URL = "https://bos-cmpg323-notificationsdeploy.onrender.com/api/notifications";

// Fetch notifications function
export const fetchNotifications = async () => {
  try {
    const response = await axios.get(API_URL); // Fetch from the main notifications endpoint
    console.log("Fetched Notifications Data:", response.data); // Log the fetched data for debugging
    return response.data; // Return the entire response or structure it according to the API
  } catch (error) {
    console.error("Error fetching notifications:", error.response?.data?.error || error.message);
    throw new Error("Failed to fetch notifications");
  }
};

// Add notification function
// Add notification function
export const addNotification = async (newNotification) => {
  // Validate the newNotification object
  if (!newNotification.NotificationHeader || !newNotification.NotificationDescription) {
    throw new Error("NotificationHeader and NotificationDescription are required fields.");
  }

  try {
    // Post new notification to the API
    const response = await axios.post(`${API_URL}/create`, newNotification, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error("Error adding notification:", error.response?.data?.error || error.message);
    throw new Error("Failed to add notification");
  }
};


// Delete notification function
export const deleteNotification = async (notificationId) => {
  try {
    // Make sure to use the correct endpoint for deletion
    await axios.delete(`${API_URL}/delete/${notificationId}`);
  } catch (error) {
    console.error("Error deleting notification:", error.response?.data?.error || error.message);
    throw new Error("Failed to delete notification");
  }
};