import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import SlothBanner from "../assets/SlothBanner.svg";
import DeleteIcon from "../assets/DeleteNotification.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch user info from localStorage when component mounts
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo); // Set user state if user info is found
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

  // Handle logout, clear localStorage, and navigate to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: { message: "Logout successful!" } });
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
        <div
          className="assignment-card"
          onClick={() => navigate("/assignments")}
        >
          Assignment 1
        </div>
        <div
          className="assignment-card"
          onClick={() => navigate("/assignments")}
        >
          Assignment 2
        </div>
        <div
          className="assignment-card"
          onClick={() => navigate("/assignments")}
        >
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
            <p className="notification-text">Notification 1</p>
            <button className="delete-notification">
              <img src={DeleteIcon} alt="Delete" className="delete-icon" />
            </button>
          </div>
          <div className="notification-card">
            <p className="notification-text">Notification 2</p>
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
        <div className="info">
          <div className="logged-in-name">
            {user.name.firstName} {user.name.lastName}{" "}
            {/* Access firstName and lastName */}
          </div>
          <div className="logged-in-email">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
