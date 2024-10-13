// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import DeleteIcon from "../assets/DeleteNotification.svg";
import AddUserModal from "./AddUserModal";
import { fetchUsers, addUser, deleteUser as deleteUserService } from "../Services/apiUsers";

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
          setUsers(usersData.users);
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

  const handleAddUser = async (userData) => {
    try {
      const newUser = await addUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setError(null);
      return true;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
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
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <div className="admin-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="home-button" onClick={() => navigate('/dashboard')}>
          <img src={HomeButton} alt="Home" />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div>

      {/* Intro Section */}
      <div className="intro">
        <h1 className="intro-title">Admin Panel</h1>
        <p className="intro-subtitle">Manage Users</p>
      </div>

      {/* User Section */}
      <div className="user-section">
        {error ? (
          <p>{error}</p>
        ) : users.length > 0 ? (
          <div className="user-cards-container">
            {users.map(({ _id, name, email, role }) => (
              <div className="user-card" key={_id}>
                <h3 className="user-name">{name.firstName} {name.lastName}</h3>
                <p className="user-email">Email: {email}</p>
                <p className="user-role">Role: {role}</p>
                <button
                  className="delete-user"
                  onClick={() => handleDeleteUser(_id)}
                >
                  <img src={DeleteIcon} alt="Delete" className="delete-icon" />
                </button>
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
      <AddUserModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Admin;
