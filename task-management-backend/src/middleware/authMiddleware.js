import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token || !req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server error: JWT secret is not set" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ message: "Unauthorized: Invalid token structure" });
    }

    // Identify if the token belongs to an Admin or User
    req.user = decoded.role === "admin"
      ? await Admin.findById(decoded.id).select("-password")
      : await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// Middleware to check if user is an admin
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

export default authMiddleware;
