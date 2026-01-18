import { useState } from 'react'
import { Routes, Route } from "react-router";
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import './App.css'
import Tasklist from './pages/Tasklist.jsx';
import Taskitems from './pages/Taskitems.jsx';
import Register from './pages/Register.jsx';
import Task from './pages/Task.jsx';

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Tasklist />} />
        <Route path="taskitems" element={<Taskitems />} />
        <Route path="task" element={<Task />} />
        <Route path="task/:id" element={<Task />} />
      
      </Route>
    </Routes>
    </>
  )
}

export default App
