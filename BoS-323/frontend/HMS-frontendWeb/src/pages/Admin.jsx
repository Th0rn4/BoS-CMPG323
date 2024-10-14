// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AddUserModal from "./AddUserModal";
import { fetchUsers, addUser, deleteUser as deleteUserService } from "../Services/apiUsers";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        if (usersData.success && usersData.users) {
          setUsers(usersData.users || []); // Safeguard to always set an array
        } else {
          setError(usersData.message || "No users available.");
        }
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };
    loadData();
  }, );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: { message: "Logout successful!" } });
  };

  const handleAddUser = async (userData) => {
    try {
      // Ensure userData includes name with firstName and lastName
      const newUser = await addUser({
        ...userData,
        name: { firstName: userData.firstName, lastName: userData.lastName }, // Ensure name structure
      });

      setUsers((prevUsers) => [...prevUsers, newUser]); // Update state with new user
      setError(null);
      setIsModalOpen(false); // Close the modal
      
      // Reload page after new user is added
      window.location.reload();
      return true;
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Failed to add user. Please try again.");
      return false;
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      if (!userId) {
        throw new Error("User ID is missing");
      }
      await deleteUserService(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <div className="admin-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="home-button" onClick={() => navigate('/dashboard')}>
          <img src = {HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>

    

      {/* User Section */}
      <div className="user-section">
        {error ? (
          <p>{error}</p>
        ) : users.length > 0 ? (
          <div className="user-cards-container">
            {users.map(({ _id, name, email, role }) => (
              <div className="user-" key={_id}>
                <h3 className="user-name">
                  {name?.firstName || "First Name Missing"} {name?.lastName || "Last Name Missing"}
                </h3>
                <p className="user-email">Email: {email || "Email Missing"}</p>
                <p className="user-role">Role: {role || "Role Missing"}</p>
                <button
                  className="delete-user"
                  onClick={() => handleDeleteUser(_id)}
                >
                  <img src="/assets/DeleteNotification.svg" alt="Delete" className="delete-icon" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading users...</p>
        )}
      </div>

      {/* Intro Card */}
      <div className="intro_card">
        <h1 className="intro-title">Admin Panel</h1>
        <p className="intro-subtitle">Manage Users</p>
      </div>

      {/* Add User Button */}
      <div className="add-user-button" onClick={() => setIsModalOpen(true)}>
        <span className="plus-icon">+</span>
        <span className="button-text">Add User</span>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Admin;
