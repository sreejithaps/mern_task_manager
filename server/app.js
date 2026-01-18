const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');


require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/taskmanager';
const jwtSecret = process.env.JWT_SECRET || 'my_jwt_secret_key';

// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//schema and model definitions would go here
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }    
});
const User = mongoose.model('User', userSchema);

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
});
const Task = mongoose.model('Task', taskSchema);    

// assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

// Define routes here
app.get('/', (req, res) => {    
    res.send('Task Manager API');
});
app.post('/register', async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });  
        res.status(201).json({ token });
    
    }catch(err){
        res.status(500).send('Error registering user');
    }   
});
app.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if(!user){
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    }catch(err){
        res.status(500).send('Error logging in');
    }
});

app.post('/tasks', async (req, res) => {
    try{
        const taskData = req.body;
        const task = new Task(taskData);
        await task.save();
        res.status(201).json(task);
    }catch(err){
        res.status(500).send('Error creating task');
    }
});

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(err){
        res.status(500).send('Error fetching tasks');
    }
});

app.put('/tasks/:id', async (req, res) => {
    try{
        const taskId = req.params.id;
        const updates = req.body;
        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        res.json(task);
    }catch(err){
        res.status(500).send('Error updating task');
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try{
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.status(200).send('Task deleted successfully');
    }catch(err){
        res.status(500).send('Error deleting task');
    }
});

app.get('/tasks/:id', async (req, res) => {
    try{
        const taskId = req.params.id;   
        const task = await Task.findById(taskId);
        res.json(task);
    }catch(err){
        res.status(500).send('Error fetching task details');
    }
});

app.get('/protected', (req, res) => {
    const token = req.headers['authorization']; 
    if(!token){
        return res.status(401).send('Access denied. No token provided.');
    }
    try{
        const decoded = jwt.verify(token, jwtSecret);
        res.send(`Hello User ${decoded.id}, you have accessed a protected route!`);
    }catch(err){
        res.status(400).send('Invalid token.');
    }
});
app.patch('/tasks/:id/status', async (req, res) => {
    try{
        const taskId = req.params.id;
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        res.json(task);
    }catch(err){
        res.status(500).send('Error updating task status');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
