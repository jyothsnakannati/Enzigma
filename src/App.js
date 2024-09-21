// App.js
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

  return (
    <div>
      <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} onCreate={openForm}  />
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
