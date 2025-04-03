import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser, loginAdmin } from "../api/auth";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // New: Role selection
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Login:", { email, password, role });

      let data;
      if (role === "admin") {
        data = await loginAdmin(email, password);
      } else {
        data = await loginUser(email, password);
      }

      console.log("Login Successful. Token Received:", data.token);
      login(data); // Save user state in AuthContext

      navigate(role === "admin" ? "/admin" : "/dashboard"); // Redirect based on role
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
        <select className="border p-2 rounded w-full mb-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Login as User</option>
          <option value="admin">Login as Admin</option>
        </select>
        <input className="border p-2 rounded w-full mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 rounded w-full mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">Login</button>
        <div className="text-center mt-3">
          <p>Don't have an account? <Link to="/register" className="text-blue-500">Sign Up as User</Link></p>
          <p>Admin? <Link to="/admin-register" className="text-blue-500">Register as Admin</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
