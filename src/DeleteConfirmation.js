import React from 'react';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <h2>Are you sure you want to delete this task?</h2>
      <div>
        <button onClick={onConfirm}>Yes, Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
