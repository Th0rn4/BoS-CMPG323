import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewAssignment.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const ViewAssignment = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const assignmentDetails = {
    totalPoints: 100,
  };

  const getStudentName = (id) => {
    const students = {
      1: "Student1 Name Lastname",
      2: "Student2 Name Lastname",
      3: "Student3 Name Lastname",
      4: "Student4 Name Lastname",
    };
    return students[id] || "Unknown Student";
  };

  const studentName = getStudentName(studentId);

  return (
    <div className="va-container">
      <div className="left-panel">
        <div className="home-button" onClick={handleHomeClick}>
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>

      <div className="va-main-content">
        <h1 className="va-page-title">{studentName}'s Assignment</h1>
        <div className="va-video-container">
          <p>Video Player Placeholder</p>
        </div>

        <div className="va-assignment-details">
          <p>Total Points: {assignmentDetails.totalPoints}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="va-comments-block">
        {/* Comments section for lecturer */}
      </div>

      <div className="va-mark-panel">
        <div className="va-mark-rectangle"></div>
        <div className="va-mark-text">Mark / 100</div>
      </div>

      <div className="va-publish-mark">
        <div className="va-publish-rectangle"></div>
        <div className="va-publish-text">Publish Mark</div>
      </div>

      <div className="va-download-video">
        <div className="va-download-rectangle"></div>
        <div className="va-download-text">Download</div>
      </div>
    </div>
  );
};

export default ViewAssignment;
