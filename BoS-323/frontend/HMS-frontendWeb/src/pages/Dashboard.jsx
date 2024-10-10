// Dashboard.js

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
import { fetchNotifications, addNotification, deleteNotification as deleteNotificationService } from "../Services/apiNotifications"; // Import API services
import { fetchUserInfo } from "../Services/apiUsers";
const MAX_DESCRIPTION_LENGTH = 100; // Set a limit for description length

const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const assignmentsData = await fetchAssignments();
        setAssignments(assignmentsData);

        const notificationsData = await fetchNotifications();
        setNotifications(notificationsData);

        const userData = await fetchUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: { message: "Logout successful!" } });
  };

  const handleAddAssignment = async (newAssignment) => {
    try {
      const addedAssignment = await addAssignment(newAssignment);
      setAssignments((prevAssignments) => {
        const updatedAssignments = [...prevAssignments, addedAssignment];
        return updatedAssignments.slice(-3); // Keep only the last three assignments
      });

      const currentTime = new Date();
      const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

      const newNotification = {
        id: Date.now(), // Use timestamp or another method to generate unique ID
        text: `New Assignment: ${newAssignment.title} - (Added on: ${formattedTime})`,
      };

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);

      await addNotification(newNotification); // Send the new notification to the backend
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
      await deleteNotificationService(notificationId); // Send to backend to delete notification
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
        <h1 className="intro-title">
          Hi, {user.role === "lecturer" ? "Lecturer" : "Admin"}!
        </h1>
        <p className="intro-subtitle">Manage Assignments and Grades</p>
      </div>

      {/* Assignment Section */}
      <div className="assignment-section">
        {assignments.length > 0 ? (
          assignments.slice(0, 3).map((assignment) => (
            <div className="assignment-card" key={assignment.id}>
              <h3 className="assignment-title">{assignment.title}</h3>
              <p className="assignment-description">
                {truncateText(assignment.description, MAX_DESCRIPTION_LENGTH)}
              </p>
              <p className="assignment-due-date">
                Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No assignments available.</p>
        )}

        <div
          className="add-assignment-button"
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          <span className="plus-icon">+</span>
          <span className="button-text">Add Assignment</span>
        </div>
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
              <div className="notification-card" key={notification.id}>
                <p className="notification-text">{notification.text}</p>
                <button
                  className="delete-notification"
                  onClick={() => handleDeleteNotification(notification.id)} // Delete notification handler
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
        <div className="info">Information</div>
        <div className="logged-in-name">{user.firstName}</div>
        <div className="logged-in-surname">{user.lastName}</div>
        <div className="logged-in-email">{user.email}</div>
      </div>
    </div>
  );
};

export default Dashboard;
