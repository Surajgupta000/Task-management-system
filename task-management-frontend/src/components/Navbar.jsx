import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handleDashboardClick = () => {
    if (userToken) {
      navigate("/dashboard");
    } else if (adminToken) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-blue-500 text-white py-4 px-6 flex justify-between flex-wrap">
      <h1 className="text-xl font-bold">Task Flow</h1>
      <div>
        <NavLink to="/" className="px-4 hover:underline">Home</NavLink>
        <button onClick={handleDashboardClick} className="px-4 hover:underline">Dashboard</button>
        <NavLink to="/admin/login" className="px-4 hover:underline">Admin Login</NavLink>

        {userToken || adminToken ? (
          <button 
            onClick={handleLogout} 
            className="px-4 bg-red-500 hover:bg-red-600 text-white rounded-md ml-4"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="px-4 hover:underline">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
