import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import SlothBanner from "../assets/SlothBanner.svg";
import DeleteIcon from "../assets/DeleteNotification.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing local storage, etc.)
    // For example:
    // localStorage.removeItem('token');

    // Navigate to the login page
    navigate("/login");
  };

  const handleAssignmentClick = () => {
    navigate("/assignments");
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
        <div className="assignment-card" onClick={handleAssignmentClick}>
          Assignment 1
        </div>
        <div className="assignment-card" onClick={handleAssignmentClick}>
          Assignment 2
        </div>
        <div className="assignment-card" onClick={handleAssignmentClick}>
          Assignment 3
        </div>
        <div className="add-assignment-button">
          <span className="plus-icon">+</span>
          <span className="button-text">Add Assignment</span>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="notifications-section">
        <h2 className="notifications-title">Notifications</h2>
        <div className="notifications-container">
          <div className="notification-card">
            <p className="notification-text">Notification1</p>
            <button className="delete-notification">
              <img src={DeleteIcon} alt="Delete" className="delete-icon" />
            </button>
          </div>
          <div className="notification-card">
            <p className="notification-text">Notification2</p>
            <button className="delete-notification">
              <img src={DeleteIcon} alt="Delete" className="delete-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="sloth-banner">
          <img src={SlothBanner} alt="Sloth" />
        </div>
        <div className="info">Information</div>
        <div className="logged-in-name">John</div>
        <div className="logged-in-surname">Doe</div>
        <div className="logged-in-email">johndoe@example.com</div>
      </div>
    </div>
  );
};

export default Dashboard;
