import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewAssignment.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import { streamVideo, downloadVideo } from "../Services/apiSubmissions";

const ViewAssignment = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [comments, setComments] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState("66f1a83f3ef7cb7a887eb23a"); // Replace with actual video ID later

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = await streamVideo(videoId);
        setVideoUrl(url);
      } catch (error) {
        console.error("Failed to load video:", error);
        setError(error.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleDownload = async () => {
    try {
      await downloadVideo(videoId);
    } catch (error) {
      console.error("Failed to initiate download:", error);
      alert(`Failed to download the video: ${error.message}`);
    }
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
          {loading ? (
            <p>Loading video...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : videoUrl ? (
            <video controls className="va-video">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No video available</p>
          )}
        </div>
        <div className="va-controls">
          <div className="va-mark-panel">
            <input
              type="text"
              placeholder="Mark Out/X"
              className="va-mark-input"
            />
          </div>
          <button className="va-download-button" onClick={handleDownload}>
            Download
          </button>
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
