import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.reload(); // ✅ Forces full refresh to reset styles
  };

  return (
    <nav className="bg-blue-500 text-white py-4 px-6 flex justify-between flex-wrap">
      <h1 className="text-xl font-bold">Task Flow</h1>
      <div>
        <NavLink to="/" className="px-4 hover:underline">Home</NavLink>
        {user ? (
          <>
            <button onClick={() => navigate(user.role === "admin" ? "/admin" : "/dashboard")}
              className="px-4 hover:underline">
              Dashboard
            </button>
            <button 
              onClick={handleLogout} 
              className="px-4 bg-red-500 hover:bg-red-600 text-white rounded-md ml-4">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/admin/login" className="px-4 hover:underline">Admin Login</NavLink>
            <NavLink to="/login" className="px-4 hover:underline">Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
