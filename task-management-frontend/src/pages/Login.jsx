import React, { useState, useContext } from "react"; // ✅ Import React
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { loginUser } from "../api/auth"; 

const Login = () => {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting Login:", { email, password });

      const data = await loginUser(email, password);
      console.log("Login Successful. Token Received:", data.token);

      login(data); // ✅ Save user state in AuthContext

      // ✅ Redirect based on role
      if (data.role === "user") {
        navigate("/dashboard");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
        <input className="border p-2 rounded w-full mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 rounded w-full mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">Login</button>
      </form>
    </div>
  );
  
};

export default Login;
