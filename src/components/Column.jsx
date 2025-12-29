import React from "react";
import TaskCard from "./TaskCard";
import "./Column.css";
const Column=({column,tasks,onDeleteTask,onEditTask,onDropTask})=>{

    const handleDragOver = (e) => {
    e.preventDefault(); // important
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    onDropTask(taskId, column.id);
  };
    return (
         <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}>

            <h3>{column.title}</h3>

          {tasks.map((task)=>(
           <TaskCard key={task.id} 
           task={task}
           onDelete={onDeleteTask}
           onEdit={onEditTask}
           /> 
          ))}


        </div>
    )
}
export default Column;