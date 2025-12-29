import React from "react";
import "./TaskCard.css";
const TaskCard=({task,onDelete,onEdit})=>{
    const handleDragStart=(e)=>{
        e.dataTransfer.setData("taskId",task.id);
    };

    return (
        <div className="task-card" draggable onDragStart={handleDragStart} onClick={()=>onEdit(task)}>
            <span>{task.title}</span>
            <button className="delete-btn" onClick={(e)=>{
                e.stopPropagation();
                onDelete(task.id)}}>X</button>
           

        </div>
    );
};
export default TaskCard;