// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Modal.css"; // Style for modal

// eslint-disable-next-line react/prop-types
const AddAssignmentModal = ({ show, onClose, onAddAssignment }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [markAllocation, setMarkAllocation] = useState(""); // State for mark allocation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new assignment object including mark allocation
    const newAssignment = {
      title,
      description,
      due_date: dueDate,
      mark_allocation: markAllocation, // Include mark allocation
    };

    // Call the function passed from the parent to add the new assignment
    onAddAssignment(newAssignment);
    resetFields();

    // Clear the form and close the modal
    setTitle("");
    setDescription("");
    setDueDate("");
    setMarkAllocation(""); // Clear mark allocation field
    onClose();
    
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setMarkAllocation("");
  };
  const handleClose = () => {
    resetFields(); // Clear the form fields
    onClose(); // Close the modal
  };

  if (!show) {
    return null; // Return null if modal is not supposed to be visible
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mark Allocation</label>
            <input
              type="number"
              value={markAllocation}
              onChange={(e) => setMarkAllocation(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button className="button" >Add Assignment</button>
            <button className="button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignmentModal;
