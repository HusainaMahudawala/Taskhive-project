import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import "./Board.css";

const defaultColumns = [
  { id: "todo", title: "To-Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" }
];

const Board = () => {
  const { user } = useContext(AuthContext);
  const [columns] = useState(defaultColumns);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDropTask = (taskId, newStatus) => {
  const id = Number(taskId);

  const taskToMove = tasks.find(task => task.id === id);
  if (!taskToMove) return;

  // If dropped in same column, do nothing
  if (taskToMove.status === newStatus) return;

  const confirmMove = window.confirm(
    `Are you sure you want to move "${taskToMove.title}" to ${newStatus.replace(/^\w/, c => c.toUpperCase())}?`
  );

  if (!confirmMove) return;

  const updatedTasks = tasks.map(task =>
    task.id === id
      ? { ...task, status: newStatus }
      : task
  );

  setTasks(updatedTasks);

  localStorage.setItem(
    `taskhive_tasks_${user.email}`,
    JSON.stringify(updatedTasks)
  );
};


  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);

    localStorage.setItem(
      `taskhive_tasks_${user.email}`,
      JSON.stringify(updatedTasks)
    );
  };

  const handleAddOrEditTask = (task) => {
    const updatedTasks = tasks.some(t => t.id === task.id)
      ? tasks.map(t => (t.id === task.id ? task : t))
      : [...tasks, task];

    setTasks(updatedTasks);

    localStorage.setItem(
      `taskhive_tasks_${user.email}`,
      JSON.stringify(updatedTasks)
    );
  };

  useEffect(() => {
    if (!user) return;

    const savedTasks = JSON.parse(
      localStorage.getItem(`taskhive_tasks_${user.email}`)
    );

    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, [user]);

  return (
    <div className="board">
      {/* HEADER */}
      <div className="board-header">
        <div className="header-text">
          <h1>
            Welcome, <span>{user?.username}</span> 👋
          </h1>
          <p>Manage your tasks efficiently with TaskHive</p>
        </div>

        <button
          className="add-task-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Task
        </button>
      </div>

      {/* COLUMNS */}
      <div className="columns">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={tasks.filter(task => task.status === col.id)}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onDropTask={handleDropTask}
          />
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={handleAddOrEditTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default Board;
