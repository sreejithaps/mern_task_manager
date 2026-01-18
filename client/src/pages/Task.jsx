import React, { useState } from 'react';
import { createTask, updateTask } from '../api';

const Task = ({ task, onSave }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Retrieve the token using the key 'userToken'
        const storedToken = localStorage.getItem('userToken');
        const taskData = { title, description, status };
        if (task) {
            updateTask(task.id, taskData, storedToken).then((updatedTask) => {
                if (onSave) onSave(updatedTask);
                window.location.href = '/taskitems';
            });
        } else {
            createTask(taskData, storedToken).then((newTask) => {
                if (onSave) onSave(newTask);
                window.location.href = '/taskitems';
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
                >
                    {task ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default Task;