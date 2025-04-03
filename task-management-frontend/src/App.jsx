import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admindashboard";
import AdminLogin from "./pages/Adminlogin";
import AdminSignup from "./pages/Adminsignup";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected User Dashboard */}
        <Route path="/dashboard" element={user?.role === "user" ? <Dashboard /> : <Navigate to="/login" />} />

        {/* ✅ Protected Admin Dashboard */}
        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
