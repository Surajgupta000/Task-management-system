import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    const adminExists = await Admin.findOne({ email });

    if (userExists || adminExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: 'user', token });

  } catch (error) {
    console.error('User Registration Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    console.log("User Login Request Body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("User Login Successful:", user.email);
    res.status(200).json({ _id: user._id, name: user.name, email: user.email, role: 'user', token });

  } catch (error) {
    console.error("User Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
