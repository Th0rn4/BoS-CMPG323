// Admin.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal"; // Import the new modal
import { fetchUsers, deleteUser as deleteUserService, updateUser as updateUserService } from "../Services/apiUsers"; // Import the update service
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State for update modal
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        if (usersData.success && usersData.users) {
          setUsers(usersData.users || []);
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: { message: "Logout successful!" } });
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
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

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUserService(updatedUser._id, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    }
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

      {/* User Section */}
      <div className="user-section">
        {error ? (
          <p>{error}</p>
        ) : users.length > 0 ? (
          <div className="user-card">
            {users.map(({ _id, name, email, role }) => (
              <div className="user" key={_id}>
                <h3 className="user-name">
                  {name?.firstName || "First Name Missing"} {name?.lastName || "Last Name Missing"}
                </h3>
                <p className="user-email">Email: {email || "Email Missing"}</p>
                <p className="user-role">Role: {role || "Role Missing"}</p>
                <div className="user-actions">
                  <button
                    className="delete-user"
                    onClick={() => handleDeleteUser(_id)}
                  >
                    <img src="/assets/DeleteNotification.svg" alt="Delete" className="delete-icon" />
                  </button>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading users...</p>
        )}
      </div>

      {/* Add User Button */}
      <div className="add-user-button" onClick={() => setIsModalOpen(true)}>
        <span className="plus-icon">+</span>
        <span className="button-text">Add User</span>
      </div>

      {/* Add User Modal */}
      <AddUserModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Update User Modal */}
      <UpdateUserModal
        show={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default Admin;
