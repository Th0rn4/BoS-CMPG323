// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    } else {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        Welcome, {user.name.firstName} {user.name.lastName}!
      </p>
    </div>
  );
};

export default Dashboard;
