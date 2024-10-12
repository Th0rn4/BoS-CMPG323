// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import SlothBanner from "../assets/SlothBanner.svg";
import DeleteIcon from "../assets/DeleteNotification.svg";
import AddAssignmentModal from "./AddAssignmentModal"; // Import the modal
import { fetchAssignments, addAssignment } from "../Services/apiAssignments"; // Import API services
import { fetchNotifications, deleteNotification as deleteNotificationService } from "../Services/apiNotifications"; // Import API services

const MAX_DESCRIPTION_LENGTH = 100; // Set a limit for description length

const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null); // Error state to track fetching issues
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from local storage

  useEffect(() => {
    const loadData = async () => {
      try {
        const assignmentsData = await fetchAssignments();
        const notificationsData = await fetchNotifications();

        if (notificationsData.success && notificationsData.notifications) {
          setNotifications(notificationsData.notifications); // Set fetched notifications
        }

        if (assignmentsData.success && assignmentsData.assignments) {
          setAssignments(assignmentsData.assignments); // Set fetched assignments if available
        } else {
          setError(assignmentsData.message || "No assignments available."); // Error message if no assignments fetched
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later."); // Error message for fetch failure
      }
    };

    loadData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text || typeof text !== "string") {
      return ""; // Handle undefined or non-string descriptions
    }
    
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: { message: "Logout successful!" } });
  };

  const handleAddAssignment = async (assignmentData) => {
    try {
      // Step 1: Add the assignment
      const newAssignment = await addAssignment(assignmentData);
      setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
      setError(null); // Reset any previous errors

      // Refresh the page to load new assignments
      window.location.reload();

      return true;
    } catch (error) {
      console.error("Error adding assignment:", error);
      setError("Failed to add assignment. Please try again.");
      return false; // Indicate failure
    }
  };

  const handleAssignmentClick = () => {
    navigate("/assignments"); // Navigate to the Assignments component
  };

  // Delete notification handler
  const handleDeleteNotification = async (notificationId) => {
    console.log("Deleting Notification ID:", notificationId); // Log the ID being deleted
    try {
      if (!notificationId) {
        throw new Error("Notification ID is missing"); // Check if the ID is present
      }

      await deleteNotificationService(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId) // Use _id here
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  if (!user) return null; // Prevent rendering if no user data is loaded

  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="home-button">
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>

      {/* Intro Section */}
      <div className="intro">
        <h1 className="intro-title">Hi!</h1>
        <p className="intro-subtitle">Manage Assignments</p>
      </div>

      {/* Assignment Section */}
      <div className="assignment-section">
        {error ? (
          <p>{error}</p>
        ) : assignments.length > 0 ? (
          <div className="assignment-cards-container" style={{ display: "flex", gap: "2vw" }}>
            {assignments.map(({ _id, title, description, due_date, mark_allocation }) => (
              <div 
                className="assignment-card" 
                key={_id} 
                onClick={handleAssignmentClick} // Navigate to Assignments
              >
                <h3 className="assignment-title">{title}</h3>
                <p className="assignment-description">
                  {truncateText(description, MAX_DESCRIPTION_LENGTH)}
                </p>
                <p className="assignment-due-date">
                  Due Date: {new Date(due_date).toLocaleDateString()}
                </p>
                <p className="assignment-mark-allocation">
                  Mark Allocation: {mark_allocation}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading assignments...</p> // Display a loading message while fetching
        )}
      </div>

      {/* Add Assignment Button placed outside of the assignment section */}
      <div
        className="add-assignment-button"
        onClick={() => setIsModalOpen(true)} // Open the modal
      >
        <span className="plus-icon">+</span>
        <span className="button-text">Add Assignment</span>
      </div>

      {/* Add Assignment Modal */}
      <AddAssignmentModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal handler
        onAddAssignment={handleAddAssignment}
      />

      {/* Notifications Section */}
      <div className="notifications-section">
        <h2 className="notifications-title">Notifications</h2>
        <div className="notifications-container">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div className="notification-card" key={notification._id}>
                <p className="notification-text">{notification.NotificationHeader}</p> 
                <p className="notification-description">{notification.NotificationDescription}</p>
                <button
                  className="delete-notification"
                  onClick={() => handleDeleteNotification(notification._id)} // Pass _id correctly
                >
                  <img src={DeleteIcon} alt="Delete" className="delete-icon" />
                </button>
              </div>
            ))
          ) : (
            <p>No notifications available.</p>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="sloth-banner">
          <img src={SlothBanner} alt="Sloth" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;