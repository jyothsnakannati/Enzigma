import React, { useState, useRef, useEffect } from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onCreate, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isTasksVisible, setTasksVisible] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const tasksPerPage = 10;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectTask = (index) => {
    const selectedTaskIndex = selectedTasks.indexOf(index);
    if (selectedTaskIndex >= 0) {
      setSelectedTasks(selectedTasks.filter((_, i) => i !== selectedTaskIndex));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  const toggleTaskVisibility = () => {
    setTasksVisible(!isTasksVisible);
  };

  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
        <div className="left-buttons">
          <div className="menu" ref={dropdownRef}>
            <button className="menu-button" onClick={handleDropdownToggle}>Menu</button>
            {isDropdownOpen && 
            (
              <div className="dropdown">
                <button onClick={toggleTaskVisibility}>{isTasksVisible ? 'Hide Tasks' : 'Show Tasks'}</button>
              </div>
            )
            }
            </div>
        <div className="toolbar1">
          <button onClick={onCreate}>New Task</button>
          </div>
          <div className="toolbar2">
          <button onClick={onRefresh}>Refresh</button>
        </div>
        </div>
        <div className="searchbar">
      <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {isTasksVisible && (
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(index)}
                  onChange={() => handleSelectTask(index)}
                />
              </td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <div className="menu">
                  <button>Actions</button>
                  <div className="dropdown">
                    <button onClick={() => onEdit(index)}>Edit</button>
                    <button onClick={() => onDelete(index)}>Delete</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>First</button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>Last</button>
      </div>
    </div>
  );
};

export default TaskList;
