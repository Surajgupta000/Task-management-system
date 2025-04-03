import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Register User
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/users/register`, { 
    name, 
    email, 
    password 
  });
  return response.data;
};

// Register Admin
export const registerAdmin = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/admin/register`, { 
    name, 
    email, 
    password 
  });
  return response.data;
};

// Login User
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { 
    email, 
    password 
  });

  // ✅ Store in localStorage
  localStorage.setItem("userToken", response.data.token);
  localStorage.setItem("userRole", "user");

  return response.data;
};

// Login Admin
export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${API_URL}/admin/login`, { 
    email, 
    password 
  });

  // ✅ Store in localStorage
  localStorage.setItem("adminToken", response.data.token);
  localStorage.setItem("userRole", "admin");

  return response.data;
};

// Logout User
export const logout = (navigate = () => {}, setUser) => { // ✅ Add default navigate
  console.log("Logging out...");

  localStorage.removeItem("userToken");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("userRole");

  if (setUser) setUser(null);
  navigate("/login");
};
