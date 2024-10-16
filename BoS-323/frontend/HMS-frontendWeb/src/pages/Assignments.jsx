import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Assignments.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import { getSubmissionsByAssignment } from "../Services/apiSubmissions";

const Assignments = () => {
  const navigate = useNavigate();
  const { _id: assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSubmissionsByAssignment(assignmentId);
        console.log("Fetched submissions data:", data); // Check what is returned
        setSubmissions(data.data.submissions); // Fix here to access nested data
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
        setError(error.message || "Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchSubmissions(); // Fetch submissions only if assignmentId is present
    } else {
      setError("No assignment ID found.");
    }
  }, [assignmentId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleStudentClick = (submissionId) => {
    navigate(`/view-assignment/${submissionId}`);
  };

  const groupByStatus = (submissions) => {
    if (!Array.isArray(submissions)) {
      return {}; // Return an empty object if submissions is not an array
    }

    const statuses = ["Not Started", "In Progress", "Submitted", "Graded"];
    const grouped = {};
    statuses.forEach((status) => {
      grouped[status] = submissions.filter(
        (submission) => submission.status === status
      );
    });
    return grouped;
  };

  const groupedSubmissions = groupByStatus(submissions);

  return (
    <div className="assignments-container">
      <div className="left-panel">
        <div className="home-button" onClick={handleHomeClick}>
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>
      <div className="main-content">
        <h1 className="page-title">Assignment Submissions</h1>

        {/* Show loading message */}
        {loading ? (
          <p>Loading submissions...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : submissions.length === 0 ? (
          <p>No submissions found for this assignment.</p>
        ) : (
          // Map over grouped submissions by status
          Object.entries(groupedSubmissions).map(
            ([status, statusSubmissions]) => (
              <div key={status} className="status-group">
                <h2 className="students-header">List of Students: {status}</h2>
                <div className="list-of-students">
                  {statusSubmissions.map((submission) => (
                    <div
                      key={submission._id}
                      className="student"
                      onClick={() => handleStudentClick(submission._id)}
                    >
                      <div className="student-name">
                        {submission.student.name} -{" "}
                        {/* Fix here to access student name */}
                        <span className="submission-status">
                          {submission.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Assignments;
