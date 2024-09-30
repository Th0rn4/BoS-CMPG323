import React from "react";
import "./Dashboard.css"; // Ensure the CSS file matches with the updated version

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="home-button">{/* Home Button content goes here */}</div>
        <div className="logout-button">
          {/* Logout button content or icon */}
        </div>
      </div>

      {/* Intro Section */}
      <div className="intro">
        <h1 className="intro-title">Hi, Lecturer!</h1>
        <p className="intro-subtitle">Manage Assignments and Grades</p>
      </div>

      {/* Assignment Section */}
      <div className="assignment-section">
        <div className="assignment-card">{/* Assignment 1 */}</div>
        <div className="assignment-card">{/* Assignment 2 */}</div>
        <div className="assignment-card">{/* Assignment 3 */}</div>
        <div className="add-assignment-button">
          <span className="plus-icon">+</span>
          <span className="button-text">Add Assignment</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="sloth-banner">{/* Sloth Banner Image */}</div>

        {/* User Info Section */}
        <div className="info">Info</div>
        <div className="logged-in-name">John</div>
        <div className="logged-in-surname">Doe</div>
        <div className="logged-in-email">johndoe@example.com</div>
      </div>
    </div>
  );
};

export default Dashboard;
