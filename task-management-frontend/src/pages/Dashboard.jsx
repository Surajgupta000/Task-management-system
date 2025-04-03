import React from "react";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { fetchTasks, deleteTask } from "../api/tasks.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks(token);
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    getTasks();
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Tasks</h1>
      <div className="mt-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onEdit={() => console.log("Edit task:", task)} // ✅ Add placeholder onEdit function
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
