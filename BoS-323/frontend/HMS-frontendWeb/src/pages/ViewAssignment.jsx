import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewAssignment.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const ViewAssignment = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [comments, setComments] = useState("");

  const handleLogout = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const getStudentName = (id) => {
    const students = {
      1: "StudentName StudentLastname",
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
        <h1 className="va-page-title">{studentName}</h1>
        <div className="va-video-container">
          <p>Video Player Placeholder</p>
        </div>

        <div className="va-controls">
          <div className="va-mark-panel">
            <input
              type="text"
              placeholder="Mark Out/X"
              className="va-mark-input"
            />
          </div>
          <button className="va-download-button">Download</button>
          <button className="va-publish-mark-button">Publish Mark</button>
        </div>

        <div className="va-comments-block">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comments here..."
            className="va-comments-textarea"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
