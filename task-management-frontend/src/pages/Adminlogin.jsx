import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Submitting Admin Login:", { email, password });

      const response = await loginAdmin(email, password);

      console.log("Admin Login Successful. Token Received:", response.token);

      localStorage.setItem("adminToken", response.token);

      console.log("Navigating to Admin Dashboard...");
      navigate("/admin");  // Redirect to admin dashboard after login
    } catch (err) {
      console.error("Admin Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Admin login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <a href="/admin/signup" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
