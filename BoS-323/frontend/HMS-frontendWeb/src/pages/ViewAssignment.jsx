import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ViewAssignment.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import {
  streamVideo,
  downloadVideo,
  updateFeedback,
} from "../Services/apiSubmissions";

const ViewAssignment = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const location = useLocation();
  const studentName = location.state?.studentName || "Unknown Student";
  const submissionId = location.state?.submissionId;
  const assignmentId = location.state?.assignmentId;
  const [grade, setGrade] = useState("");
  const [comments, setComments] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markAllocation, setMarkAllocation] = useState("");

  useEffect(() => {
    if (!submissionId) {
      setError("No submission ID provided.");
      setLoading(false);
      return;
    }

    const loadVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = await streamVideo(submissionId);
        setVideoUrl(url);
      } catch (error) {
        console.error("Failed to load video:", error);
        setError(error.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    const fetchMarkAllocation = async () => {
      if (assignmentId) {
        try {
          const response = await fetch(
            "https://bos-cmpg323-assignmentdeploy.onrender.com/api/assignments/"
          );
          const data = await response.json();
          const assignment = data.assignments.find(
            (a) => a._id === assignmentId
          );
          if (assignment) {
            setMarkAllocation(assignment.mark_allocation);
          } else {
            console.error("Assignment not found");
          }
        } catch (error) {
          console.error("Failed to fetch mark allocation:", error);
        }
      }
    };

    loadVideo();
    fetchMarkAllocation();
  }, [submissionId, assignmentId]);

  const handleDownload = async () => {
    try {
      await downloadVideo(submissionId);
    } catch (error) {
      console.error("Failed to initiate download:", error);
      alert(`Failed to download the video: ${error.message}`);
    }
  };

  const handlePublishMark = async () => {
    const feedbackData = {
      status: "Graded",
      feedback: {
        grade: grade,
        comment: comments,
      },
    };

    try {
      await updateFeedback(submissionId, feedbackData);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Failed to update submission:", error);
      alert(`Failed to submit feedback: ${error.message}`);
    }
  };

  return (
    <div className="va-container">
      <div className="left-panel">
        <div className="home-button" onClick={() => navigate("/dashboard")}>
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={() => navigate("/login")}>
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
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder={markAllocation ? `${markAllocation}` : "Mark Out"}
              className="va-mark-input"
            />
          </div>
          <button className="va-download-button" onClick={handleDownload}>
            Download
          </button>
          <button
            className="va-publish-mark-button"
            onClick={handlePublishMark}
          >
            Publish Mark
          </button>
        </div>
        <div className="va-comments-block">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comments here..."
            className="va-comments-input"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
