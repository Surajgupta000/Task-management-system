import express from 'express';
import { 
  registerAdmin, 
  loginAdmin, 
  getAllUsers 
} from '../controllers/adminController.js';

import { 
  getAllTasks, 
  updateTaskByAdmin, 
  deleteTaskByAdmin 
} from '../controllers/taskController.js';

import authMiddleware, { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin Authentication
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// ✅ NEW: Admin Authentication Check API
router.get('/auth-check', authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Admin authenticated", admin: req.user });
});

// Admin User Management
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// Admin Task Management
router.get('/tasks', authMiddleware, adminMiddleware, getAllTasks);
router.put('/tasks/:taskId', authMiddleware, adminMiddleware, updateTaskByAdmin);
router.delete('/tasks/:taskId', authMiddleware, adminMiddleware, deleteTaskByAdmin);

export default router;
