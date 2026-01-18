

const {createTask, getAllTasks, getTaskById, updateTask, deleteTask,updateTaskStatus} = require('../helpers/taskHelper');

const addNewTask = async (req, res) => {
    try {
        const taskData = req.body;  
        const newTask = await createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).send('Error creating task');
    }
};
const fetchAllTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send('Error fetching tasks');
    }
};
const fetchTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await getTaskById(taskId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).send('Error fetching task details');
    }
};
const modifyTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body;
        const updatedTask = await updateTask(taskId, updates);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).send('Error updating task');
    }
};
const removeTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await deleteTask(taskId);
        res.status(200).send('Task deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting task');
    }
};
const modifyTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;
        const updatedTask = await updateTaskStatus(taskId, status);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).send('Error updating task status');
    }
};
module.exports = {
    addNewTask,
    fetchAllTasks,
    fetchTaskById,
    modifyTask,
    removeTask,
    modifyTaskStatus
};