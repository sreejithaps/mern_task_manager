const router = require('express').Router();
const { addNewTask, fetchAllTasks,modifyTask,removeTask,fetchTaskById,modifyTaskStatus} = require('../controllers/taskController');
const {registerUser, loginUser} = require('../controllers/userController');

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Task routes
router.post('/tasks', addNewTask);
router.get('/tasks', fetchAllTasks);
router.get('/tasks/:id', fetchTaskById);
router.put('/tasks/:id', modifyTask);
router.delete('/tasks/:id', removeTask);
router.patch('/tasks/:id/status', modifyTaskStatus);
module.exports = router;

