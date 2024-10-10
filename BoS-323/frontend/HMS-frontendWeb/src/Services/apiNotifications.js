// services/apiNotifications.js

const API_BASE_URL = "https://bos-cmpg323-notificationsdeploy.onrender.com/api/notifications"; 

export const fetchNotifications = async () => {
  try {
    const response = await fetch(API_BASE_URL); // Use the base URL directly
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error response
      throw new Error(errorData.error || "Failed to fetch notifications");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error; // Rethrow to handle in component
  }
};

export const addNotification = async (newNotification) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotification),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error response
      throw new Error(errorData.error || "Failed to add notification");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error; // Rethrow to handle in component
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${notificationId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error response
      throw new Error(errorData.error || "Failed to delete notification");
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error; // Rethrow to handle in component
  }
};
