import React from "react";

const TaskOperations = ({ tasks, handleUpdate, handleDelete }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Manage Tasks</h3>
      {tasks.length > 0 ? (
        <ul className="list-disc list-inside">
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center border p-2 rounded">
              <span>{task.title} - {task.status}</span>
              <div>
                <button 
                  onClick={() => handleUpdate(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default TaskOperations;