import React, { useEffect, useState } from "react";
import "./TaskModal.css";

const TaskModal=({onClose,onSave,editingTask})=>{
    const [title,setTitle]=useState("");
    const [status,setStatus]=useState("todo");

    useEffect(()=>{
      if(editingTask)
      {
        setTitle(editingTask.title);
        setStatus(editingTask.status);
      }
    },[editingTask])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!title){
            return;
        }
        onSave({
           id: editingTask ? editingTask.id : Date.now(),
            title,
            status
        });

        onClose();
    };
      return (
    <div className="modal-overlay">
      <div className="modal">
         <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TaskModal;