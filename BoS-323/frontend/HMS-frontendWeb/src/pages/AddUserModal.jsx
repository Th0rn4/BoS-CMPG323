// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
    fetchUsers,
    addUser,
    deleteUser ,
  } from "../Services/apiUsers"; // Import API services
import './Admin.css'; // Make sure to import your CSS for styles
import HomeButton from "../assets/HomeButton.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'student' });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers();
                if (response.success) {
                    setUsers(response.data);
                } else {
                    console.error("Failed to fetch users.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        getUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await addUser(newUser);
            if (response.success) {
                setUsers([...users, response.data]); // Add the new user to the list
                setShowModal(false); // Close the modal
                setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'student' }); // Reset form
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="left-panel">
                {/* Your sidebar with buttons like Home and Logout */}
            </div>

            <div className="user-section">
                <h2>User Management</h2>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            <h3 className="user-name">{`${user.name.firstName} ${user.name.lastName}`}</h3>
                            <p className="user-email">{user.email}</p>
                            <p className="user-role">{user.role}</p>
                            <button className="delete-user" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
                <button className="add-user-button" onClick={() => setShowModal(true)}>Add User</button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New User</h3>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={newUser.firstName}
                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
                        />
                        <select 
                            value={newUser.role} 
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button onClick={handleAddUser}>Add User</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
