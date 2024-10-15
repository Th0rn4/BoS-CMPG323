import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import ViewAssignment from './pages/ViewAssignment'; // Make sure to import ViewAssignment

function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assignments/:assignmentId" element={<Assignments />} />
          <Route
            path="/view-assignment/:studentId"
            element={<ViewAssignment />}
          />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
