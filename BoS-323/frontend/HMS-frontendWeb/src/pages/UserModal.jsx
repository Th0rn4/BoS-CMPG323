// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
    fetchUsers,
    addUser,
    deleteUser,
    updateUser, 
} from "../Services/apiUsers"; 
import './Admin.css'; 

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'student' });
    const [selectedUser, setSelectedUser] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false); 

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
                setUsers([...users, response.data]); 
                setShowModal(false); 
                setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'student' }); 
            }
            window.location.reload(); 

        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await updateUser(selectedUser._id, selectedUser);
            if (response.success) {
                setUsers(users.map(user => user._id === selectedUser._id ? response.data : user));
                setShowUpdateModal(false); 
                setSelectedUser(null); 
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
       // Reset newUser fields
       const resetNewUser = () => {
        setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'student' });
    };

    // Function to handle closing Add User modal
    const handleCloseAddUser = () => {
        resetNewUser(); // Clear fields when modal is closed
        setShowModal(false); 
    };

    return (
        <div className="admin-container">
            {/* Intro Section */}
      <div className="intro">
      
        <p className="intro-subtitle">Manage Users</p>
      </div>
            <div className="user-section">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            <h3 className="user-name">{`${user.name.firstName} ${user.name.lastName}`}</h3>
                            <p className="user-email">{user.email}</p>
                            <p className="user-role">{user.role}</p>
                            <button className="update-user" onClick={() => {
                                setSelectedUser(user); 
                                setShowUpdateModal(true); 
                            }}>Update</button>
                            <button className="delete-user" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
                <button className="add-user-button" onClick={() => setShowModal(true)}>Add User</button>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New User</h3>
                        <label>First Name</label>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={newUser.firstName}
                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} 
                        />
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} 
                        />
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                        />
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
                        />
                        <label>Role</label>
                        <select 
                            value={newUser.role} 
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className="modal-actions">
                        <button className="button" onClick={handleAddUser}>Add User</button>
                        <button className="button" onClick={handleCloseAddUser}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update User Modal */}
            {showUpdateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Update User</h3>
                        <label>First Name</label>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={selectedUser?.name.firstName || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: { ...selectedUser.name, firstName: e.target.value } })} 
                        />
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={selectedUser?.name.lastName || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: { ...selectedUser.name, lastName: e.target.value } })} 
                        />
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={selectedUser?.email || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} 
                        />
                        <label>Role</label>
                        <select 
                            value={selectedUser?.role} 
                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className="modal-actions">
                        <button className="button" onClick={handleUpdateUser}>Update User</button>
                        <button className="button" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
