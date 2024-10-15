// Admin.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AddUserModal from "./AddUserModal";


import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const Admin = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: { message: "Logout successful!" } });
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  

  if (!user) return null;

  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="home-button" onClick={handleHomeClick}>
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>

     

      {/* Add User Button */}
      <div className="add-user-button" onClick={() => setIsModalOpen(true)}>
        <span className="plus-icon">+</span>
        <span className="button-text">Add User</span>
      </div>

      {/* Add User Modal */}
      <AddUserModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Update User Modal */}
    
    </div>
  );
};

export default Admin;
