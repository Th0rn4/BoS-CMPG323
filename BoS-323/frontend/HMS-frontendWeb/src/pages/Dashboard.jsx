// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import SlothBanner from "../assets/SlothBanner.svg";
import DeleteIcon from "../assets/DeleteNotification.svg";
import AddAssignmentModal from "./AddAssignmentModal"; // Import the modal
import {
  fetchAssignments,
  addAssignment,
  deleteAssignment as DeleteAssignmentService,
} from "../Services/apiAssignments"; // Import API services
import {
  fetchNotifications,
  deleteNotification as deleteNotificationService,
  addNotification,
} from "../Services/apiNotifications"; // Import API services

const MAX_DESCRIPTION_LENGTH = 100; // Set a limit for description length

const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // Fetch user data from localStorage

  useEffect(() => {
    const loadData = async () => {
      try {
        const assignmentsData = await fetchAssignments(); // Fetch assignments
        const notificationsData = await fetchNotifications(); // Fetch notifications

        if (notificationsData.success && notificationsData.notifications) {
          setNotifications(notificationsData.notifications);
        }

        if (assignmentsData.success && assignmentsData.assignments) {
          setAssignments(assignmentsData.assignments);
          const now = Date.now();
          localStorage.setItem("lastPageLoadTime", now); // Store current page load time
        } else {
          setError(assignmentsData.message || "No assignments available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    loadData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text || typeof text !== "string") return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: { message: "Logout successful!" } });
  };

  const handleAddAssignment = async (assignmentData) => {
    try {
      const newAssignment = await addAssignment(assignmentData); // Add assignment
      setAssignments((prevAssignments) => [...prevAssignments, newAssignment]); // Update assignments
      setError(null);

      window.location.reload(); // Reload page

      await addNotification({
        NotificationHeader: "New Assignment Created",
        NotificationDescription: "You have a new assignment.", // Add notification
      });

      return true;
    } catch (error) {
      console.error("Error adding assignment:", error);
      setError("Failed to add assignment. Please try again.");
      return false;
    }
  };

  const handleDeleteAssignment = async (_id, e) => {
    e.stopPropagation(); // Prevent bubbling
    console.log("Deleting Assignment ID:", _id);
    try {
      await DeleteAssignmentService(_id); // Delete assignment
      setAssignments((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment._id !== _id)
      ); // Update state
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleAssignmentClick = () => {
    navigate("/assignments");
  };

  const handleDeleteNotification = async (notificationId) => {
    console.log("Deleting Notification ID:", notificationId);
    try {
      await deleteNotificationService(notificationId); // Delete notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId
        )
      ); // Update state
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
        {user.role === "admin" && (
          <div className="admin-button" onClick={() => navigate("/Admin")}>
            <span>Manage Users</span>
          </div>
        )}
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>

      {/* Intro Section */}
      <div className="intro">
        <h1 className="intro-title">Hi, {user.role || "User"}!</h1>
        <p className="intro-subtitle">Manage your Assignments</p>
      </div>

      {/* Assignment Section */}
      <div className="assignment-section">
        {error ? (
          <p>{error}</p>
        ) : assignments.length > 0 ? (
          <div
            className="assignment-cards-container"
            style={{ display: "flex", gap: "2vw" }}
          >
            {assignments.map(
              ({ _id, title, description, due_date, mark_allocation }) => (
                <div
                  className="assignment-card"
                  key={_id}
                  onClick={handleAssignmentClick}
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
                  <button
                    className="delete-assignment"
                    onClick={(e) => handleDeleteAssignment(_id, e)} // Pass the event to the handler
                  >
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="delete-icon"
                    />
                  </button>
                </div>
              )
            )}
          </div>
        ) : (
          <p>Loading assignments...</p>
        )}
      </div>

      {/* Add Assignment Button */}
      <div
        className="add-assignment-button"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="plus-icon">+</span>
        <span className="button-text">Add Assignment</span>
      </div>

      {/* Add Assignment Modal */}
      <AddAssignmentModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAssignment={handleAddAssignment}
      />

      {/* Notifications Section */}
      <div className="notifications-section">
        <h2 className="notifications-title">Notifications</h2>
        <div className="notifications-container">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div className="notification-card" key={notification._id}>
                <p className="notification-text">
                  {notification.NotificationHeader}
                </p>
                <p className="notification-description">
                  {notification.NotificationDescription}
                </p>
                <button
                  className="delete-notification"
                  onClick={() => handleDeleteNotification(notification._id)}
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
        <div className="user-info">
          <p>Logged in as:</p>
          <p className="user-name">
            {user.name?.firstName || "Unknown User"} {user.name?.lastName || ""}
          </p>
          <p className="user-email">{user.email || "No Email Provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
