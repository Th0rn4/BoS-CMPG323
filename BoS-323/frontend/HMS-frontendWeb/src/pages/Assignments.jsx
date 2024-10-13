import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';
import HomeButton from '../assets/HomeButton.svg';
import LogoutIcon from '../assets/LogoutIcon.svg';

const Assignments = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Fetch all users
        const data = await response.json();

        // Filter users to get only those with role 'student'
        const studentUsers = data.users.filter(
          (user) => user.role === 'student'
        );
        setStudents(studentUsers); // Set the filtered students
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

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
          {students.length > 0 ? (
            students.map((student) => (
              <div
                key={student.id}
                className="student"
                onClick={() => handleStudentClick(student.id)}
              >
                <div className="student-name">{student.name}</div>
              </div>
            ))
          ) : (
            <p>No students found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
