import React from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3300/";

export async function registerUser(userData) {
    const response = await axios.post(`${BASE_URL}register`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
}
export async function loginUser(credentials) {
    const response = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}
export async function fetchTasks(token) {
    const response = await fetch(`${BASE_URL}tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
}
export async function createTask(taskData, token) {
    const response = await fetch(`${BASE_URL}tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
    });
    return response.json();
}
export async function updateTask(taskId, taskData, token) {
    const response = await fetch(`${BASE_URL}tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
    });
    return response.json();
}   
export async function deleteTask(taskId, token) {
    const response = await fetch(`${BASE_URL}tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
}
export async function updateTaskStatus(taskId, statusData, token) {
    const response = await fetch(`${BASE_URL}tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statusData),
    });
    return response.json();
}