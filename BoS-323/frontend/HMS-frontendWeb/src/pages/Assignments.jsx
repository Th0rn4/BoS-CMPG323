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
    { id: 1, name: "Student1 Name Lastname" },
    { id: 2, name: "Student2 Name Lastname" },
    { id: 3, name: "Student3 Name Lastname" },
    { id: 4, name: "Student4 Name Lastname" },
  ];

  const handleStudentClick = (studentId) => {
    navigate(`/view-assignment/${studentId}`);
  };

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
            <div
              key={student.id}
              className={`student student${index + 1}`}
              onClick={() => handleStudentClick(student.id)}
            >
              <div className="student-name">{student.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
