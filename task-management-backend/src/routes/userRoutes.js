import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ NEW: User Authentication Check API
router.get('/auth-check', authMiddleware, (req, res) => {
  res.status(200).json({ message: "User authenticated", user: req.user });
});

export default router;
