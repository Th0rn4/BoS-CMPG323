import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Assignments.css';
import HomeButton from '../assets/HomeButton.svg';
import LogoutIcon from '../assets/LogoutIcon.svg';
import axios from 'axios';

const Assignments = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams(); // Fetch the assignment_id from the URL
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch submissions by assignment ID
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `/api/submissions/submissions/${assignmentId}`
        );
        console.log('API Response:', response.data); // Log the entire response
        setSubmissions(response.data.data || []); // Ensure it's an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching submissions:', error); // Log the error
        setError('Error fetching submissions');
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  // Function to group students by their submission status
  const groupByStatus = (submissions) => {
    if (!submissions || !Array.isArray(submissions)) return {};

    const statuses = ['Not Started', 'In Progress', 'Submitted', 'Graded'];

    const grouped = {};
    statuses.forEach((status) => {
      grouped[status] = submissions.filter(
        (submission) => submission.status === status
      );
    });
    return grouped;
  };

  const groupedSubmissions = groupByStatus(submissions);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  const handleStudentClick = (studentId) => {
    navigate(`/view-assignment/${studentId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        <h1 className="page-title">Assignment Submissions</h1>

        {/* Grouped Student Submissions */}
        {Object.keys(groupedSubmissions).map((status) => (
          <div key={status}>
            <h2 className="students-header">List of Students: {status}</h2>
            <div className="list-of-students">
              {groupedSubmissions[status].map((submission) => (
                <div
                  key={submission.user._id}
                  className="student"
                  onClick={() => handleStudentClick(submission.user._id)}
                >
                  <div className="student-name">
                    {submission.user.name} -{' '}
                    <span className="submission-status">
                      {submission.status}
                    </span>
                  </div>
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
