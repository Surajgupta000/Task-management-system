import React from "react";
import Button from "./Button";

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="border p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="flex space-x-2">
        <Button text="Edit" onClick={() => onEdit(task)} className="bg-yellow-500 hover:bg-yellow-600" />
        <Button text="Delete" onClick={() => onDelete(task.id)} className="bg-red-500 hover:bg-red-600" />
      </div>
    </div>
  );
};

export default TaskCard;