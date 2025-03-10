import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Fetch all tasks
export const fetchTasks = async (authtoken) => {
   token = authtoken || localStorage.getItem('token');  // Get token from localStorage
  console.log("Token being sent in request:", token); //debugging
  try {
    const response = await axios.get('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch tasks';
  }
};

// Create a new task
export const createTask = async (task, token) => {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create task';
  }
};

// Update a task
export const updateTask = async (taskId, task, token) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update task';
  }
};

// Delete a task
export const deleteTask = async (taskId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete task';
  }
};
