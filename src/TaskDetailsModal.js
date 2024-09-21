import React from 'react';

const TaskDetailsModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="modal">
      <h2>Task Details</h2>
      <div>
        <p><strong>Assigned To:</strong> {task.assignedTo}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Comments:</strong> {task.comments}</p>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskDetailsModal;
