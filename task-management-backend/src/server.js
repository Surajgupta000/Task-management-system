import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

connectDB(); //connect to db

//middleware
app.use(express.json()); //parse json body
app.use(cors()); // enables cors

//routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tasks', taskRoutes);

//start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
