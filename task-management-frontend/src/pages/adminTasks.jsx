import axios from 'axios';

const API_URL = '/api/admin/tasks';

export const getAdminTasks = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin tasks:', error);
    throw error;
  }
};

export const createAdminTask = async (taskData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.post(API_URL, taskData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating admin task:', error);
    throw error;
  }
};

export const updateAdminTask = async (taskId, taskData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating admin task:', error);
    throw error;
  }
};

export const deleteAdminTask = async (taskId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting admin task:', error);
    throw error;
  }
};