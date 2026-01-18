const  taskdb = require('../models/Task');

exports.createTask = async (taskdata) => {
    try {
        const task = new taskdb(taskdata);
        await task.save();
        return task;
    } catch (error) {
        throw error;
    }
};

exports.getAllTasks = async () => {
    try {
        const tasks = await taskdb.find();
        return tasks;
    } catch (error) {
        throw error;
    }
};

exports.updateTask = async (taskId, updates) => {
    try {
        const task = await taskdb.findByIdAndUpdate(taskId, updates, { new: true });
        return task;
    } catch (error) {
        throw error;
    }
};
exports.deleteTask = async (taskId) => {
    try {
        await taskdb.findByIdAndDelete(taskId);
    } catch (error) {
        throw error;
    }
};
exports.getTaskById = async (taskId) => {
    try {
        const task = await taskdb.findById(taskId);
        return task;
    } catch (error) {
        throw error;
    }
};
exports.updateTaskStatus = async (taskId, status) => {
    try {
        const task = await taskdb.findByIdAndUpdate(taskId, { status }, { new: true });
        return task;
    } catch (error) {
        throw error;
    }
};
