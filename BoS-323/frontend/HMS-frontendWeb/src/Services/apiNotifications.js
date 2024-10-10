// services/apiNotifications.js

const API_BASE_URL = "https://bos-cmpg323-notificationsdeploy.onrender.com/api/notifications"; 

export const fetchNotifications = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error; // Rethrow to handle in component
  }
};

export const addNotification = async (newNotification) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotification),
    });
    if (!response.ok) {
      throw new Error("Failed to add notification");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error; // Rethrow to handle in component
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete notification");
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error; // Rethrow to handle in component
  }
};
