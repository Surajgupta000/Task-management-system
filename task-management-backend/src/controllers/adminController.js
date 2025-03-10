import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

// Register a new admin
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const adminExists = await Admin.findOne({ email });
    const userExists = await User.findOne({ email });

    if (adminExists || userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ name, email, password: hashedPassword, role: 'admin' });

    if (!admin) return res.status(400).json({ message: 'Invalid admin data' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ _id: admin._id, name: admin.name, email: admin.email, role: 'admin', token });

  } catch (error) {
    console.error('Admin Registration Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ _id: admin._id, name: admin.name, email: admin.email, role: 'admin', token });

  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all users (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);

  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
