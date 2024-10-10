// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import SlothBanner from "../assets/SlothBanner.svg";
import DeleteIcon from "../assets/DeleteNotification.svg";
import AddAssignmentModal from "./AddAssignmentModal"; // Import the modal

const MAX_DESCRIPTION_LENGTH = 100; // Set a limit for description length

const Dashboard = () => {
  const [assignments, setAssignments] = useState([]); // State to store assignments
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [user, setUser] = useState({}); // State to store user data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/assignments"); // Replace with your API endpoint
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications"); // Replace with your API endpoint
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user"); // Replace with your API endpoint for fetching the user
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchAssignments();
    fetchNotifications();
    fetchUser(); // Fetch user data on component mount
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleLogout = () => {
    // Perform any logout logic here
    navigate("/login");
  };

  const handleAddAssignment = (newAssignment) => {
    setAssignments((prevAssignments) => {
      const updatedAssignments = [...prevAssignments, newAssignment];
      return updatedAssignments.slice(-3); // Keep only the last three assignments
    });

    // Optionally send to backend
    fetch("/api/assignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAssignment),
    }).catch((error) => console.error("Error adding assignment:", error));

    // Create a new notification when the assignment is added
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

    // Optionally send the new notification to the backend
    fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotification),
    }).catch((error) => console.error("Error adding notification:", error));
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );

    // Optionally send to backend to delete notification
    fetch(`/api/notifications/${notificationId}`, {
      method: "DELETE",
    }).catch((error) => console.error("Error deleting notification:", error));
  };

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
        <h1 className="intro-title">Hi, Lecturer!</h1>
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
