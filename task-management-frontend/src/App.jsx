import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Import Home component
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admindashboard"; // Import AdminDashboard component
import AdminLogin from "./pages/Adminlogin"; // Import AdminLogin component
import AdminSignup from "./pages/Adminsignup"; // Import AdminSignup component

function App() {
  return (
    <>
      <Navbar />  {/* ✅ Navbar is outside Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Dashboard is accessible at /dashboard */}
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard */}
        <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin Login */}
        <Route path="/admin/signup" element={<AdminSignup />} /> {/* Admin Signup */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
