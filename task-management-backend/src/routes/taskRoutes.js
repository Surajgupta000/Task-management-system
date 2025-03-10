import express from 'express';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  getTasksByUserId 
} from '../controllers/taskController.js';

import { 
  getAllTasks, 
  deleteTaskByAdmin, 
  updateTaskByAdmin 
} from '../controllers/taskController.js';

import authMiddleware, { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Task Routes
router.get('/', authMiddleware, getTasks);
router.get('/user/:userId', authMiddleware, getTasksByUserId);
router.post('/', authMiddleware, createTask);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);

// Admin Task Management Routes
router.get('/admin', authMiddleware, adminMiddleware, getAllTasks);
router.put('/admin/:taskId', authMiddleware, adminMiddleware, updateTaskByAdmin);
router.delete('/admin/:taskId', authMiddleware, adminMiddleware, deleteTaskByAdmin);

export default router;
