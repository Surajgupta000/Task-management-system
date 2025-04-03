# Task-management-system
📌 Project Overview
The Task Management System is a full-stack web application designed to help users efficiently manage their tasks. It allows users to create, update, delete, and track tasks while providing an admin panel for managing all users' tasks.

Built with the MERN stack, this project ensures smooth functionality with a secure authentication system, role-based access, and a responsive UI for a seamless user experience.

🛠️ Tech Stack
Frontend:
React.js (Vite) ⚛️
Context API for state management
Tailwind CSS for styling 🎨
Backend:
Node.js + Express.js 🚀
MongoDB + Mongoose for database operations
JWT Authentication & Middleware for security 🔒
✨ Features
✅ User Authentication (Register, Login, Logout)
✅ Task Management (Create, Read, Update, Delete)
✅ Role-based access (Admin & User)
✅ Admin Dashboard (View, Update, Delete All Tasks)
✅ Secure API Endpoints (JWT-based authentication)
✅ Responsive UI for a seamless experience

📂 Project Structure
Backend (task-management-backend/)
config/db.js → Database connection
models/Task.js → Task schema
models/User.js → User schema
controllers/userController.js → Authentication & User management
controllers/taskController.js → Task CRUD operations
middleware/authMiddleware.js → JWT & Admin authentication
routes/userRoutes.js → User-related API routes
routes/taskRoutes.js → Task-related API routes
server.js → Entry point
Frontend (task-management-frontend/)
components/ → Reusable UI components (Button, Input, TaskCard, Navbar)
pages/ → Main pages (Login, Register, Dashboard, Home)
context/AuthContext.jsx → Manages authentication state
api/auth.jsx → Handles authentication API calls
api/tasks.jsx → Handles task-related API calls
App.jsx → Main routing & page structure
📡 API Endpoints
User Auth: /api/users/register, /api/users/login, /api/users/logout
Task Management: /api/tasks, /api/tasks/:id, /api/tasks/admin/tasks/:id
Admin Panel: /api/tasks/admin/tasks (View all tasks)
🚀 How to Run the Project
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
2️⃣ Backend Setup
sh
Copy
Edit
cd task-management-backend
npm install
npm start
Runs on http://localhost:5000

3️⃣ Frontend Setup
sh
Copy
Edit
cd task-management-frontend
npm install
npm run dev
Runs on http://localhost:5173

📢 Contributing
Feel free to fork, improve, and create pull requests. Let's build this together! 💡🚀

📜 License
This project is open-source under the MIT License.

🔥 Developed with MERN Stack by Suraj Gupta 💻✨
