import React from "react";
import { useNavigate } from "react-router-dom";
import "./Assignments.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const Assignments = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing local storage, etc.)
    // For example:
    // localStorage.removeItem('token');
    // Navigate to the login page
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const students = [
    "Student1 Name Lastname",
    "Student2 Name Lastname",
    "Student3 Name Lastname",
    "Student4 Name Lastname",
  ];

  return (
    <div className="assignments-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="home-button" onClick={handleHomeClick}>
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">AssignmentName</h1>
        <div className="list-of-students">
          {students.map((student, index) => (
            <div key={index} className={`student student${index + 1}`}>
              <div className="student-name">{student}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
