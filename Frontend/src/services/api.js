import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true

});

// Get all tasks
export const getAllTasks = () => API.get("/tasks");

// Get a single task by ID
export const getTaskById = (id) => API.get(`/tasks/${id}`);

// Create a new task
export const createTask = (taskData) => API.post("/tasks", taskData);

// Update an existing task
export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
