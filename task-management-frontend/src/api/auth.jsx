import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Register User
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, { 
      name, 
      email, 
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// Register Admin
export const registerAdmin = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/admin/register`, { 
      name, 
      email, 
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    console.log("Login Request Data Before Sending:", email, password);

    const response = await axios.post(`${API_URL}/users/login`, { 
      email: String(email),  
      password: String(password),
      role: 'user' // Include role in the login request
    }, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Login Response:", response.data);

    // Store token in localStorage
    localStorage.setItem("userToken", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};

// Login Admin
export const loginAdmin = async (email, password) => {
  try {
    console.log("Admin Login Request Data:", email, password);

    const response = await axios.post(`${API_URL}/admin/login`, { 
      email: String(email),  
      password: String(password),
      role: 'admin' // Include role in the login request
    }, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Admin Login Response:", response.data);

    // Store token in localStorage
    localStorage.setItem("adminToken", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Admin Login Error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Admin login failed";
  }
};

// Logout User
export const logout = () => {
  localStorage.removeItem("authToken"); // Remove auth token
  localStorage.removeItem("userRole");  // If role-based access
  setUser(null);
  navigate("/login"); // Redirect to login
};

