import React, { useEffect, useState } from 'react';
import { fetchTasks,updateTaskStatus } from '../api';

const TaskItems = () => {

     // Retrieve the token using the key 'userToken'
        const storedToken = localStorage.getItem('userToken');
        const token = storedToken ? storedToken : null;
        
        const [tasks, setTasks] = useState([]);

        useEffect(() => {
            fetchTasks(token).then((data) => {
                setTasks(data);
                console.log(data);
            });
        }, [token]); 

  
    const [editTask, setEditTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const handleEdit = (task) => {
        setEditTask(task._id);
        setNewTitle(task.title);
        setNewStatus(task.status);
       
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task._id !== id));
    };

    const handleUpdate = (id) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, title: newTitle, status: newStatus } : task)));
        setEditTask(null);
        setNewTitle('');
         updateTaskStatus(id, { status: newStatus }, token).then((data) => {
            console.log(data);
        });
    };
    const handleNavigate = () => {
        window.location.href = '/task';
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Task List</h1>
            <div className="mb-4">
                <div className="flex justify-end">
                    <button onClick={handleNavigate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Add Task
                    </button>
                </div>

            </div>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li key={task._id} className="flex justify-between items-center p-2 border rounded">
                        {editTask === task._id ? (
                            <>
                                <input
                                    type="text"
                                    value={task.title}
                                    readOnly
                                    className="border p-1 rounded"
                                />
                                <textarea
                                    value={task.description}
                                    readOnly
                                    className="border p-1 rounded ml-2"
                                />
                                {task.status}
                                <select
                                    value={newStatus}
                                    className="border p-1 rounded ml-2"
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value="pending" >Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onClick={() => handleUpdate(task._id)} className="ml-2 bg-blue-500 text-white p-1 rounded">Update</button>
                            </>
                        ) : (
                            <>
                                <span>{task.title}</span>
                                <div>
                                    <button onClick={() => handleEdit(task._id)} className="mr-2 bg-yellow-500 text-white p-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskItems;