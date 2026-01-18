import React from 'react';

const TaskList = () => {
    const tasks = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
        { id: 3, title: 'Task 3', completed: false },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-96">
                <h1 className="text-2xl font-bold mb-4">Task List</h1>
                <ul className="space-y-2">
                    {tasks.map(task => (
                        <li key={task.id} className={`p-4 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-red-100'}`}>
                            <span className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                                {task.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;