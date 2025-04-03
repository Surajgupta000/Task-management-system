import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedUser: "" });
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000/api";

  // ✅ Retrieve token from localStorage
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(`${API_BASE_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const tasksRes = await axios.get(`${API_BASE_URL}/admin/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsers(usersRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [token]);

  // ✅ Store token when admin logs in
  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
      localStorage.setItem("adminToken", res.data.token);
      alert("Login successful");
      window.location.reload(); // Reload page to fetch data
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid credentials");
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    alert("Logged out");
    window.location.reload();
  };

  // ✅ Create Task
  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.assignedUser) {
      alert("Title, description, and assigned user are required.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "", assignedUser: "" });
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Logout Button */}
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">Logout</button>

      {/* Users List with Assign Button */}
      <h3 className="text-xl font-semibold mt-4">Users List (Assign Task)</h3>
      <ul className="list-disc list-inside">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="flex items-center justify-between p-2 border">
              <span>{user.name}</span>
              <button 
                onClick={() => setNewTask({ ...newTask, assignedUser: user._id })}
                className="bg-green-500 text-white px-2 py-1"
              >
                Assign Task
              </button>
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>

      {/* Add New Task */}
      <h3 className="text-xl font-semibold mt-4">Task Management</h3>
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
    </div>
  );
};

export default AdminDashboard;
