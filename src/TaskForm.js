
import React, { useState } from 'react';

const TaskForm = ({ currentTask, onSave, onCancel }) => {
  const [task, setTask] = useState(currentTask || {
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  return (
    <div className="modal">
      <h2>{currentTask ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Comments</label>
          <input
            type="text"
            name="comments"
            value={task.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskForm;
