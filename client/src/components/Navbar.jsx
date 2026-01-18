import React from 'react';

const Navbar = () => {
    return (
        <header className="bg-blue-600 p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Task Manager</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="text-white hover:text-blue-200">Home</a>
                    </li>
                    <li>
                        <a href="/taskitems" className="text-white hover:text-blue-200">Tasks</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-blue-200">About</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-blue-200">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;