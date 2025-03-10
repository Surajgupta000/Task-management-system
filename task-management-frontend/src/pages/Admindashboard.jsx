import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("/api/admin/users");
        const tasksRes = await axios.get("/api/admin/tasks"); // Updated to fetch all tasks
        setUsers(usersRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Create a new task
  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await axios.post("/api/tasks", newTask);
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/admin/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  // Update a task
  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const res = await axios.put(`/api/admin/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage users and tasks.</p>
      {error && <p className="text-red-500">{error}</p>}

      {/* Users List */}
      <h3 className="text-xl font-semibold mt-4">Users List</h3>
      <ul className="list-disc list-inside">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => <li key={user._id}>{user.name}</li>)
        ) : (
          <p>No users found</p>
        )}
      </ul>

      {/* Task Management */}
      <h3 className="text-xl font-semibold mt-4">Task Management</h3>

      {/* Add New Task */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreateTask} className="bg-blue-500 text-white p-2">
          Add Task
        </button>
      </div>

      {/* Task List with Edit & Delete */}
      <ul className="list-disc list-inside">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="flex items-center justify-between p-2 border">
              <span>{task.title}</span>
              <div>
                <button
                  onClick={() =>
                    handleUpdateTask(task._id, { ...task, title: task.title + " (Updated)" })
                  }
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
