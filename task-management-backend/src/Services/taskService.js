import Task from '../models/Task.js';

// Assign task to user
export const assignTask = async (userId, title, description, dueDate) => {
    const newTask = new Task({
        userId,
        title,
        description,
        dueDate,
        status: 'pending'
    });

    return await newTask.save();
};
