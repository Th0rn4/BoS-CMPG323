import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getSubmissionsByAssignment,
  downloadFeedback,
} from "../Services/apiSubmissions";
import "./Assignments.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const Assignments = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const { state } = useLocation();
  const assignmentTitle = state?.title || "Assignment Submissions";
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasGradedSubmissions, setHasGradedSubmissions] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubmissionsByAssignment(assignmentId);
        setStudentData(data);
        setHasGradedSubmissions(
          data.some((submission) => submission.status === "Graded")
        );
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, [assignmentId]);

  const groupByStatus = (data) => {
    const statuses = ["In progress", "Submitted", "Graded"];
    return statuses.reduce((acc, status) => {
      acc[status] = data.filter((item) => item.status === status);
      return acc;
    }, {});
  };

  const handleDownloadFeedback = async () => {
    if (!hasGradedSubmissions) {
      setDownloadMessage("No submissions have been graded yet.");
      return;
    }

    setDownloadMessage(""); // Clear any previous message
    try {
      await downloadFeedback(assignmentId);
    } catch (error) {
      console.error("Error downloading feedback:", error);
      setDownloadMessage("Error downloading feedback. Please try again.");
    }
  };

  const groupedData = groupByStatus(studentData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="assignments-container">
      <div className="left-panel">
        <div className="home-button" onClick={() => navigate("/dashboard")}>
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={() => navigate("/login")}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>
      <div className="main-content">
        <h1 className="page-title">Submissions for: {assignmentTitle}</h1>
        <button
          className={`download-feedback-button ${
            !hasGradedSubmissions ? "disabled" : ""
          }`}
          onClick={handleDownloadFeedback}
          disabled={!hasGradedSubmissions}
        >
          Download Feedback
        </button>
        {downloadMessage && (
          <p className="download-message">{downloadMessage}</p>
        )}
        {Object.entries(groupedData).map(([status, students]) => (
          <div key={status}>
            <h2 className="students-header">
              List of Students: {status} ({students.length})
            </h2>
            <div className="list-of-students">
              {students.map((student) => (
                <div
                  key={student.studentId}
                  className="student"
                  onClick={() =>
                    navigate(`/view-assignment/${student.studentId}`, {
                      state: {
                        studentName: student.studentName,
                        submissionId: student.submissionId, // Pass the submissionId
                      },
                    })
                  }
                >
                  <div className="student-name">{student.studentName}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
