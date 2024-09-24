import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import DeleteConfirmation from './DeleteConfirmation';
import './App.css';

function App() {
  const initialTasks = [
    {
      assignedTo: 'user1',
      status: 'Not Started',
      dueDate: '12/10/2024',
      priority: 'Low',
      comments: 'This task is good',
    },
    {
      assignedTo: 'User2',
      status: 'In Progress',
      dueDate: '1/09/2024',
      priority: 'High',
      comments: 'This task is good',
    },
    {
      assignedTo: 'User3',
      status: 'Not started',
      dueDate: '18/08/2024',
      priority: 'Low',
      comments: 'This task is good',
    },
    {
      assignedTo: 'User4',
      status: 'In Progress',
      dueDate: '12/06/2024',
      priority: 'Normal',
      comments: 'This task is good',
    },
  ];

  // Define the state for pagination
  const [tasksPerPage, setTasksPerPage] = useState(10); // Default 10 tasks per page
  const [currentPage, setCurrentPage] = useState(1); // Default to page 1

  const [tasks, setTasks] = useState(initialTasks); // Set initial tasks
  const [editingTask, setEditingTask] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setFormVisible(false);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task, index) =>
      index === editingTask.index ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setFormVisible(false);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter((_, i) => i !== taskToDelete));
    setTaskToDelete(null);
  };

  const deleteTask = (index) => {
    setTaskToDelete(index);
  };

  const editTask = (index) => {
    setEditingTask({ task: tasks[index], index });
    setFormVisible(true);
  };

  const openForm = () => {
    setEditingTask(null);
    setFormVisible(true);
  };

  // Function to reset the pagination and set the tasks per page
  const handleSetTasksPerPage = (num) => {
    setTasksPerPage(num);
    setCurrentPage(1); 
  };

  return (
    <div>
      <TaskList
        tasks={tasks}
        tasksPerPage={tasksPerPage}
        currentPage={currentPage} // Pass currentPage
        setCurrentPage={setCurrentPage} // Pass setCurrentPage function
        onSetTasksPerPage={handleSetTasksPerPage} // Pass the function to set tasks per page
        onEdit={editTask}
        onDelete={deleteTask}
        onCreate={openForm}
      />
      {isFormVisible && (
        <TaskForm
          currentTask={editingTask ? editingTask.task : null}
          onSave={editingTask ? updateTask : addTask}
          onCancel={() => setFormVisible(false)}
        />
      )}
      {taskToDelete !== null && (
        <DeleteConfirmation
          onConfirm={confirmDeleteTask}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}

export default App;
