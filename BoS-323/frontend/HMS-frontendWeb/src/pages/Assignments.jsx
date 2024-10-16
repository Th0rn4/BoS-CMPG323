import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubmissionsByAssignment } from '../Services/apiSubmissions';
import './Assignments.css';
import HomeButton from '../assets/HomeButton.svg';
import LogoutIcon from '../assets/LogoutIcon.svg';

const Assignment = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for assignment:', assignmentId);
        const data = await getSubmissionsByAssignment(assignmentId);
        console.log('Received merged data:', data);
        setStudentData(data); // Set the merged data from the API call
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, [assignmentId]);

  const groupByStatus = (data) => {
    console.log('Grouping data:', data);
    const statuses = ['In progress', 'Submitted', 'Graded'];
    const grouped = statuses.reduce((acc, status) => {
      acc[status] = data.filter((item) => item.status === status); // Group by status
      return acc;
    }, {});
    console.log('Grouped data:', grouped);
    return grouped;
  };

  const groupedData = groupByStatus(studentData); // Group data by status

  const handleLogout = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  const handleStudentClick = (studentId) => {
    navigate(`/view-assignment/${studentId}`); // Navigate to view student assignment
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log('Rendering with grouped data:', groupedData);

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
                  onClick={() => handleStudentClick(student.studentId)}
                >
                  <div className="student-name">
                    {student.studentName} -{' '}
                    <span className="submission-status">{student.status}</span>
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

export default Assignment;
