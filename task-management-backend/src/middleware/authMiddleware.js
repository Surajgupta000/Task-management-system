import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const authMiddleware = async (req, res, next) => {
  let token;
  console.log('Headers received:', req.headers); // Log headers

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Extracted Token:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);

      if (!decoded.id) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = await User.findById(decoded.id).select('-password') || await Admin.findById(decoded.id).select('-password');
      console.log('Authenticated User:', req.user);

      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No Token Provided');
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Middleware to check if user is an admin
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

export default authMiddleware;
